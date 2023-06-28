import React, { FC } from 'react';
import { EventOverviewProps, ParticipantsArrayProps } from '../../types/type';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';
import LiveScoreConverter from './LiveScoreConverter';
import { Participants } from '../molecules/EventOverview';
import YellowCards from '../../images/icons/Yellow_card.svg';
import RedCards from '../../images/icons/Red_card.svg';

/**
 * Renders the main view of an event
 * @param data The data for an event which belongs to a sportHandle
 * @param lock the lock boolean value of the parent data
 */
const LiveDetailHeader: FC<EventOverviewProps> = ({ data }) => {
  const theme = useTheme();
  const maxWidth600 = useMediaQuery('(max-width:600px)');
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
  const maxCellWidth = '10rem';
  const minCellWidth = '3rem';
  const dateReplaced = data.StartDate.replace(/\D/g, '');
  const startDate = new Date(+dateReplaced);
  const dateFormated = startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString();
  return (
    <Card
      elevation={4}
      sx={{
        minHeight: '78px',
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
          paddingBottom: 'unset!important',
          backgroundColor: 'secondary.contrastText',
        }}
      >
        <Grid container flexDirection="row" flexWrap="nowrap">
          <Grid item>
            <Grid container justifyContent="space-between" flexWrap="nowrap" sx={{ marginRight: theme.spacing(4) }}>
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
          <Grid item>
            <Card
              square={true}
              sx={{
                minHeight: '78px',
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
                  backgroundColor: 'secondary.contrastText',
                  display: 'flex',
                  flexDirection: 'row',
                  overflowX: 'auto',
                }}
              >
                <Grid
                  item
                  marginRight={theme.spacing(2)}
                  maxWidth={maxCellWidth}
                  minWidth={minCellWidth}
                  textAlign="center"
                >
                  <Typography
                    fontSize={maxWidth600 ? 'x-small' : 'small'}
                    variant="subtitle1"
                    className="font-face-SaralaBold"
                    data-testId="Start"
                  >
                    Inicio
                  </Typography>
                  <Typography fontSize={maxWidth600 ? 'x-small' : 'small'} variant="body2">
                    {dateFormated}
                  </Typography>
                </Grid>
                <Grid
                  item
                  marginRight={theme.spacing(2)}
                  maxWidth={maxCellWidth}
                  minWidth={minCellWidth}
                  textAlign="center"
                >
                  <Typography
                    fontSize={maxWidth600 ? 'x-small' : 'small'}
                    variant="subtitle1"
                    className="font-face-SaralaBold"
                    data-testId="Sport"
                  >
                    Deporte
                  </Typography>
                  <Typography fontSize={maxWidth600 ? 'x-small' : 'small'} variant="body2">
                    {data.SportName}
                  </Typography>
                </Grid>
                <Grid
                  item
                  marginRight={theme.spacing(2)}
                  maxWidth={maxCellWidth}
                  minWidth={minCellWidth}
                  textAlign="center"
                >
                  <Typography
                    fontSize={maxWidth600 ? 'x-small' : 'small'}
                    variant="subtitle1"
                    className="font-face-SaralaBold"
                    data-testId="League"
                  >
                    Liga
                  </Typography>
                  <Typography fontSize={maxWidth600 ? 'x-small' : 'small'} variant="body2">
                    {data.LeagueName}
                  </Typography>
                </Grid>
                <Grid
                  item
                  marginRight={theme.spacing(2)}
                  maxWidth={maxCellWidth}
                  minWidth={minCellWidth}
                  textAlign="center"
                >
                  <Typography
                    fontSize={maxWidth600 ? 'x-small' : 'small'}
                    variant="subtitle1"
                    className="font-face-SaralaBold"
                    data-testId="Country"
                  >
                    País
                  </Typography>
                  <Typography fontSize={maxWidth600 ? 'x-small' : 'small'} variant="body2">
                    {data.CountryName}
                  </Typography>
                </Grid>
                {data.SportHandle === 'soccer' && (
                  <>
                    {' '}
                    <Grid
                      item
                      marginRight={theme.spacing(2)}
                      maxWidth={maxCellWidth}
                      minWidth={minCellWidth}
                      textAlign="center"
                    >
                      <Typography
                        fontSize={maxWidth600 ? 'x-small' : 'small'}
                        variant="subtitle1"
                        className="font-face-SaralaBold"
                        data-testId="Home"
                        noWrap
                      >
                        {participants.home}
                      </Typography>
                      <Grid container justifyContent="center">
                        <Grid flexDirection="column">
                          <img
                            src={YellowCards}
                            alt="Tarjetas Amarillas"
                            style={{ width: '16px', height: '16px', marginRight: theme.spacing(1) }}
                            data-testId="yellow-card"
                          />

                          <Typography
                            fontSize={maxWidth600 ? 'x-small' : 'small'}
                            variant="body2"
                            marginRight={theme.spacing(1)}
                          >
                            {data.liveData.YellowCardsHome}
                          </Typography>
                        </Grid>
                        <Grid flexDirection="column">
                          <img
                            src={RedCards}
                            alt="Tarjetas Rojas"
                            style={{ width: '16px', height: '16px', marginLeft: theme.spacing(1) }}
                            data-testId="red-card"
                          />

                          <Typography
                            fontSize={maxWidth600 ? 'x-small' : 'small'}
                            variant="body2"
                            marginLeft={theme.spacing(1)}
                          >
                            {data.liveData.ResultHome}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      marginRight={theme.spacing(2)}
                      maxWidth={maxCellWidth}
                      minWidth={minCellWidth}
                      textAlign="center"
                    >
                      <Typography
                        fontSize={maxWidth600 ? 'x-small' : 'small'}
                        variant="subtitle1"
                        className="font-face-SaralaBold"
                        noWrap
                        data-testId="Away"
                      >
                        {participants.away}
                      </Typography>
                      <Grid container justifyContent="center">
                        <Grid flexDirection="column">
                          <img
                            src={YellowCards}
                            alt="Tarjetas Amarillas"
                            style={{ width: '16px', height: '16px', marginRight: theme.spacing(1) }}
                            data-testId="yellow-card"
                          />

                          <Typography
                            fontSize={maxWidth600 ? 'x-small' : 'small'}
                            variant="body2"
                            marginRight={theme.spacing(1)}
                          >
                            {data.liveData.YellowCardsAway}
                          </Typography>
                        </Grid>
                        <Grid flexDirection="column">
                          <img
                            src={RedCards}
                            alt="Tarjetas Rojas"
                            style={{ width: '16px', height: '16px', marginLeft: theme.spacing(1) }}
                            data-testId="red-card"
                          />

                          <Typography
                            fontSize={maxWidth600 ? 'x-small' : 'small'}
                            variant="body2"
                            marginLeft={theme.spacing(1)}
                          >
                            {data.liveData.RedCardsAway}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default LiveDetailHeader;
