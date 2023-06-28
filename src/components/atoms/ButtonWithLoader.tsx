import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getObjectDiff } from '../utilities/comparator';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  CouponDataType,
  CodereDataProps,
  LiveDetailDataInterface,
  CouponFooterTypes,
  ActionTypes,
  UserInterface,
  KeyStringType,
} from '../../store/stateTypes';
import { couponFooterState } from '../../store/initialState';
import { reduceUserActions } from '../../store/userActionsSlice';
import { reduceCouponFooter } from '../../store/couponFooterSlice';
import { reduceUserData } from '../../store/userDataSlice';
import { clearCouponData } from '../../store/couponDataSlice';
/**
 * Renders a button with a loader state which depends on codereData
 * @param text the text the button should display
 */
const ButtonWithLoader = ({ text }: { text: string }) => {
  /**
   * TODO:Find out why after the button is not disabled after a minimum/maximun bet error in coupon footer text input
   */
  const dispatch = useDispatch();
  const theme = useTheme();
  const couponFooter = useSelector((state: { couponFooter: CouponFooterTypes }) => state.couponFooter);
  const couponData = useSelector((state: { couponData: CouponDataType }) => state.couponData);
  const userData = useSelector((state: { userData: UserInterface }) => state.userData);
  const userActions = useSelector((state: { userActions: ActionTypes }) => state.userActions);
  const codereData = useSelector((state: { codereData: CodereDataProps }) => state.codereData);
  const liveDetailData = useSelector((state: { liveDetailData: LiveDetailDataInterface }) => state.liveDetailData);
  const [couponDataInternal, setCouponDataInternal] = React.useState({
    prev: {},
    curr: {},
  });
  const [disable, setDisable] = React.useState(true);
  const dataLoaded = React.useRef({
    codereData: false,
    liveDetailData: false,
  });
  const [liveDetailDataCopy, setLiveDetailDataCopy] = React.useState({
    prev: {},
    curr: {},
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [liveDetailDataIncomingDataArray, setLiveDetailDataIncomingDataArray] = React.useState<string[]>([]);
  const couponDataKeys = Object.keys(couponData);

  const buttonSx = {
    ...(success && {
      bgcolor: theme.palette.primary.light,
      '&:hover': {
        bgcolor: theme.palette.primary.dark,
      },
    }),
    color: theme.palette.secondary.contrastText,
    textTransform: 'none',
  };
  const handleButtonClick = () => {
    const userActionsCopy = { ...userActions };
    userActionsCopy.makeBet = true;

    dispatch(reduceUserActions(userActionsCopy));
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setDisable(true);
    }
  };
  const approveBet = () => {
    setSuccess(true);
    setLoading(false);
    const couponFooterCopy = { ...couponFooter };
    couponFooterCopy.state = 'Pendiente';
    const notCombinedState: KeyStringType = {};
    if (!couponFooterCopy.combined) {
      Object.keys(couponFooterCopy.betsDivided).forEach((bet) => {
        notCombinedState[bet] = 'Pendiente';
      });
      couponFooterCopy.notCombinedBetsState = notCombinedState;
    }
    const idSplited = uuidv4().split('-');
    const uniqueId = idSplited[0] + idSplited[1];
    const betApproved = { [uniqueId]: { couponData, time: new Date(), couponFooter: { ...couponFooterCopy } } };
    const userDataCopy = { ...userData };
    userDataCopy.bets = { ...userData.bets, ...betApproved };
    dispatch(reduceCouponFooter(couponFooterState));
    const userActionsCopy = { ...userActions };
    userActionsCopy.approveBet = true;
    userActionsCopy.makeBet = false;
    dispatch(reduceUserData(userDataCopy));
    dispatch(clearCouponData({}));
    dispatch(reduceUserActions(userActionsCopy));
    dataLoaded.current.codereData = false;
    dataLoaded.current.liveDetailData = false;
    setLiveDetailDataIncomingDataArray([]);
  };
  React.useEffect(() => {
    const couponDataInternalPrevKeys = Object.keys(couponDataInternal.prev);
    const couponDataInternalCurrKeys = Object.keys(couponDataInternal.curr);
    const couponDataInternalCopy = { ...couponDataInternal };
    if (couponDataInternalPrevKeys.length === 0) {
      couponDataInternalCopy.prev = { ...couponData };
      setCouponDataInternal(couponDataInternalCopy);
      return;
    }
    if (couponDataInternalPrevKeys.length >= 1 && couponDataInternalCurrKeys.length === 0) {
      couponDataInternalCopy.curr = { ...couponData };
      setCouponDataInternal(couponDataInternalCopy);
      return;
    }
    if (couponDataInternalPrevKeys.length >= 1 && couponDataInternalCurrKeys.length >= 1) {
      couponDataInternalCopy.prev = { ...couponDataInternal.curr };
      couponDataInternalCopy.curr = { ...couponData };
      setCouponDataInternal(couponDataInternalCopy);
    }
  }, [couponData]);
  React.useEffect(() => {
    if (loading) {
      dataLoaded.current.codereData = false;
      dataLoaded.current.liveDetailData = false;
    }
  }, [loading]);
  React.useEffect(() => {
    if (loading) {
      dataLoaded.current.codereData = true;
    }
  }, [codereData]);
  React.useEffect(() => {
    const liveDetailDataCopyPrevKeys = Object.keys(liveDetailDataCopy.prev);
    const liveDetailDataCopyCurrKeys = Object.keys(liveDetailDataCopy.curr);
    const liveDetailDataCopyInternalCopy = { ...liveDetailDataCopy };
    if (liveDetailDataCopyPrevKeys.length === 0) {
      liveDetailDataCopyInternalCopy.prev = { ...liveDetailData };
      setLiveDetailDataCopy(liveDetailDataCopyInternalCopy);
      return;
    }
    if (liveDetailDataCopyPrevKeys.length >= 1 && liveDetailDataCopyCurrKeys.length === 0) {
      liveDetailDataCopyInternalCopy.curr = { ...liveDetailData };
      setLiveDetailDataCopy(liveDetailDataCopyInternalCopy);

      return;
    }
    if (liveDetailDataCopyPrevKeys.length >= 1 && liveDetailDataCopyCurrKeys.length >= 1) {
      liveDetailDataCopyInternalCopy.prev = { ...liveDetailDataCopy.curr };
      liveDetailDataCopyInternalCopy.curr = { ...liveDetailData };
      setLiveDetailDataCopy(liveDetailDataCopyInternalCopy);
    }
  }, [liveDetailData]);

  React.useEffect(() => {
    if (loading) {
      const couponDataEventIdKeys = couponDataKeys.map((key: string) => couponData[key].result.EventId);
      const liveDetailDataKeys = Object.keys(liveDetailData);
      const couponDataFromLiveDetailData = liveDetailDataKeys.map((key: string) => {
        if (couponDataEventIdKeys.includes(key)) {
          return key;
        }
      });
      if (couponDataFromLiveDetailData.length >= 1) {
        //there are bets in coupon that contain liveDetailData dependencies
        if (JSON.stringify(liveDetailDataIncomingDataArray) === JSON.stringify(couponDataFromLiveDetailData)) {
          //liveDetailData dependencies of coupon have arrived, so check whether to accept or reject bet
          dataLoaded.current.liveDetailData = true;
        } else {
          const diff = getObjectDiff(liveDetailDataCopy.curr, liveDetailDataCopy.prev);
          if (couponDataFromLiveDetailData.includes(diff[0]) && !liveDetailDataIncomingDataArray.includes(diff[0])) {
            const liveDetailDataIncomingDataArrayCopy = [...liveDetailDataIncomingDataArray];
            liveDetailDataIncomingDataArrayCopy.push(diff[0]);
            setLiveDetailDataIncomingDataArray(liveDetailDataIncomingDataArrayCopy);
          }
        }
      }
    }
  }, [liveDetailDataCopy]);

  React.useEffect(() => {
    if (loading && couponDataKeys.length >= 1) {
      //update couponDataInternal
      const couponDataInternalPrevKeys = Object.keys(couponDataInternal.prev);
      const couponDataInternalCurrKeys = Object.keys(couponDataInternal.curr);
      const liveDetailDataKeys = Object.keys(liveDetailData);

      if (liveDetailDataKeys.length >= 1 && !dataLoaded.current.liveDetailData) {
        //a bet with liveDetail dependency redux state is in the coupon, so wait for it to be updated
        return;
      }
      if (dataLoaded.current.codereData) {
        const couponDataInternalCopy = { ...couponDataInternal };
        if (couponDataInternalPrevKeys.length >= 1 && couponDataInternalCurrKeys.length >= 1) {
          couponDataInternalCopy.prev = { ...couponDataInternal.curr };
          couponDataInternalCopy.curr = { ...couponData };
        }
        if (couponDataInternalCurrKeys.length === 0) {
          couponDataInternalCopy.curr = { ...couponData };
        }
        setCouponDataInternal(couponDataInternalCopy);
      }
    }
  }, [codereData, liveDetailData]);

  React.useEffect(() => {
    const couponDataInternalPrevKeys = Object.keys(couponDataInternal.prev);
    const couponDataInternalCurrKeys = Object.keys(couponDataInternal.curr);
    if (loading && couponDataInternalPrevKeys.length >= 1 && couponDataInternalCurrKeys.length >= 1) {
      //Check if coupon has not changed, if it has not changed approve bet else reject it
      if (Object.keys(couponDataInternal.prev).length !== Object.keys(couponDataInternal.curr).length) {
        setSuccess(false);
        setLoading(false);
        const userActionsCopy = { ...userActions };
        userActionsCopy.approveBet = false;
        userActionsCopy.makeBet = false;
        dispatch(reduceUserActions(userActionsCopy));
        //setDataLoaded({ codereData: false, liveDetailData: false });
        dataLoaded.current.codereData = false;
        dataLoaded.current.liveDetailData = false;
        setLiveDetailDataIncomingDataArray([]);
        return;
      }
      if (JSON.stringify(couponDataInternal.prev) === JSON.stringify(couponDataInternal.curr)) {
        //**are equal despite are different */
        approveBet();
      } else {
        const diff = getObjectDiff(couponDataInternal.prev, couponDataInternal.curr);
        //check if all the bets that are different should pay more or equal and are not Locked otherwise set variable to false
        const allPayMore = diff.every((bet) => {
          if (
            couponDataInternal.curr[bet].result.Odd >= couponDataInternal.prev[bet].result.Odd &&
            !couponDataInternal.curr[bet].locks?.eventOverview &&
            !couponDataInternal.curr[bet].locks?.oddsOverview &&
            !couponDataInternal.curr[bet].game?.Locked &&
            !couponDataInternal.curr[bet].result.Locked
          ) {
            return true;
          }
          return false;
        });

        if (allPayMore) {
          approveBet();
        } else {
          setSuccess(false);
          setLoading(false);
          const userActionsCopy = { ...userActions };
          userActionsCopy.approveBet = false;
          userActionsCopy.makeBet = false;
          dataLoaded.current.codereData = false;
          dataLoaded.current.liveDetailData = false;
          setLiveDetailDataIncomingDataArray([]);
          dispatch(reduceUserActions(userActionsCopy));
        }
      }
    }
  }, [couponDataInternal]);

  React.useEffect(() => {
    setDisable(couponFooter.error);
  }, [couponFooter.error]);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ m: 1, position: 'relative', marginBottom: 'unset' }}>
        <Button
          variant="contained"
          sx={buttonSx}
          disabled={disable}
          onClick={handleButtonClick}
          data-testid="button-with-loader"
        >
          <Typography variant="subtitle1">{text}</Typography>
        </Button>
        {loading && (
          <CircularProgress
            data-testid="loader"
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
};
export default ButtonWithLoader;
