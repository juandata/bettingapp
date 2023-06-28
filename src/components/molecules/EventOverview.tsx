import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OddsOverview from './OddsOverview';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import LiveScoreConverter from '../atoms/LiveScoreConverter';
import comparator from '../utilities/comparator';
import useMediaQuery from '@mui/material/useMediaQuery';
//import marginCalculator, { games } from '../utilities/marginCalculator';
import LockIcon from '@mui/icons-material/Lock';
import { EventOverviewProps, ParticipantsArrayProps } from '../../types/type';
export type Participants = {
  home: string;
  away: string;
};

/**
 * Renders the main view of an event
 * @param data The data for an event which belongs to a sportHandle
 * @param lock the lock boolean value of the parent data
 */
const EventOverview: React.FC<EventOverviewProps> = ({ data, lock }) => {
  const theme = useTheme();
  const maxWidth600 = useMediaQuery('(max-width:600px)');
  /* React.useEffect(() => {
    //TODO: Implement the margin calculator so the odds render by the app are not the same than coderes data.
    // console.log(marginCalculator(data.Games, data.Name));
  }, [data]);
*/
  const participants: Participants = {
    home: '',
    away: '',
  };
  data.Participants.forEach((el: ParticipantsArrayProps) => {
    if (el.IsHome) {
      participants.home = el.LocalizedNames.LocalizedValues[0].Value;
    } else {
      participants.away = el.LocalizedNames.LocalizedValues[0].Value;
    }
  });
  const periodName = data.liveData.PeriodName;
  const matchTime =
    data.liveData.MatchTime !== -1
      ? data.liveData.MatchTime
      : data.liveData.RemainingPeriodTime !== ''
      ? data.liveData.RemainingPeriodTime
      : data.liveData.Time;
  //TODO: check the diference for accesing the live time with diferent sports
  const resultHome = data.liveData.ResultHome;
  const resultAway = data.liveData.ResultAway;
  return (
    <Card
      elevation={4}
      sx={{
        minHeight: '78px',
        marginBottom: theme.spacing(0.25),
        paddingLeft: theme.spacing(1),
        backgroundColor: 'secondary.contrastText',
        overflowX: 'auto',
      }}
    >
      <CardContent
        sx={{
          padding: 'unset',
          minWidth: '280px',
          height: 'auto',
          paddingBottom: theme.spacing(0.5) + '!important',
          backgroundColor: 'secondary.contrastText',
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <Grid container justifyContent="space-between" flexWrap="nowrap">
              <Typography
                fontSize={maxWidth600 ? 'x-small' : 'small'}
                variant="subtitle1"
                className="font-face-SaralaBold"
                noWrap
              >
                {participants.home}
              </Typography>
              <LiveScoreConverter data={data.liveData} result={resultHome} home={true} />
            </Grid>
            <Grid container justifyContent="space-between" flexWrap="nowrap">
              <Typography
                fontSize={maxWidth600 ? 'x-small' : 'small'}
                variant="subtitle1"
                className="font-face-SaralaBold"
                noWrap
              >
                {participants.away}
              </Typography>
              <LiveScoreConverter data={data.liveData} result={resultAway} home={false} />
            </Grid>

            <Grid container spacing={1}>
              <Grid item>
                <Typography fontSize={maxWidth600 ? 'x-small' : 'small'} variant="body2" color="primary.dark">
                  {periodName}
                </Typography>
              </Grid>
              <Grid item>
                <Typography fontSize={maxWidth600 ? 'x-small' : 'small'} variant="body2" color="primary.dark">
                  {matchTime}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7} alignItems="center">
            {data.Locked ? (
              <Grid container justifyContent="space-around" alignContent="space-around" height="100%">
                <LockIcon data-testid="lock-icon" fontSize="large" />
              </Grid>
            ) : (
              <OddsOverview
                games={data.Games}
                name={data.Name}
                locks={{ eventOverview: lock, oddsOverview: data.Locked }}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
const EventOverviewDemo = React.memo(EventOverview, comparator);

export default EventOverviewDemo;
