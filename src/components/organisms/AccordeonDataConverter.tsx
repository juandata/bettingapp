import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import { AccordionDetails, Button, Grid } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventOverviewMemo from '../molecules/EventOverview';
import comparator from '../utilities/comparator';
import LockIcon from '@mui/icons-material/Lock';
import { AccordeonDataConverterProps, EventsArrayProps } from '../../types/type';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { CodereDataProps, ActionTypes } from '../../store/stateTypes';

/**
 * 
 * Transform data from https://m.codere.com.co/csbgonline/NoSessionTimeout/GetHomeLiveEvents?languageCode=es-co&includeLiveCount=true&gametypes=97;1;18;184;874;959;159;259;393;195;317;459;911;303;313;1828;2083;158
  display the data of a sport, there should be variants as sports are different
  @param data the data of a sportHandle
*/
const AccordeonDataConverter: React.FC<{ data: AccordeonDataConverterProps }> = ({ data }) => {
  const [listOfEvents, setListOfEvents] = useState<React.ReactNode>(null);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const theme = useTheme();
  /*
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    console.log(event);
    setExpanded(isExpanded ? panel : false);
  };*/
  useEffect(() => {
    setListOfEvents(
      data.Events.map((el: EventsArrayProps) => <EventOverviewMemo data={el} key={el.Name} lock={data.Locked} />)
    );
  }, [data]);
  return (
    <Accordion
      disableGutters
      defaultExpanded={false}
      TransitionProps={{ unmountOnExit: true }} /*onChange={handleChange('panel1')}*/
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        backgroundColor: 'secondary.contrastText',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography variant="h6" className="font-face-ArchivoBlack">
          {data.Name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 'unset' }}>
        {data.Locked ? (
          <Grid
            sx={{ paddingBottom: theme.spacing(1) }}
            container
            justifyContent="space-around"
            alignContent="space-around"
            height="100%"
          >
            <LockIcon data-testid="lock-icon" fontSize="large" />
          </Grid>
        ) : (
          listOfEvents
        )}
      </AccordionDetails>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: '100%!important',
            height: '100%!important',
            backgroundColor: 'secondary.contrastText',
            marginTop: 'unset!important',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
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
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandLessIcon fontSize="large" sx={{ position: 'relative' }} />
          </Button>
        </Paper>
      </Box>
    </Accordion>
  );
};

const AccordeonMemo = React.memo(AccordeonDataConverter, comparator);

const AccordeonMaper = () => {
  const userActions = useSelector((state: { userActions: ActionTypes }) => state.userActions);
  const codereData = useSelector((state: { codereData: CodereDataProps }) => state.codereData);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const codereDataKeys = Object.keys(codereData.LiveSport);

  const alertClick = () => {
    location.reload();
  };
  useEffect(() => {
    if (codereDataKeys.length >= 1) {
      setLoading(false);
    }
  }, [codereData]);
  const codereDataLiveSportKeys = Object.keys(codereData.LiveSport);
  const accordeons =
    codereDataLiveSportKeys.length >= 1
      ? codereData.LiveSport.map((el: AccordeonDataConverterProps) => {
          return <AccordeonMemo data={el} key={el.SportHandle} />;
        })
      : [];

  let alertWindow = null;
  let errorDiv = null;
  if (
    userActions.connectionError ===
      'adrebet.com: Por favor revisa la conexión a internet. El servidor está desconectado.' ||
    userActions.connectionError ===
      'adrebet.com: Los mercados en vivo no están disponibles, por favor espere un momento.' ||
    userActions.connectionError ===
      'adrebet.com: Los mercados en vivo no están disponibles, lo invitamos a probar con otros mercados.'
  ) {
    alertWindow = (
      <Alert
        severity={
          userActions.connectionError ===
          'adrebet.com: Los mercados en vivo no están disponibles, por favor espere un momento.'
            ? 'warning'
            : 'error'
        }
        data-testid="alert-connection-error-close-icon"
        sx={{
          width: 'fit-content',
          height: 'fit-content',
          margin: 'auto',
        }}
        action={
          (userActions.connectionError ===
            'adrebet.com: Los mercados en vivo no están disponibles, lo invitamos a probar con otros mercados.' ||
            userActions.connectionError ===
              'adrebet.com: Por favor revisa la conexión a internet. El servidor está desconectado.') && (
            <Button color="inherit" size="large" onClick={() => alertClick()}>
              X
            </Button>
          )
        }
      >
        {userActions.connectionError}
      </Alert>
    );
    errorDiv = (
      <Box sx={{ gridArea: 'main', width: '100%', height: '100%', display: 'flex', flexDirection: ' column' }}>
        {userActions.connectionError ===
          'adrebet.com: Los mercados en vivo no están disponibles, por favor espere un momento.' && (
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
    );
  }

  return (
    <>
      {errorDiv}
      {loading && errorDiv === null && (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
          <CircularProgress
            data-testid="loader"
            size={48}
            sx={{
              color: theme.palette.primary.main,
              marginTop: '8rem',
            }}
          />
        </Box>
      )}
      {userActions.connectionError === '' && !loading && <div>{accordeons}</div>}
    </>
  );
};
export default AccordeonMaper;
