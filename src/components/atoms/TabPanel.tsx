import React, { memo } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Results from '../molecules/Results';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ActionTypes } from '../../store/stateTypes';
import { GamesProps } from '../../types/type';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export interface TabPanelProps {
  category: GamesProps[];
  userActions: ActionTypes;
  locked: boolean;
}
const TabPanel = (props: TabPanelProps) => {
  const { category, userActions, locked } = props;
  const theme = useTheme();
  const maxWidth600 = useMediaQuery('(max-width:600px)');

  if (category === undefined) {
    return <div>Category is undefined</div>;
  }

  return (
    <Box>
      {locked ? (
        <Grid container justifyContent="space-around" alignContent="space-around" height="100%">
          <LockIcon data-testid="lock-icon" fontSize="large" />
        </Grid>
      ) : (
        <Grid
          sx={{
            maxWidth: 'fit-content',
            marginRight: theme.spacing(0.25),
            marginLeft: theme.spacing(0.25),
            justifyContent: 'center',
          }}
          container
          direction="row"
          flexWrap="wrap"
          id="tab-panel"
        >
          {category.map((categoryGame) => {
            return (
              <Card
                key={categoryGame.NodeId}
                elevation={4}
                sx={{
                  minHeight: '78px',
                  padding: theme.spacing(1),
                  backgroundColor: 'secondary.contrastText',
                  overflowX: 'auto',
                  marginBottom: theme.spacing(2),
                  marginRight: maxWidth600 ? 'unset' : theme.spacing(1),
                }}
              >
                <CardContent
                  sx={{
                    padding: 'unset',
                    minWidth: '280px',
                    height: 'auto',
                    backgroundColor: 'secondary.contrastText',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '100% ',
                      height: 'fit-content',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    data-testid="odds-overview"
                  >
                    <Typography variant="body1" fontWeight={600} textAlign="center">
                      {categoryGame.Name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                      <Results
                        el={categoryGame}
                        results={categoryGame.Results}
                        name={userActions.displayLiveDetail[userActions.lastLiveDetailId].name}
                        locks={userActions.displayLiveDetail[userActions.lastLiveDetailId].locks}
                        showTitle={false}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};
export default memo(TabPanel);
