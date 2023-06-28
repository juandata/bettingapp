import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LiveScoreConverterProps } from '../../types/type';

/**
 * Displays the correct score format in html for the sport
 * The way the score is displayed depends on the sport
 * @param data The data for an event
 * @param result The result of an event
 * @param home Whether the data received belongs to a home or away participant
 */
const LiveScoreConverter: React.FC<LiveScoreConverterProps> = ({ data, result, home }) => {
  const theme = useTheme();
  const matches = useMediaQuery('(min-width:600px)');
  const key = data.hasOwnProperty('Sets')
    ? 'Sets'
    : data.hasOwnProperty('Quarters')
    ? 'Quarters'
    : data.hasOwnProperty('Periods')
    ? 'Periods'
    : data.hasOwnProperty('Innings')
    ? 'Innings'
    : null;
  const sets =
    matches && key !== null && data[key] !== null && data[key].length >= 2
      ? data[key].map((value: Array<number>, index: number) => {
          return (
            <Typography
              key={data.ParticipantHome + data.ParticipantAway + index}
              variant="subtitle1"
              color={index === data[key].length - 1 ? 'primary.dark' : 'primary.main'}
              sx={{
                width: '20px',
                textAlign: 'center',
                marginRight: index === data[key].length - 1 ? 'unset' : theme.spacing(1) + '!important',
              }}
            >
              {value[home ? 0 : 1]}
            </Typography>
          );
        })
      : null;
  return (
    <Grid container justifyContent="flex-end" flexWrap="nowrap" style={{ width: 'auto' }}>
      <Tooltip title={home ? key : null} placement="top-start">
        <Grid container flexWrap="nowrap">
          {sets}
        </Grid>
      </Tooltip>
      <Divider orientation="vertical" flexItem sx={{ marginRight: theme.spacing(1), marginLeft: theme.spacing(1) }} />

      <Tooltip title={home ? ' Marcador' : null} placement="top-start">
        <Typography variant="subtitle1" color="primary.dark" fontWeight={600} sx={{ minWidth: '20px' }}>
          {result}
        </Typography>
      </Tooltip>
    </Grid>
  );
};
export default LiveScoreConverter;
