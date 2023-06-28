import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GamesProps } from '../../types/type';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TabPanel from '../atoms/TabPanel';
import Button from '@mui/material/Button';
import socket from '../socket';
import { ActionTypes, LiveDetailDataInterface } from '../../store/stateTypes';
import { useDispatch, useSelector } from 'react-redux';
import { reduceUserActions } from '../../store/userActionsSlice';
import { userActions as userActionsInitialState } from '../../store/initialState';
import LiveDetailHeader from '../atoms/LiveDetailHeader';

interface KeyStringType {
  [key: string]: GamesProps[];
}
/**
 * Renders the LiveDetail view of the market specified in the nodeId
 */
const LiveDetail = () => {
  const theme = useTheme();
  const minWidth1210 = useMediaQuery('(min-width:1210px)');
  const userActions = useSelector((state: { userActions: ActionTypes }) => state.userActions);
  const liveDetailData = useSelector((state: { liveDetailData: LiveDetailDataInterface }) => state.liveDetailData);
  const dispatch = useDispatch();
  const useMockData = process.env.REACT_APP_MOCK_DATA; //mockdata variable
  const [categoryArray, setCategoryArray] = useState<KeyStringType>({});
  const [tab, setTab] = useState('');
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [liveHeader, setLiveHeader] = useState(false);
  const isMounted = useRef(false);
  const categoryTabObject: KeyStringType = {};
  const maxWidth1210 = useMediaQuery('(max-width:1210px)');
  const mockParentNodeId = userActions.lastLiveDetailId;
  const backgroundColor = '#979a9d';
  const paperStyles = {
    backgroundColor: backgroundColor,
    textAlign: 'center',
    width: 'auto',
    padding: '0.5rem',
    display: 'flex',
  };
  const liveDetailKeys = Object.keys(liveDetailData);
  const onClick = (id: string) => {
    setLoading(true);
    setTab(id);
  };
  const alertClick = () => {
    location.reload();
  };
  useLayoutEffect(() => {
    if (mockParentNodeId === '') {
      setRedirect(true);
      return;
    }

    return () => {
      /**
       * TODO:Delete userActions.lastLiveDetailId when unmounted
       */
      const lmtPlusId = document.getElementById('lmtPlus');
      const gameScoreboard = document.getElementById('scoreBoard');
      if (lmtPlusId) {
        document.body.removeChild(lmtPlusId);
      }
      if (gameScoreboard) {
        document.body.removeChild(gameScoreboard);
      }
      if (isMounted.current) {
        dispatch(reduceUserActions(userActionsInitialState));
      }
    };
  }, []);

  //create the category tabs
  useEffect(() => {
    if (
      userActions.lastLiveDetailId !== '' &&
      liveDetailKeys.length >= 1 &&
      liveDetailKeys.includes(userActions.lastLiveDetailId)
    ) {
      liveDetailData[userActions.lastLiveDetailId].Games.forEach((game) => {
        //sometimes categoryInfo is null
        if (game.CategoryInfo !== null) {
          if (!Object.keys(categoryTabObject).includes(game.CategoryInfo.CategoryName)) {
            categoryTabObject[game.CategoryInfo.CategoryName] = [];
          }
          categoryTabObject[game.CategoryInfo.CategoryName].push(game);
        } else {
          if (!Object.keys(categoryTabObject).includes(game.CategoryInfos[0].CategoryName)) {
            categoryTabObject[game.CategoryInfos[0].CategoryName] = [];
          }
          categoryTabObject[game.CategoryInfos[0].CategoryName].push(game);
        }
      });
    }
    if (liveDetailKeys.length >= 1) {
      setCategoryArray(categoryTabObject);
    }
  }, [liveDetailData]);

  useEffect(() => {
    //CategoryArray might be not an object but an array due to CategoryInfo being null?
    if (Object.keys(categoryArray).length >= 1) {
      if (tab === '') {
        setTab(Object.keys(categoryArray)[0]);

        if (liveDetailData[userActions.lastLiveDetailId].StatisticsId.length === 0) {
          setLiveHeader(true);
          return;
        }

        const lmtPlusId = document.getElementById('lmtPlus');
        if (!lmtPlusId && liveDetailKeys.includes(userActions.lastLiveDetailId)) {
          const scriptlmtPlus = document.createElement('script');
          const scriptScoreBoard = document.createElement('script');
          scriptlmtPlus.id = 'lmtPlus';
          scriptScoreBoard.id = 'scoreBoard';
          const statisticsId = +liveDetailData[userActions.lastLiveDetailId].StatisticsId;
          const widgetDivIdLmt = "'#widget-lmtPlus',";
          const widgetIdLmtPlus = "'match.lmtPlus',";
          const widgetDivScoreboard = "'#widget-scoreboard',";
          const widgetScoreboard = "'match.scoreboard',";

          const text =
            "(function (a, b, c, d, e, f, g, h, i) {a[e] || (i = a[e] = function () { (a[e].q = a[e].q || []).push(arguments) }, i.l = 1 * new Date, i.o = f, g = b.createElement(c), h = b.getElementsByTagName(c)[0], g.async = 1, g.src = d, g.setAttribute('n', e), h.parentNode.insertBefore(g, h))})(window, document, 'script', 'https://widgets.sir.sportradar.com/sportradar/widgetloader', 'SIR', { language: 'es'});SIR('addWidget', ";
          const statsIdLmtPlusText = widgetDivIdLmt + widgetIdLmtPlus + '{ matchId:' + statisticsId + '})';
          const statsGameScoreBoard = widgetDivScoreboard + widgetScoreboard + '{ matchId:' + statisticsId + '})';

          const scriptTextLmtPlus = document.createTextNode(text + statsIdLmtPlusText);
          if (minWidth1210) {
            const scriptTextScoreboard = document.createTextNode(text + statsGameScoreBoard);
            scriptScoreBoard.appendChild(scriptTextScoreboard);
            document.body.appendChild(scriptScoreBoard);
          }

          scriptlmtPlus.appendChild(scriptTextLmtPlus);
          document.body.appendChild(scriptlmtPlus);
        }
      }
      setLoading(false);
    }
  }, [categoryArray]);

  useEffect(() => {
    //update the server with displayLiveDetail
    const displayLiveDetailKeys = Object.keys(userActions.displayLiveDetail);

    if (displayLiveDetailKeys.length >= 1 && useMockData === 'false') {
      //join the room with the specific parentNodeId
      socket.emit('liveDataRoom', userActions.lastLiveDetailId);
    }
  }, [userActions.displayLiveDetail, userActions.lastLiveDetailId]);

  useEffect(() => {
    if (!loading) {
      const marketNotAvailable = document.body.textContent.includes('PARTIDO NO CUBIERTO');
      if (marketNotAvailable) {
        setLiveHeader(true);
      }
    }
  }, []);
  useEffect(() => {
    if (!loading && !isMounted.current) {
      isMounted.current = true;
    }
  }, [loading]);

  let alertWindow = null;
  if (
    userActions.connectionError === 'adrebet.com: El mercado actual no está disponible, por favor espere un momento.' ||
    userActions.connectionError ===
      'adrebet.com: El mercado actual no está disponible, lo invitamos a probar con otros mercados.'
  ) {
    alertWindow = (
      <Alert
        severity={
          userActions.connectionError ===
          'adrebet.com: El mercado actual no está disponible, por favor espere un momento.'
            ? 'warning'
            : 'error'
        }
        sx={{
          width: 'fit-content',
          height: 'fit-content',
          margin: 'auto',
        }}
        action={
          userActions.connectionError ===
            'adrebet.com: El mercado actual no está disponible, lo invitamos a probar con otros mercados.' && (
            <Button color="inherit" size="large" onClick={() => alertClick()}>
              X
            </Button>
          )
        }
        data-testid="alert-connection-error-close-icon"
      >
        {userActions.connectionError}
      </Alert>
    );
  }
  return (
    <>
      {redirect && <Navigate to="/EnVivo" />}

      {userActions.connectionError !== '' && userActions.roomToDelete === userActions.lastLiveDetailId && (
        <Box sx={{ gridArea: 'main', width: '100%', height: '100%', display: 'flex', flexDirection: ' column' }}>
          {userActions.connectionError ===
            'adrebet.com: El mercado actual no está disponible, por favor espere un momento.' && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CircularProgress
                data-testid="loader"
                size={48}
                sx={{
                  color: theme.palette.primary.main,
                  marginTop: theme.spacing(4),
                }}
              />
            </Box>
          )}
          {alertWindow}
        </Box>
      )}
      {userActions.connectionError === '' && !redirect && (
        <Box sx={{ gridArea: 'main', width: '100%', overflow: 'auto' }}>
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                width: '100%',
                backgroundColor: backgroundColor,
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  backgroundColor: backgroundColor,
                  flexDirection: 'column',
                }}
              >
                <>
                  {liveHeader ? (
                    <LiveDetailHeader data={liveDetailData[userActions.lastLiveDetailId]} />
                  ) : (
                    <div id={!minWidth1210 ? 'widget-lmtPlus' : 'widget-scoreboard'}></div>
                  )}
                </>
              </Box>
              {Object.keys(categoryArray).length >= 1 && (
                <Paper sx={paperStyles} elevation={0}>
                  {Object.keys(categoryArray).map((marketName) => {
                    return (
                      <Link
                        key={marketName}
                        id={marketName}
                        component="button"
                        onClick={() => onClick(marketName)}
                        sx={{
                          marginLeft: theme.spacing(1),
                          marginRight: theme.spacing(1),
                          textDecoration: 'none!important',
                          color: tab === marketName ? theme.palette.primary.dark : theme.palette.primary.main,
                        }}
                      >
                        <Typography
                          variant="body2"
                          textAlign="center"
                          sx={{
                            fontSize: maxWidth1210 ? 'small' : 'medium',
                            textTransform: 'none',
                            textShadow: '1px 0px 0 #7A7A7A',
                            fontWeight: 'bold',
                            transition: '0.3s',
                            color: tab === marketName ? theme.palette.primary.dark : 'white',
                            '&:hover': {
                              color: theme.palette.primary.dark,
                            },
                          }}
                        >
                          {marketName}
                        </Typography>
                      </Link>
                    );
                  })}
                </Paper>
              )}
            </Box>
            {loading || Object.keys(categoryArray).length === 0 ? (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <CircularProgress
                  data-testid="loader"
                  size={48}
                  sx={{
                    color: theme.palette.primary.main,
                    marginTop: theme.spacing(4),
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  height: '100%',
                }}
              >
                {tab !== '' ? (
                  <TabPanel
                    key={tab}
                    locked={liveDetailData[userActions.lastLiveDetailId].Locked}
                    category={categoryArray[tab]}
                    userActions={userActions}
                  />
                ) : null}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default LiveDetail;
