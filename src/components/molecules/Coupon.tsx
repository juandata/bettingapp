import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import SelectedBet from '../atoms/SelectedBet';
import theme from '../../styles/theme';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import BetsMade from '../atoms/BetsMade';
import CouponFooter from '../atoms/CouponFooter';
import { useSelector, useDispatch } from 'react-redux';
import { EventsArrayProps, GamesProps, ResultsArrayProps } from '../../types/type';
import {
  ActionTypes,
  CodereDataProps,
  CouponDataType,
  LiveDetailDataInterface,
  UserInterface,
} from '../../store/stateTypes';
import { reduceCouponData, deleteCouponData } from '../../store/couponDataSlice';
import { deleteLiveDetailData, reduceLiveDetailData } from '../../store/liveDetailDataSlice';
import socket from '../socket';
import { reduceUserActions } from '../../store/userActionsSlice';
import { liveDetailState } from '../../store/initialState';
import './coupon.css';

const DefaultMessage: React.FC<{ message: string }> = ({ message }) => (
  <Box sx={{ padding: theme.spacing(2) }}>
    <Typography variant="h6">{message}</Typography>
  </Box>
);
/**
 * Render the bets selected by the user
 */
const Coupon = () => {
  const [value, setValue] = React.useState('1');
  const minWidth1210 = useMediaQuery('(min-width:1210px)');
  const userData = useSelector((state: { userData: UserInterface }) => state.userData);
  const userActions = useSelector((state: { userActions: ActionTypes }) => state.userActions);
  const couponData = useSelector((state: { couponData: CouponDataType }) => state.couponData);
  const couponDataKeys = Object.keys(couponData);
  const codereData = useSelector((state: { codereData: CodereDataProps }) => state.codereData);
  const liveDetailData = useSelector((state: { liveDetailData: LiveDetailDataInterface }) => state.liveDetailData);
  const dispatch = useDispatch();
  const maxWidth1210 = useMediaQuery('(max-width:1210px)');
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleAlertClick = (_event: React.SyntheticEvent<Element, Event>) => {
    const userActionsCopy = { ...userActions };
    userActionsCopy.approveBet = null;
    dispatch(reduceUserActions(userActionsCopy));
  };

  React.useEffect(() => {
    if (codereData.events.length === 0) return;
    //For every bet in couponData check whether the bet is in the response otherwise delete it from the couponData
    for (const coupon in couponData) {
      const liveDetailDataKeys = Object.keys(liveDetailData);
      //"soccer"
      const sportHandled = codereData.events.filter(
        (events: { SportHandle: string }) => events.SportHandle === couponData[coupon].game.SportHandle
      );

      const liveDetailDataCopy: EventsArrayProps[] = [];
      liveDetailDataKeys.forEach((value: string) => {
        if (liveDetailData[value].SportHandle === couponData[coupon].game.SportHandle) {
          //"soccer"
          liveDetailDataCopy.push(liveDetailData[value]);
        }
      });
      //Check if there is a liveDetail view and filter
      const sportHandledLiveData = liveDetailDataCopy.filter(
        //"soccer"
        (liveDetail: EventsArrayProps) => liveDetail.SportHandle === couponData[coupon].result.SportHandle
      );
      const sportHandledKeys = sportHandled.length >= 1 ? Object.keys(sportHandled[0]) : [];
      try {
        if (sportHandled.length >= 1 || sportHandledLiveData.length >= 1) {
          const sportEvent =
            sportHandledKeys.length >= 1
              ? sportHandled[0].Events.filter(
                  //"Sagan Tosu - Shonan Bellmare",
                  (sportEvent: { Name: string }) => sportEvent.Name === couponData[coupon].name
                )
              : [];
          //Check if there is a liveDetail view and filter
          let sportEventLiveData: EventsArrayProps[] = [];
          if (sportHandledLiveData.length >= 1) {
            sportEventLiveData = sportHandledLiveData.filter(
              (liveDataSportHandle) => liveDataSportHandle.Name === couponData[coupon].name
            );
          }
          const sportEventKeys = sportEvent.length >= 1 ? Object.keys(sportEvent[0]) : [];
          if ((sportEvent.length >= 1 && sportEventKeys.includes('Games')) || sportEventLiveData.length >= 1) {
            const games =
              sportEvent.length >= 1
                ? sportEvent[0].Games.filter((game: { Name: string }) => game.Name === couponData[coupon].game.Name)
                : [];
            const sportEventsLiveDataKeys = sportEventLiveData.length >= 1 ? Object.keys(sportEventLiveData[0]) : [];
            //Check if there is a liveDetail view and filter
            let gamesLiveView: Array<GamesProps> = [];
            if (sportEventLiveData.length >= 1 && sportEventsLiveDataKeys.includes('Games')) {
              gamesLiveView = sportEventLiveData[0].Games.filter(
                (game: { Name: string }) => game.Name === couponData[coupon].game.Name
              );
            }
            if (games.length >= 1 || gamesLiveView.length >= 1) {
              const results =
                games.length === 0
                  ? []
                  : games[0].Results.filter(
                      (result: { NodeId: string }) => result.NodeId === couponData[coupon].result.NodeId
                    );
              //Check if there is a liveDetail view and filter
              const gamesLiveViewResults: ResultsArrayProps[] = [];
              if (gamesLiveView.length >= 1) {
                gamesLiveView.some((gameView) => {
                  gameView.Results.some((result: ResultsArrayProps) => {
                    if (result.NodeId === couponData[coupon].result.NodeId) {
                      gamesLiveViewResults.push(result);
                      return true;
                    }
                    return false;
                  });
                });
              }
              if (results.length === 0 && gamesLiveViewResults.length === 0) {
                //here gamesLiveViewResults length is 0 and is deleting the bet from coupon
                //the bet nodeId is not included inside the server resonse, so delete it from the coupon
                dispatch(deleteCouponData(couponData[coupon].result.NodeId));
              } else {
                //if coupon state is equal to the data is going to be sent, then do not update the coupon
                const couponPayload = {
                  [couponData[coupon].result.NodeId]: {
                    game: gamesLiveViewResults.length > 0 ? gamesLiveView[0] : games[0],
                    result: gamesLiveViewResults.length > 0 ? gamesLiveViewResults[0] : results[0],
                    name: couponData[coupon].name,
                    locks: {
                      eventOverview: gamesLiveViewResults.length > 0 ? gamesLiveView[0].Locked : sportHandled[0].Locked,
                      oddsOverview:
                        gamesLiveViewResults.length > 0 ? gamesLiveViewResults[0].Locked : sportEvent[0].Locked,
                    },
                  },
                };
                const couponDataPayloadCopy = {
                  [couponData[coupon].result.NodeId]: { ...couponData[coupon] },
                };
                if (JSON.stringify(couponPayload) !== JSON.stringify(couponDataPayloadCopy)) {
                  //the NodeId is in the server response so update it

                  dispatch(reduceCouponData(couponPayload));
                }
              }
            } else {
              //remove from coupon if the bet market name is not included in te server response
              dispatch(deleteCouponData(couponData[coupon].result.NodeId));
            }
          } else {
            //remove from coupon if the bet sport is not included in the Events from the sport
            dispatch(deleteCouponData(couponData[coupon].result.NodeId));
          }
        } else {
          //remove from coupon if the sportHandled is not included in server response
          dispatch(deleteCouponData(couponData[coupon].result.NodeId));
        }
      } catch (err: unknown) {
        const userActionsCopy = { ...userActions };
        userActionsCopy.connectionError = err.message;
        dispatch(reduceUserActions(userActionsCopy));
      }
    }
  }, [codereData, liveDetailData]);

  React.useEffect(() => {
    //delete the displayLiveDetail key so the app stop making request and updating liveDetailData
    const liveDetailDataKeys = Object.keys(liveDetailData);
    if (liveDetailDataKeys.length >= 1) {
      if (couponDataKeys.length === 0) {
        //no bets are included in coupon so delete liveDetailData
        dispatch(reduceLiveDetailData(liveDetailState));
      }
      couponDataKeys.forEach((couponKey) => {
        const couponBetParentNodeId = couponData[couponKey].game.ParentNodeId;
        if (!liveDetailDataKeys.includes(couponBetParentNodeId)) {
          dispatch(deleteLiveDetailData(couponBetParentNodeId));
        }
      });
    }
  }, [couponData, userActions.displayLiveDetail]);

  React.useEffect(() => {
    const liveDetailDataKeys = Object.keys(liveDetailData);
    const couponDataNodeIds = couponDataKeys.map((couponBet) => couponData[couponBet].game.ParentNodeId);
    const liveDetailsNotInCoupon = liveDetailDataKeys.filter((e) => couponDataNodeIds.indexOf(e) === -1);
    if (liveDetailsNotInCoupon.length >= 1 && liveDetailDataKeys.length >= 1) {
      liveDetailsNotInCoupon.forEach((liveDetail) => {
        if (liveDetail !== userActions.lastLiveDetailId) {
          dispatch(deleteLiveDetailData(liveDetail));
          socket.emit('leaveDataRoom', liveDetail);
          //leave room parentId in server
        }
      });
    }
  }, [couponData, liveDetailData]);
  const paperStyles = { backgroundColor: 'inherit', textAlign: 'center' };
  let lmtPlusId = null;
  if (minWidth1210) {
    lmtPlusId = document.getElementById('lmtPlus');
  }

  return userActions.approveBet === null ? (
    <Grid
      container
      justifyContent="space-around"
      sx={{
        pointerEvents: userActions.makeBet ? 'none' : 'unset',
        border: 'solid',
        borderColor: '#ced4d9',
      }}
    >
      {minWidth1210 && (
        <div id="widget-lmtPlus" style={{ width: '100%', display: !lmtPlusId ? 'none' : 'block' }}></div>
      )}

      {maxWidth1210 && (
        <Button
          color="secondary"
          variant="text"
          sx={{
            '&:hover': {
              color: theme.palette.primary.contrastText,
              backgroundColor: 'unset',
            },
            textTransform: 'none',
            padding: 'unset',
          }}
          onClick={() => {
            const userActionsCopy = { ...userActions };
            userActionsCopy.expandCoupon = false;
            if (userActions.expandCoupon) {
              dispatch(reduceUserActions(userActionsCopy));
            } else {
              userActionsCopy.expandCoupon = true;
              dispatch(reduceUserActions(userActionsCopy));
            }
          }}
        >
          {userActions.expandCoupon ? (
            <ExpandMoreIcon fontSize="large" sx={{ position: 'relative' }} />
          ) : (
            <ExpandLessIcon fontSize="large" sx={{ position: 'relative' }} />
          )}
        </Button>
      )}
      <Box sx={{ width: '100%' }} data-testid="coupon" id="couponId">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="CouponTabs"
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                color: 'primary.main',
                '&.Mui-selected': {
                  color: 'red!important',
                  backgroundColor: 'blue!important',
                  //TODO:Current implementation is not working. Find out how to change the styles of the coupon tabs when active and not active
                  //Add a button to allow the user to expand the coupon to cover all the viewport in mobile
                },
              }}
            >
              <Tab
                className="font-face-ArchivoBlack"
                label="Ticket"
                value="1"
                sx={{ fontSize: maxWidth1210 ? 'small' : 'medium', textTransform: 'none' }}
              />
              <Tab
                className="font-face-ArchivoBlack"
                label="Apuestas"
                value="2"
                sx={{ fontSize: maxWidth1210 ? 'small' : 'medium', textTransform: 'none' }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 'unset', overflowY: 'auto' }}>
            <Paper sx={paperStyles} elevation={0}>
              <Grid container>
                {couponDataKeys.length === 0 ? (
                  <DefaultMessage message="Las selecciones serán añadidas" />
                ) : (
                  <Grid container direction="column">
                    {couponDataKeys.map((bet) => (
                      <SelectedBet key={bet} bet={couponData[bet]} />
                    ))}
                  </Grid>
                )}
                {couponDataKeys.length === 0 ? null : (
                  <Grid sx={{ width: '100%' }}>
                    <CouponFooter />
                  </Grid>
                )}
              </Grid>
            </Paper>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 'unset' }}>
            <Paper sx={paperStyles} elevation={0}>
              {Object.keys(userData.bets).length === 0 ? (
                <DefaultMessage message="Las apuestas realizadas serán añadidas" />
              ) : (
                <BetsMade />
              )}
            </Paper>
          </TabPanel>
          <Divider />
        </TabContext>
      </Box>
    </Grid>
  ) : userActions.approveBet === true ? (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <Alert severity="success" onClose={handleAlertClick} data-testid="accept-bet">
        <AlertTitle>Apuesta Realizada</AlertTitle>
        Puedes revisar el estado de la apuesta en la pestaña mis apuestas del coupon.
      </Alert>
    </Box>
  ) : (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <Alert severity="error" onClose={handleAlertClick} data-testid="reject-bet">
        <AlertTitle>Reintentar Apuesta</AlertTitle>
        Los mercados seleccionados han <strong>cambiado</strong>.
      </Alert>
    </Box>
  );
};
export default Coupon;
