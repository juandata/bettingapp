import React from 'react';
import { Button, Typography, Grid } from '@mui/material';
import OddTransition from '../atoms/OddTransition';
import LockIcon from '@mui/icons-material/Lock';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from '@mui/material/styles';
import { LocksProps } from '../../types/type';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { CouponDataType } from '../../store/stateTypes';
import { deleteCouponData, reduceCouponData } from '../../store/couponDataSlice';

//import './oddButton.css';

/**
 * Renders the button and odds of a specific market
 * @param el the result element object
 * @param ele the item inside the ResultsArray
 * @param name the name of the market
 */
const OddButton: React.FC<{
  el: { Name: string };
  ele: { Odd: string | number; Name: string; NodeId: string; Locked: boolean };
  name: string;
  locks: LocksProps | undefined;
}> = ({ el, ele, name, locks }) => {
  //const { couponData, setCouponData } = useCouponDataHook();
  const couponData = useSelector((state: { couponData: CouponDataType }) => state.couponData);
  const couponDataKeys = Object.keys(couponData);
  const dispatch = useDispatch();

  const [clicked, setClicked] = React.useState(false);
  const theme = useTheme();
  React.useEffect(() => {
    //check if the coupon contains the NodeId of the button, if so and click is false update clicked to true
    //this happens because the component was unmounted and mounted again, but the bet is still active in the coupon
    if (couponDataKeys.includes(ele.NodeId) && !clicked) {
      setClicked(true);
    }
  }, []);
  React.useEffect(() => {
    //check if there is an active button related to a bet deleted by the user in the coupon
    if (!couponDataKeys.includes(ele.NodeId) && clicked) {
      setClicked(false);
    }
  }, [couponData]);
  return (
    <Button
      disabled={ele.Locked}
      variant="contained"
      className="odd-button"
      disableTouchRipple={true}
      sx={{
        backgroundColor: clicked ? theme.palette.primary.main + '!important' : theme.palette.secondary.light,
        transition: 'background-color',
        transitionDuration: '1s',
        '&:hover': {
          backgroundColor: isMobile ? theme.palette.secondary.light : theme.palette.primary.main,
        },
      }}
      onClick={() => {
        if (clicked) {
          dispatch(deleteCouponData(ele.NodeId));
          setClicked(!clicked);
          return;
        }
        const couponDataCopy = {};
        couponDataCopy[ele.NodeId] = {
          game: el,
          result: ele,
          name: name,
          locks: locks,
        };
        dispatch(reduceCouponData({ ...couponDataCopy }));
        setClicked(!clicked);
      }}
    >
      <Typography variant="body2" color="primary.contrastText" sx={{ fontWeight: 600 }}>
        {ele.Locked ? (
          <Grid container direction="column" alignItems="center" key={uuidv4()}>
            <Grid item>
              <Typography variant="body2">{el.Name}</Typography>
            </Grid>
            <Grid container justifyContent="space-around" alignContent="space-around" height="100%">
              <LockIcon data-testid="lock-icon" fontSize="large" />
            </Grid>
          </Grid>
        ) : (
          <OddTransition showOdd={true} odd={+ele.Odd} clicked={clicked} nodeId={ele.NodeId} />
        )}
      </Typography>
    </Button>
  );
};
export default OddButton;
