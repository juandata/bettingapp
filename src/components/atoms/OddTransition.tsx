import React, { useState } from 'react';
import '../molecules/oddTransition.css';
import { CSSTransition } from 'react-transition-group';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

/**
 *
 * @param odd The odd of this specific market
 * @param clicked Specifies if the button has been clicked by the user or not
 * @param nodeId The nodeId string that belongs to the specific market bet
 * @param showOdd if the odd should display
 */
const OddTransition: React.FC<{ odd: number; clicked?: boolean; nodeId?: string; showOdd: boolean }> = ({
  odd = null,
  showOdd = true,
}) => {
  const [oddState, setOddState] = useState<number | null>(null);
  const [inProp, setInProp] = React.useState(false);
  const nodeRef = React.useRef(null);
  const [dynamicClass, setDynamicClass] = React.useState('neutral');

  React.useEffect(() => {
    if (oddState !== null && odd !== null) {
      if (odd > oddState) {
        setInProp(true);
        setDynamicClass('up');
        setOddState(odd);
      }
      if (odd < oddState) {
        setInProp(true);
        setDynamicClass('down');
        setOddState(odd);
      }
      if (odd === oddState) {
        setInProp(true);
        setDynamicClass('neutral');
      }
    }
    if (oddState === null && odd !== null) {
      //first time the odd prop arrives to the component
      setOddState(odd);
    }
  }, [odd]);
  React.useEffect(() => {
    if (inProp) {
      setInProp(false);
    }
  }, [inProp]);
  return (
    <CSSTransition nodeRef={nodeRef} in={inProp} timeout={6000} classNames={dynamicClass}>
      <span ref={nodeRef}>
        {showOdd ? oddState : null}
        {dynamicClass === 'neutral' ? null : dynamicClass === 'up' ? (
          <ArrowDropUpIcon style={{ position: showOdd ? 'absolute' : 'relative', stroke: '#000000a8' }} />
        ) : (
          <ArrowDropDownIcon style={{ position: showOdd ? 'absolute' : 'relative', stroke: '#000000a8' }} />
        )}
      </span>
    </CSSTransition>
  );
};

export default OddTransition;
