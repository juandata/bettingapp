import * as React from 'react';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import { useTheme } from '@mui/material/styles';
import comparator from '../utilities/comparator';
import Results from './Results';
import { OddsOverviewProps } from '../../types/type';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../store/stateTypes';
import { reduceUserActions } from '../../store/userActionsSlice';
/**
 * The view of the different markets available for each event, the quantity of markets varies.
 * @param games the games available in the event.
 * @param name the name of the event.
 * @param locks the locks boolean values of the parent data
 */
const OddsOverview: React.FC<OddsOverviewProps> = ({
  games,
  name,
  locks = { eventOverview: false, oddsOverview: false },
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userActions = useSelector((state: { userActions: ActionTypes }) => state.userActions);
  return games.length > 0 && !games[0].Locked ? (
    <Grid
      container
      direction="row"
      flexWrap="nowrap"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{ height: '90px' }}
      data-testid="odds-overview"
    >
      <Box sx={{ display: 'flex', paddingRight: theme.spacing(1) }}>
        {games.map((el) => {
          return el.Locked ? (
            <Grid container justifyContent="space-around" alignContent="space-around" height="100%">
              <LockIcon data-testid="lock-icon" fontSize="large" />
            </Grid>
          ) : (
            <Grid
              sx={{ maxWidth: 'fit-content', marginRight: theme.spacing(0.25), marginLeft: theme.spacing(0.25) }}
              container
              direction="row"
              flexWrap="nowrap"
              key={el.NodeId}
            >
              <Results el={el} results={el.Results} name={name} locks={locks} />
            </Grid>
          );
        })}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
            marginLeft: theme.spacing(0.8),
            marginRight: theme.spacing(0.8),
          }}
        >
          <NavLink
            style={{
              minWidth: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              color: theme.palette.primary.main,
              textDecoration: 'none',
            }}
            data-testid="more-live-markets"
            onClick={() => {
              const parentNodeId = games[0].ParentNodeId;
              const userActionsCopy = { ...userActions };
              const displayLiveDetail = {};
              displayLiveDetail[parentNodeId] = {
                parentNodeId: games[0].ParentNodeId,
                name: name,
                locks: locks,
              };
              userActionsCopy.displayLiveDetail = displayLiveDetail;
              userActionsCopy.lastLiveDetailId = parentNodeId;
              dispatch(reduceUserActions(userActionsCopy));
            }}
            to="/DetalleEnVivo"
          >
            <Tooltip title="Más mercados">
              <IconButton>
                <OpenInNewIcon
                  sx={{
                    color: theme.palette.primary.dark,
                    '&:hover': {
                      color: theme.palette.primary.light,
                      stroke: 'black',
                      strokeWidth: '0.2px',
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
          </NavLink>
        </Box>
      </Box>
    </Grid>
  ) : (
    <Grid container justifyContent="space-around" alignContent="space-around" height="100%">
      <LockIcon data-testid="lock-icon" fontSize="large" />
    </Grid>
  );
};
export default React.memo(OddsOverview, comparator);
