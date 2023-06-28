/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import comparator from '../utilities/comparator';
//import marginCalculator, { games } from '../utilities/marginCalculator';
import LockIcon from '@mui/icons-material/Lock';
import OddButton from './OddButton';
import { ResultsArrayProps, ResultProps } from '../../types/type';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Render the results of an event
 * @param el the result element object
 * @param results the possible results
 * @param name the name of the event
 * @param locks the locks boolean values of the parent data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Results = ({
  el,
  results,
  name,
  locks = { eventOverview: true, oddsOverview: true },
  showTitle = true,
}: ResultProps) => {
  const theme = useTheme();
  const maxWidth600 = useMediaQuery('(max-width:600px)');

  /*
 TODO: 1. Figure out how to decrease the margin of the book. The only way I think now is to rest two or three decimals to the codere odds.
 For example: 
  Odd= 2.35 %=0.42 new porcentage: 0.4 newOdd= 2.5
  The problem is whether this new addition could make the profit margin to be less than 0%.
  There should be a middleware that checks whether the sum of the three new margins are not less than 100%
 React.useEffect(() => {
    console.log(marginCalculator(games));
  }, [Results]);

  2. Figure out how to create a usersBetSimulator() which would simulate random bets made by the users.
  There should be several configuration options:
    -all bets placed on the favorite 
    -all bets places on the underdog
    -all bets places random
    -number of users
      -number of best per user
      -beting style of the user (favorite | underdog | random)

*/

  if (results.length === 0) {
    return <div>no results available</div>;
  }
  //TODO:Check if is necesary to update the Locked prop in the coupon bet, if this is the case it will be necesary to update all the events in the results prop
  if (el.Locked) {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="body2">{el.Name}</Typography>
        </Grid>
        <Grid item>
          <LockIcon data-testid="lock-icon" fontSize="small" />
        </Grid>
      </Grid>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultsArrayCorrectlySorted: any[] = [];
  results.forEach((value: ResultsArrayProps) => {
    let oddTitle = value.Name;
    if (el.DisplayTypeName.startsWith('3way')) {
      oddTitle = value.SortOrder == 0 ? '1' : value.SortOrder === 1 ? 'X' : value.SortOrder === 2 ? '2' : value.Name;
    }
    if (el.Name.includes('Hándicap') || el.Name.includes('Handicap')) {
      const nameSplitted = value.Name.replace(/[()]/g, '').split(' ');
      const name = value.Name.slice(0, 3).toUpperCase();
      const handicapOdd = nameSplitted[nameSplitted.length - 1];
      oddTitle = name + ' ' + handicapOdd;
    }
    resultsArrayCorrectlySorted[value.SortOrder] = (
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        flexWrap="nowrap"
        justifyContent="space-between"
        key={value.NodeId}
        sx={{
          maxWidth: 'fit-content',
          marginRight: theme.spacing(0.15),
          marginLeft: theme.spacing(0.15),
          padding: theme.spacing(0.5),
        }}
      >
        {value.Locked ? (
          <Grid container justifyContent="space-around" alignContent="space-around" height="100%">
            <LockIcon data-testid="lock-icon" fontSize="large" />
          </Grid>
        ) : (
          <>
            <Tooltip title={value.Name} placement="top-start">
              <Typography variant="body2" textAlign="center" noWrap>
                {oddTitle}
              </Typography>
            </Tooltip>
            <OddButton el={el} ele={value} name={name} locks={locks} />
          </>
        )}
      </Grid>
    );
  });
  if (resultsArrayCorrectlySorted.length === 0) {
    return <div>results length is 0</div>;
  }
  return (
    <Grid container direction="column" alignItems="center" marginRight={theme.spacing(1)}>
      {showTitle && (
        <Grid item>
          <Typography noWrap variant="body2" sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>
            {el.Name}
          </Typography>
        </Grid>
      )}
      <Grid
        container
        id="resultsidhere"
        alignItems="center"
        justifyContent={maxWidth600 ? 'space-between' : 'center'}
        flexWrap="nowrap"
      >
        {resultsArrayCorrectlySorted}
      </Grid>
    </Grid>
  );
};
export default React.memo(Results, comparator);
