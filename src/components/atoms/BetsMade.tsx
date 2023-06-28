import React from 'react';
import Box from '@mui/material/Box';
import theme from '../../styles/theme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BetsTable from './BetsTable';
import { useSelector } from 'react-redux';
import { UserInterface } from '../../store/stateTypes';
const BetsMade = () => {
  const userData = useSelector((state: { userData: UserInterface }) => state.userData);
  const betIds = Object.keys(userData.bets);
  const betList = betIds.map((betId) => {
    //const combined = userData.bets[betId].couponFooter.combined;

    return (
      <Accordion
        key={betId}
        disableGutters
        defaultExpanded={true}
        TransitionProps={{ unmountOnExit: true }} /*onChange={handleChange('panel1')}*/
        sx={{
          backgroundColor: 'secondary.contrastText',
          width: '100%',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{ paddingLeft: theme.spacing(1) }}
        >
          <Typography variant="h6" className="font-face-ArchivoBlack">
            <Grid container alignItems="baseline">
              <Typography
                variant="subtitle1"
                textAlign="left"
                sx={{ marginTop: '-1px!important' }}
                color={theme.palette.primary.contrastText}
                fontWeight={600}
              >
                ID:
              </Typography>
              <Typography
                variant="subtitle2"
                textAlign="left"
                sx={{ marginLeft: theme.spacing(0.5) + '!important', marginTop: '-1px!important' }}
                color={theme.palette.secondary.main}
              >
                {betId}
              </Typography>
            </Grid>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingLeft: 'unset', paddingRight: 'unset' }}>
          {/*<Grid container alignItems="baseline">
            <Typography
              variant="subtitle1"
              textAlign="left"
              sx={{ marginTop: '-1px!important' }}
              color={theme.palette.primary.contrastText}
              fontWeight={600}
            >
              Combinada:
            </Typography>
            <Typography
              variant="subtitle2"
              textAlign="left"
              sx={{ marginLeft: theme.spacing(0.5) + '!important', marginTop: '-1px!important' }}
              color={theme.palette.secondary.main}
            >
              {combined ? 'Sí' : 'No'}
            </Typography>
          </Grid>*/}
          <BetsTable betId={betId} />
        </AccordionDetails>
      </Accordion>
    );

    //userData.bets[betId].couponData.combined;
    /*return (
      <Grid key={betId} width="100%">
        <Grid container alignItems="baseline" flexWrap="nowrap">
          <Grid container alignItems="baseline">
            <Typography
              variant="subtitle1"
              textAlign="left"
              sx={{ marginTop: '-1px!important' }}
              color={theme.palette.primary.contrastText}
              fontWeight={600}
            >
              ID:
            </Typography>
            <Typography
              variant="subtitle2"
              textAlign="left"
              sx={{ marginLeft: theme.spacing(0.5) + '!important', marginTop: '-1px!important' }}
              color={theme.palette.secondary.main}
            >
              {betId}
            </Typography>
          </Grid>
          <Grid container alignItems="baseline">
            <Typography
              variant="subtitle1"
              textAlign="left"
              sx={{ marginTop: '-1px!important' }}
              color={theme.palette.primary.contrastText}
              fontWeight={600}
            >
              Combinada:
            </Typography>
            <Typography
              variant="subtitle2"
              textAlign="left"
              sx={{ marginLeft: theme.spacing(0.5) + '!important', marginTop: '-1px!important' }}
              color={theme.palette.secondary.main}
            >
              {combined ? 'Sí' : 'No'}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" sx={{ marginTop: theme.spacing(1) }} />
      </Grid>
    );*/
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //const betsArray = [];
  /* betIds.forEach((bet) =>
    Object.keys[userData[bet].couponData].map((childBet) => betsArray.push(<div key={childBet}>{childBet}</div>))
  );*/
  return betIds.length === 0 ? null : (
    <Box sx={{ marginTop: theme.spacing(0.2) }}>
      <Grid container flexDirection="column" alignItems="flex-start">
        {betList}
      </Grid>
    </Box>
  );
};
export default BetsMade;
