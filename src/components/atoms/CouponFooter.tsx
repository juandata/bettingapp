import * as React from 'react';
import { IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ButtonWithLoader from './ButtonWithLoader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { CouponDataType, CouponFooterTypes, KeyStringType } from '../../store/stateTypes';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { clearCouponData } from '../../store/couponDataSlice';
import { reduceCouponFooter } from '../../store/couponFooterSlice';
import { couponFooterState } from '../../store/initialState';
const USDollar = new Intl.NumberFormat('en-US', {
  currency: 'USD',
});

/**
 *
 * CouponFooter
 * Displays the couponFooter buttons
 */
const CouponFooter = () => {
  const maxWidth320 = useMediaQuery('(max-width:320px)');
  const maxWidth600 = useMediaQuery('(max-width:600px)');
  const couponFooter = useSelector((state: { couponFooter: CouponFooterTypes }) => state.couponFooter);
  const couponData = useSelector((state: { couponData: CouponDataType }) => state.couponData);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const [betEarnings, setBetEarnings] = React.useState(0);
  const [betOddWithMultipleBets, setBetOddWithMultipleBets] = React.useState('');
  const [checked, setChecked] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  const valueReplaced = value.toString().replace(/\D/g, '');

  const theme = useTheme();
  //Only include the couponDataKeys of the bets that are not locked
  const couponDataKeys: Array<string> = [];
  Object.keys(couponData).forEach((key) => {
    if (
      !couponData[key].locks?.eventOverview &&
      !couponData[key].locks?.oddsOverview &&
      !couponData[key].result.Locked &&
      !couponData[key].game.Locked
    ) {
      couponDataKeys.push(key);
    }
  });
  const maximunBet = 50000;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const calculateCombined = () => {
    let oddResultWithMultipleBets = 1;
    couponDataKeys.forEach((key) => {
      oddResultWithMultipleBets = oddResultWithMultipleBets * +couponData[key].result.Odd;
    });
    setBetOddWithMultipleBets(oddResultWithMultipleBets.toFixed(2));
    const valueReplaced = +value.toString().replace(/\D/g, '');
    const betEarningsResult = (+valueReplaced * oddResultWithMultipleBets).toFixed(2);
    setBetEarnings(+betEarningsResult);
  };
  const calculateNotCombined = () => {
    let betEarningsNotCombined = 0;
    Object.keys(couponFooter.betsDivided).forEach((key) => {
      if (couponFooter.betsDivided[key] !== '' || couponFooter.betsDivided[key] !== '0') {
        betEarningsNotCombined += +couponFooter.betsDivided[key] * +couponData[key].result.Odd;
      }
    });
    setBetEarnings(betEarningsNotCombined);
    let selectedBetsTotalSum = 0;
    Object.keys(couponFooter.betsDivided).forEach((key) => {
      if (couponFooter.betsDivided[key] !== '' || couponFooter.betsDivided[key] !== '0') {
        selectedBetsTotalSum += +couponFooter.betsDivided[key];
      }
    });
    const stringFormated = USDollar.format(+selectedBetsTotalSum);
    setValue(stringFormated);
  };
  /**
   *
   * @returns boolean indicating if the ButtonWithLoader component should be disabled or not
   */
  const checkIfError = () => {
    const valueReplaced = value.toString().replace(/\D/g, '');
    if (Object.keys(couponData).length !== couponDataKeys.length) {
      //there is one or more locked properties inside a bet
      return true;
    }
    if (checked) {
      if (valueReplaced === '' || valueReplaced === '0') {
        return true;
      }
      if (valueReplaced !== '' && +valueReplaced >= 1) {
        return false;
      }
    }
    if (!checked) {
      //check if there are bets without value inside selecetedBets
      const areBetsSet = Object.keys(couponFooter.betsDivided).every((key) => {
        const couponFooterBetsDividedKeys = Object.keys(couponFooter.betsDivided);
        if (couponFooterBetsDividedKeys.length === 1 && +value >= 1) {
          //only one bet has been added so no error
          return true;
        }
        if (couponFooter.betsDivided[key] === '' || couponFooter.betsDivided[key] === '0') {
          return false;
        }
        return true;
      });
      return !areBetsSet;
    }
    alert('checkIfError is returning undefined!');
    debugger;
  };

  React.useEffect(() => {
    const couponDataKeys = Object.keys(couponData);
    if (couponDataKeys.length === 1) {
      setChecked(true);
    }
  }, [couponData]);
  React.useEffect(() => {
    if (!checked) {
      setValue('');
      setErrorMessage('');
    }

    //update betsDivided with couponData keys
    const couponDataKeys = Object.keys(couponData);
    const couponFooterBetsDividedKeys = Object.keys(couponFooter.betsDivided);
    let betsDividedCopy: KeyStringType = { ...couponFooter.betsDivided };
    if (couponDataKeys.length === 0) {
      //when the last bet is deleted is not updating the couponData dependency, so betsDivided always contains one, fix it!
      betsDividedCopy = {};
    }
    if (couponDataKeys.length >= 1) {
      couponDataKeys.forEach((key) => {
        if (!couponFooterBetsDividedKeys.includes(key)) {
          betsDividedCopy[key] = '';
        }
        couponFooterBetsDividedKeys.forEach((key) => {
          if (!couponDataKeys.includes(key)) {
            // delete it from couponFooter
            delete betsDividedCopy[key];
          }
        });
      });
    }
    const couponFooterCopy = { ...couponFooter };
    couponFooterCopy.betsDivided = betsDividedCopy;
    couponFooterCopy.combined = checked;
    const error = checkIfError();
    couponFooterCopy.error = error;
    couponFooterCopy.totalBet = valueReplaced;
    couponFooterCopy.betEarnings = betEarnings;
    couponFooterCopy.betOddWithMultipleBets = betOddWithMultipleBets;
    dispatch(reduceCouponFooter(couponFooterCopy));
  }, [checked, couponData, value, betOddWithMultipleBets, betEarnings]);
  React.useEffect(() => {
    if (errorMessage !== '') {
      const couponFooterCopy = { ...couponFooter };
      couponFooterCopy.error = true;
      dispatch(reduceCouponFooter(couponFooterCopy));
    }
  }, [errorMessage]);
  React.useEffect(() => {
    if (checked) {
      calculateCombined();
    }
    if (!checked) {
      calculateNotCombined();
    }
  }, [couponFooter.betsDivided]);

  React.useEffect(() => {
    if (couponFooter.error || errorMessage !== '') {
      return;
    }
    if (checked) {
      calculateCombined();
    }
    if (!checked) {
      calculateNotCombined();
    }
  }, [couponFooter]);
  const couponDataKeysCopy = Object.keys(couponData);
  return (
    <Box sx={{ backgroundColor: theme.palette.secondary.light }}>
      <Grid
        container
        justifyContent="space-around"
        flexDirection="row"
        flexWrap="nowrap"
        alignItems="self-end"
        sx={{ paddingTop: theme.spacing(2), marginBottom: theme.spacing(1) }}
      >
        <Grid container flexDirection="column" flexWrap="nowrap" paddingLeft={theme.spacing(1)}>
          {couponDataKeysCopy.length >= 2 ? (
            <FormGroup>
              <FormControlLabel
                label="Combinada"
                control={
                  <Switch
                    checked={checked}
                    onChange={(event) => handleChange(event)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{ marginLeft: theme.spacing(0.5) }}
                    data-testid="coupon-footer-switch"
                  />
                }
              />
            </FormGroup>
          ) : null}
          <TextField
            placeholder="Cantidad a apostar en USD"
            variant="outlined"
            value={value}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            onChange={(event) => {
              const valueWithoutSeparators = event.target.value.toString().replace(/\D/g, '');
              const stringFormated = USDollar.format(+valueWithoutSeparators);
              if (+valueWithoutSeparators > maximunBet) {
                setErrorMessage('La apuesta no debe ser mayor a 50.000 USD');
                setValue('50,000');
                return;
              } else if (+valueWithoutSeparators <= 0) {
                /**
                 * TODO: in a not combined bet when user enters more than 50000 the error stays there even after the user
                 * has clicked on switch button two times
                 */
                setErrorMessage('La apuesta debe ser mayor a 1 USD.');
                setValue(stringFormated);
                return;
              }
              setErrorMessage('');
              setValue(stringFormated);
            }}
            disabled={couponFooter.combined !== null ? !couponFooter.combined : !checked}
            helperText={errorMessage}
            error={errorMessage === '' ? false : true}
            data-testid="coupon-footer-text-input"
          />
          {couponDataKeysCopy.length >= 1 && +valueReplaced > 0 && checked && !couponFooter.error && (
            <>
              {couponDataKeysCopy.length >= 2 && (
                <Grid data-testid="combined-quote" container flexDirection="row" justifyContent="flex-start">
                  <Typography
                    textAlign="left"
                    variant={maxWidth320 ? 'body2' : 'subtitle1'}
                    marginRight={theme.spacing(1)}
                  >
                    Cuota combinada:
                  </Typography>
                  <Typography textAlign="left" variant={maxWidth320 ? 'body2' : 'subtitle1'} fontWeight={600}>
                    {betOddWithMultipleBets}
                  </Typography>
                </Grid>
              )}

              <Grid data-testid="total-earning" container flexDirection="row" justifyContent="flex-start">
                <Typography
                  textAlign="left"
                  variant={maxWidth320 ? 'body2' : 'subtitle1'}
                  marginRight={theme.spacing(1)}
                >
                  Ganancia total:
                </Typography>
                <Typography textAlign="left" variant={maxWidth320 ? 'body2' : 'subtitle1'} fontWeight={600}>
                  {USDollar.format(+betEarnings)}
                </Typography>
              </Grid>
            </>
          )}
          {couponDataKeysCopy.length >= 1 && +valueReplaced > 0 && !checked && !couponFooter.error && (
            <Grid
              data-testid="max-earning"
              container
              flexDirection={maxWidth320 ? 'column' : 'row'}
              justifyContent="flex-start"
            >
              <Typography textAlign="left" variant={maxWidth320 ? 'body2' : 'subtitle1'} marginRight={theme.spacing(1)}>
                {couponDataKeysCopy.length >= 2 ? 'Máxima ganancia:' : 'Ganancia total'}
              </Typography>
              <Typography textAlign="left" variant={maxWidth320 ? 'body2' : 'subtitle1'} fontWeight={600}>
                {USDollar.format(+betEarnings)}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid container flexDirection="column" flexWrap="nowrap" paddingLeft={theme.spacing(1)}>
          {Object.keys(couponData).length >= 2 && (
            <Grid
              component="span"
              container
              flexDirection="row"
              justifyContent="flex-end"
              flexWrap="wrap"
              alignContent="flex-end"
              alignItems="flex-end"
              width="fit-content"
              sx={{
                marginTop: theme.spacing(1),
                marginLeft: 'auto',
                color: theme.palette.secondary.main,
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.contrastText,
                  backgroundColor: 'unset',
                },
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                onClick={() => {
                  dispatch(clearCouponData({}));
                  dispatch(reduceCouponFooter(couponFooterState));
                }}
              >
                <Box sx={{ m: 1, position: 'relative', marginBottom: 'unset' }}>
                  <Button
                    color="secondary"
                    variant="outlined"
                    sx={{
                      heigth: '38px',
                      '&:hover': {
                        color: theme.palette.primary.contrastText,
                        backgroundColor: 'unset',
                      },
                      textTransform: 'none',
                      paddingRight: 'inherit',
                    }}
                  >
                    <Typography fontSize={maxWidth600 ? 'xx-small' : 'small'} variant="subtitle2">
                      Eliminar todo
                    </Typography>
                    <IconButton
                      sx={{
                        padding: 'unset',
                        '&:hover': {
                          color: theme.palette.primary.contrastText,
                          backgroundColor: 'unset',
                        },
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Button>
                </Box>
              </Box>
              <ButtonWithLoader text="Apostar" />
            </Grid>
          )}
          {Object.keys(couponData).length === 1 && <ButtonWithLoader text="Apostar" />}
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default CouponFooter;
