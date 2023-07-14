import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import AppBarHeader from './components/molecules/AppBarHeader';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AccordeonMaper from './components/organisms/AccordeonDataConverter';
import Paper from '@mui/material/Paper';
import Coupon from './components/molecules/Coupon';
import LiveDetail from './components/pages/LiveDetail';
import { useTheme } from '@mui/material/styles';
import socket from './components/socket';
import Button from '@mui/material/Button';
import { clearCouponData } from './store/couponDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes, DataServerResponse, ServerResponseType } from './store/stateTypes';
import { reduceUserActions } from './store/userActionsSlice';
import { deleteLiveDetailData, reduceLiveDetailData } from './store/liveDetailDataSlice';
import getGamesLiveTokudaVsRubin from './data/gamesLiveWithHomeLiveEvents.json';
import getGamesLive2TokudaVsRubin from './data/gamesLiveWithHomeLiveEvents2.json';
import gamesLiveWithHomeLiveEventsMontevideo from './data/gamesLiveWithHomeLiveEventsMontevideo.json';
import gamesLiveWithHomeLiveEventsMontevideo2 from './data/gamesLiveWithHomeLiveEventsMontevideo2.json';
import gamesLiveWithHomeLiveEventsArsenalVsVelez from './data/gamesLiveWithHomeLiveEventsArsenalVsVelez.json';
import gamesLiveWithHomeLiveEventsArsenalVsVelez2 from './data/gamesLiveWithHomeLiveEventsArsenalVsVelez2.json';
import getHomeLiveEvents from './data/getHomeLiveEvents.json';
import getHomeLiveEvents2 from './data/getHomeLiveEvents2Mock.json';
import { reduceCodereData } from './store/codereDataSlice';
import { userActions as userActionsInitialState } from './store/initialState';

export const rentaTokudaVSRubinNodeId = '7219795979';
export const liverpoolVSmontevideoNodeId = '7471135441';
const arsenalVSvelez = '7459662829';
/**
 * First component of the beting aplication
 * @returns react component
 */
const App = () => {
  const [simulateServerResponse, setSimulateServerResponse] = useState(
    process.env.REACT_APP_SIMULATE_SERVER_RESPONSE as string
  ); //mockdata variable
  const userActions = useSelector((state: { userActions: ActionTypes }) => state.userActions);

  const dispatch = useDispatch();
  const [liveDetailMarketErrorCounter, setLiveDetailMarketErrorCounter] = useState<null | number>(0);
  const [getHomeLiveEventsErrorCounter, setGetHomeLiveEventsErrorCounter] = useState<null | number>(0);
  const getHomeLiveRef = useRef<null | number>(0);
  const liveDetailRef = useRef<null | number>(0);
  const userActionsRef = useRef<ActionTypes>(userActionsInitialState);
  const theme = useTheme();
  const useMockData = process.env.REACT_APP_MOCK_DATA; //mockdata variable
  const mockParentNodeId = userActions.lastLiveDetailId;

  /**
   * TODO:If user has been inactive for 15 minutes, reload the page or log out the user
   */
  useEffect(() => {
    if (useMockData === 'false') {
      socket.on('data', (data: ServerResponseType | DataServerResponse) => {
        console.log('data from server is', data);
        if ('error' in data) {
          const userActionsCopy = { ...userActionsRef.current };
          if (data.error === 'xhr poll error') {
            userActionsCopy.connectionError =
              'adrebet.com: Por favor revisa la conexión a internet. El servidor está desconectado.';
            dispatch(reduceUserActions(userActionsCopy));
            clearCouponData({});
          }
          if (getHomeLiveRef.current !== null && getHomeLiveRef.current <= 10) {
            console.log(data.error);
            const userActionsCopy = { ...userActionsRef.current };
            userActionsCopy.connectionError =
              'adrebet.com: Los mercados en vivo no están disponibles, por favor espere un momento.';
            dispatch(reduceUserActions(userActionsCopy));
            clearCouponData({});
          }
        } else {
          if (getHomeLiveRef.current !== 0) {
            //check if getHomeLiveEventsErrorCounter is not equal to 0, if so there was an error from response but the data recovered from server
            setGetHomeLiveEventsErrorCounter(0);
            /* alert(
              'check if getHomeLiveEventsErrorCounter is not equal to 0, if so there was an error from response but the data recovered from server'
            );*/
          }
          //console.log('alert error dispatching data:', data);
          dispatch(reduceCodereData(data));
        }
      });

      socket.on('displayLiveDetail', (data: ServerResponseType | DataServerResponse) => {
        debugger;
        if ('error' in data) {
          if (
            userActionsRef.current.lastLiveDetailId === data.room &&
            liveDetailRef.current !== null &&
            liveDetailRef.current <= 10
          ) {
            console.log(data.error);
            const userActionsCopy = { ...userActionsRef.current };
            userActionsCopy.connectionError =
              'adrebet.com: El mercado actual no está disponible, por favor espere un momento.';
            userActionsCopy.roomToDelete = data.room;
            dispatch(reduceUserActions(userActionsCopy));
          }
        } else {
          if (userActionsRef.current.lastLiveDetailId === data.NodeId && liveDetailRef.current !== 0) {
            //check if liveDetailMarketErrorCounter is not equal to 0, if so there was an error from response but the data recovered from server
            setLiveDetailMarketErrorCounter(0);
            console.log(
              'check if liveDetailMarketErrorCounter is not equal to 0, if so there was an error from response but the data recovered from server'
            );
          }
          dispatch(reduceLiveDetailData({ [data.NodeId]: data }));
        }
      });
      socket.on('connect_error', (err) => {
        const userActionsCopy = { ...userActions };
        userActionsCopy.connectionError = err.message;
        dispatch(reduceUserActions(userActionsCopy));
        console.log(`connect_error due to ${err.message}`);
      });

      //TODO:Find out how to stop the app working when the servers dies, this cannot HAPPEN!!
      socket.on('connect_failed', function () {
        console.log('Connection failedddd');
      });
      /*if (!socket.connected) {
        clearCouponData({});
        const userActionsCopy = { ...userActions };
        userActionsCopy.connectionError = 'Socket is disconnected';
        dispatch(reduceUserActions(userActionsCopy));
      }*/
    }
    if (useMockData === 'true') {
      dispatch(reduceCodereData(getHomeLiveEvents));
    }
  }, []);
  useEffect(() => {
    const msTimeout = process.env.REACT_APP_SIMULATE_SERVER_TIMEOUT as unknown as number;
    //simulating a server response
    if (
      process.env.REACT_APP_SIMULATE_SERVER_RESPONSE === 'true' ||
      process.env.REACT_APP_SIMULATE_SERVER_RESPONSE === 'false'
    ) {
      dispatch(reduceCodereData(simulateServerResponse === 'false' ? getHomeLiveEvents2 : getHomeLiveEvents));

      //dispatch liveDetailData depending on lastLiveDetailId for testing purposes
      setTimeout(() => {
        dispatch(
          reduceLiveDetailData({
            [rentaTokudaVSRubinNodeId]:
              simulateServerResponse === 'false' ? getGamesLive2TokudaVsRubin : getGamesLiveTokudaVsRubin,
          })
        );
      }, 2500);

      setTimeout(() => {
        dispatch(
          reduceLiveDetailData({
            [arsenalVSvelez]:
              simulateServerResponse === 'false'
                ? gamesLiveWithHomeLiveEventsArsenalVsVelez2
                : gamesLiveWithHomeLiveEventsArsenalVsVelez,
          })
        );
      }, 3500);
      dispatch(
        reduceLiveDetailData({
          [liverpoolVSmontevideoNodeId]:
            simulateServerResponse === 'false'
              ? gamesLiveWithHomeLiveEventsMontevideo2
              : gamesLiveWithHomeLiveEventsMontevideo,
        })
      );

      const timeout = setTimeout(() => {
        setSimulateServerResponse(simulateServerResponse === 'true' ? 'false' : 'true');
      }, msTimeout);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [simulateServerResponse]);

  React.useEffect(() => {
    userActionsRef.current = { ...userActions };
    if (
      userActions.connectionError ===
        'adrebet.com: Los mercados en vivo no están disponibles, por favor espere un momento.' &&
      getHomeLiveEventsErrorCounter !== null
    ) {
      setGetHomeLiveEventsErrorCounter(getHomeLiveEventsErrorCounter + 1);
    }
    if (
      userActions.connectionError ===
        'adrebet.com: El mercado actual no está disponible, por favor espere un momento.' &&
      liveDetailMarketErrorCounter !== null
    ) {
      setLiveDetailMarketErrorCounter(liveDetailMarketErrorCounter + 1);
    }

    if (userActions.connectionError === '') {
      setGetHomeLiveEventsErrorCounter(0);
      setLiveDetailMarketErrorCounter(0);
    }
    if (getHomeLiveEventsErrorCounter === 10 && getHomeLiveEventsErrorCounter !== null) {
      setGetHomeLiveEventsErrorCounter(null);
    }
    if (liveDetailMarketErrorCounter === 10 && liveDetailMarketErrorCounter !== null) {
      setLiveDetailMarketErrorCounter(null);
    }
  }, [userActions]);

  React.useEffect(() => {
    if (process.env.REACT_APP_SIMULATE_SERVER_RESPONSE === 'no' && useMockData === 'true') {
      //dispatch liveDetailData depending on lastLiveDetailId for testing purposes
      if (mockParentNodeId === rentaTokudaVSRubinNodeId) {
        dispatch(
          reduceLiveDetailData({
            [mockParentNodeId]: getGamesLiveTokudaVsRubin,
          })
        );
      }
      if (mockParentNodeId === liverpoolVSmontevideoNodeId) {
        dispatch(
          reduceLiveDetailData({
            [mockParentNodeId]: gamesLiveWithHomeLiveEventsMontevideo,
          })
        );
      }
      if (mockParentNodeId === arsenalVSvelez) {
        dispatch(
          reduceLiveDetailData({
            [mockParentNodeId]: gamesLiveWithHomeLiveEventsArsenalVsVelez,
          })
        );
      }
    }
  }, [userActions.lastLiveDetailId]);

  React.useEffect(() => {
    getHomeLiveRef.current = getHomeLiveEventsErrorCounter;
    liveDetailRef.current = liveDetailMarketErrorCounter;
    if (getHomeLiveEventsErrorCounter === null) {
      const userActionsCopy = { ...userActions };
      userActionsCopy.connectionError =
        'adrebet.com: Los mercados en vivo no están disponibles, lo invitamos a probar con otros mercados.';
      dispatch(reduceUserActions(userActionsCopy));
    }
    if (liveDetailMarketErrorCounter === null) {
      //delete market from liveDetailData
      dispatch(deleteLiveDetailData(userActions.roomToDelete));
      const userActionsCopy = { ...userActions };
      userActionsCopy.connectionError =
        'adrebet.com: El mercado actual no está disponible, lo invitamos a probar con otros mercados.';
      dispatch(reduceUserActions(userActionsCopy));
    }
  }, [getHomeLiveEventsErrorCounter, liveDetailMarketErrorCounter]);
  const minWidth1210 = useMediaQuery('(min-width:1210px)');
  const maxHeight400 = useMediaQuery('(max-height:400px)');
  const couponMobileStyles =
    !minWidth1210 && userActions.expandCoupon
      ? {
          position: 'absolute',
          top: '0px',
          border: 'solid',
          height: '100vh',
          zIndex: theme.zIndex.tooltip,
          width: '100%',
        }
      : null;
  const sectionStyle = {
    minHeight: '400px',
    height: '100%',
  };
  const headerNavigation = (
    <>
      <Box sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>
        <AppBarHeader />
      </Box>
      <Box sx={{ gridArea: 'navigation', bgcolor: 'secondary.main', paddingLeft: theme.spacing(1) }}>
        <nav>
          <NavLink ativeclassname="active" to="/">
            <Button variant="text">Bienvenido</Button>
          </NavLink>
          <NavLink to="/EnVivo">
            <Button variant="text"> En vivo</Button>
          </NavLink>

          <NavLink ativeclassname="active" to="/Acerca">
            <Button variant="text"> Acerca</Button>
          </NavLink>
        </nav>
      </Box>
    </>
  );
  const liveData = (
    <Box sx={{ gridArea: 'main', bgcolor: 'secondary.light', overflowX: 'hidden' }}>
      <section style={sectionStyle}>
        <Paper elevation={2} sx={{ height: '100%' }}>
          <AccordeonMaper />
        </Paper>
      </section>
    </Box>
  );

  const aboutPage = (
    <Box sx={{ gridArea: 'main', bgcolor: 'secondary.light', overflowX: 'hidden' }}>
      <section>
        <AboutPage />
      </section>
    </Box>
  );
  const homePage = (
    <Box sx={{ gridArea: 'main', bgcolor: 'secondary.light', overflowX: 'hidden' }}>
      <section>
        <HomePage />
      </section>
    </Box>
  );
  return (
    <Box
      sx={{
        width: '100%',
        height: maxHeight400 ? 'unset' : '100vh',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          height: '100vh',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: minWidth1210 ? '7% 8% 75% 10%' : '7% 8% 50% 30% 5%',
          gridTemplateAreas: minWidth1210
            ? `"header header header header" "navigation navigation navigation navigation"
      "main main main aside"
      "footer footer footer footer"`
            : `"header header header header"
            "navigation navigation navigation navigation"
      "main main main main"
      "aside aside aside aside"
      "footer footer footer footer"`,
        }}
      >
        <BrowserRouter>
          {headerNavigation}

          <Routes>
            <Route path="/" element={homePage} />
            <Route path="EnVivo" element={liveData} />
            <Route path="DetalleEnVivo" element={<LiveDetail />} />
            <Route path="Acerca" element={aboutPage} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>

        <Box
          sx={{
            gridArea: 'aside',
            bgcolor: 'secondary.contrastText',
            color: 'primary.contrastText',
            overflow: 'auto',
            ...couponMobileStyles,
          }}
        >
          <Coupon />
        </Box>
        <Box sx={{ gridArea: 'footer', bgcolor: 'secondary.main' }}>
          <Typography>Footer</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default App;
