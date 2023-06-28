import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import { BetInterface, CouponDataType, CouponFooterTypes, ActionTypes } from '../../store/stateTypes';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import OddTransition from './OddTransition';
import LockIcon from '@mui/icons-material/Lock';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCouponData } from '../../store/couponDataSlice';
import { reduceCouponFooter } from '../../store/couponFooterSlice';
import './selectedBet.css';
const USDollar = new Intl.NumberFormat('en-US', {
  currency: 'USD',
});
/**
 *
 * @param bet the bet interface
 */
const SelectedBet: React.FC<{
  bet: BetInterface;
}> = ({ bet }) => {
  /**
   * TODO:
   * Find out how to syncronize all the actions of the user in the couponFooter and SelectedBet without causing any errors
   */
  const [inProp, setInProp] = React.useState(false);
  const couponData = useSelector((state: { couponData: CouponDataType }) => state.couponData);
  const couponFooter = useSelector((state: { couponFooter: CouponFooterTypes }) => state.couponFooter);
  const dispatch = useDispatch();
  const theme = useTheme();
  const maxWidth600 = useMediaQuery('(max-width:600px)');
  const userActions = useSelector((state: { userActions: ActionTypes }) => state.userActions);
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const nodeRef = React.useRef(null);
  const valueReplaced = value.replace(/\D/g, '') * bet.result.Odd;
  const stringFormated = USDollar.format(+valueReplaced);
  React.useEffect(() => {
    const couponDataKeys = Object.keys(couponData);
    const couponFooterKeys = Object.keys(couponFooter.betsDivided);
    if (
      !couponFooter.combined &&
      couponFooterKeys.includes(bet.result.NodeId) &&
      couponDataKeys.length >= 1 &&
      couponFooter.totalBet !== '' &&
      couponFooter.totalBet !== null &&
      couponFooter.combined !== null &&
      userActions.approveBet === null &&
      !userActions.makeBet
    ) {
      setValue(couponFooter.betsDivided[bet.result.NodeId]);
    }

    setInProp(true);
  }, []);

  return (
    <CSSTransition in={inProp} nodeRef={nodeRef} timeout={500} classNames="selected-bet">
      <Box
        data-testid="selected-bet"
        ref={nodeRef}
        sx={{
          marginTop: theme.spacing(0.2),
          backgroundColor:
            bet.result.Locked || bet.game.Locked || bet.locks?.eventOverview || bet.locks?.oddsOverview
              ? theme.palette.action.disabled
              : theme.palette.secondary.light,
        }}
      >
        <Grid
          container
          flexDirection="column"
          alignItems="flex-start"
          sx={{
            paddingLeft: theme.spacing(1) + '!important',
          }}
        >
          <Grid container flexDirection="row" flexWrap="nowrap">
            <Grid container alignItems="center">
              <Typography
                variant="subtitle1"
                textAlign="left"
                fontSize={maxWidth600 ? 'x-small' : 'small'}
                sx={{ marginRight: theme.spacing(2) + '!important', marginTop: '-1px!important' }}
                color={theme.palette.primary.contrastText}
                fontWeight={600}
                className="font-face-SaralaBold"
              >
                {bet.result.Name}
              </Typography>

              <Typography
                variant="subtitle1"
                textAlign="left"
                fontSize={maxWidth600 ? 'x-small' : 'small'}
                sx={{ fontWeight: 600 }}
                color={theme.palette.primary.dark}
              >
                {bet.result.Odd}
              </Typography>
              <OddTransition odd={+bet.result.Odd} showOdd={false} />
            </Grid>
            <IconButton
              data-testid="selected-bet-close-icon"
              onClick={() => {
                dispatch(deleteCouponData(bet.result.NodeId));
              }}
              sx={{
                '&:hover': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: 'unset',
                },
                padding: 'unset',
                paddingRight: theme.spacing(0.5),
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid container direction="row" flexWrap="nowrap">
            <Grid container direction="column">
              <Box sx={{ marginTop: theme.spacing(0.5) }}>
                <Typography variant="body2" fontSize={maxWidth600 ? 'x-small' : 'small'} textAlign="left">
                  {bet.game.Name}
                </Typography>
              </Box>
              <Box sx={{ marginTop: theme.spacing(1) }}>
                <Typography
                  fontSize={maxWidth600 ? 'x-small' : 'small'}
                  variant="caption"
                  component="div"
                  textAlign="left"
                  color={theme.palette.secondary.main}
                >
                  {bet.name}
                </Typography>
              </Box>
            </Grid>
            {!couponFooter.combined &&
            Object.keys(couponData).length >= 2 &&
            !bet.result.Locked &&
            !bet.game.Locked &&
            !bet.locks?.eventOverview &&
            !bet.locks?.oddsOverview ? (
              <React.Fragment>
                <TextField
                  placeholder="Cantidad a apostar en USD"
                  sx={{ width: '100%', fontSize: maxWidth600 ? 'x-small' : 'small' }}
                  variant="outlined"
                  value={value}
                  onChange={(event) => {
                    let scopedError = false,
                      scopedErrorMessage = '';
                    let valueWithoutSeparators = event.target.value.replace(/\D/g, '');
                    let scopedValue = valueWithoutSeparators;
                    const stringFormated = USDollar.format(+valueWithoutSeparators);
                    const maximunBetCombined = 50001;
                    const maximunBet = 10000;
                    if (+valueWithoutSeparators <= 0) {
                      scopedError = true;
                      scopedErrorMessage = 'La apuesta mínima es de 1 USD.';
                    }

                    const couponFooterbetsDividedKeys = Object.keys(couponFooter.betsDivided);

                    if (couponFooterbetsDividedKeys.length >= 1) {
                      let couponFooterTotalBet = 0;
                      couponFooterbetsDividedKeys.forEach((key) => {
                        if (key !== bet.result.NodeId) {
                          couponFooterTotalBet += +couponFooter.betsDivided[key];
                        }
                      });
                      if (+valueWithoutSeparators + +couponFooterTotalBet > maximunBetCombined) {
                        scopedError = true;
                        scopedErrorMessage = 'El total de apuestas no combinadas no debe superar los 50.000 USD.';
                        scopedValue = '';
                        valueWithoutSeparators = '';
                      } else if (+valueWithoutSeparators > maximunBet) {
                        scopedError = true;
                        scopedErrorMessage = 'Una apuesta individual no combinada no debe ser mayor a 10.000 USD.';
                        scopedValue = '10,000';
                        valueWithoutSeparators = '10000';
                      }
                      if (+valueWithoutSeparators < maximunBet && +valueWithoutSeparators >= 1) {
                        scopedError = false;
                        scopedErrorMessage = '';
                        scopedValue = stringFormated;
                      }
                    } else {
                      scopedValue = stringFormated;
                    }

                    //update the couponFooter after every change
                    const couponFooterBetsDividedCopy = { ...couponFooter.betsDivided };
                    //couponFooterCopy.betsDivided[bet.result.NodeId] = valueWithoutSeparators;
                    couponFooterBetsDividedCopy[bet.result.NodeId] = valueWithoutSeparators;
                    const couponFooterCopy = { ...couponFooter };
                    couponFooterCopy.betsDivided = couponFooterBetsDividedCopy;
                    dispatch(reduceCouponFooter(couponFooterCopy));
                    setError(scopedError);
                    setErrorMessage(scopedErrorMessage);
                    setValue(scopedValue);
                  }}
                  helperText={errorMessage}
                  error={error}
                  data-testid="selected-bet-text-input"
                />
                <Typography
                  fontSize={maxWidth600 ? 'x-small' : 'small'}
                  variant="body2"
                  marginLeft={theme.spacing(1)}
                  marginRight={theme.spacing(1)}
                  data-testid="selected-bet-earnings"
                >
                  {stringFormated}
                </Typography>
              </React.Fragment>
            ) : null}
            {(bet.result.Locked || bet.game.Locked || bet.locks?.eventOverview || bet.locks?.oddsOverview) && (
              <LockIcon data-testid="lock-icon" fontSize="medium" sx={{ width: '100px' }} />
            )}
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: theme.spacing(1) }} />
      </Box>
    </CSSTransition>
  );
};
export default SelectedBet;
