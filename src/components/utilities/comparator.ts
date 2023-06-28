import { AccordeonDataConverterProps, EventOverviewProps, OddsOverviewProps, ResultProps } from '../../types/type';
import { isEqual } from 'lodash';

/**
 * a function that returns the difference between two objects
 * @param obj1 first object to compare
 * @param obj2  second objecct to compare
 * @param compareRef
 * @returns the difference between two objects
 */
export const getObjectDiff = (
  obj1: { [x: string]: any },
  obj2: { [x: string]: any; hasOwnProperty?: any },
  compareRef = false
) => {
  return Object.keys(obj1).reduce((result, key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.push(key);
    } else if (isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key);

      if (compareRef && obj1[key] !== obj2[key]) {
        result[resultKeyIndex] = `${key} (ref)`;
      } else {
        result.splice(resultKeyIndex, 1);
      }
    }
    return result;
  }, Object.keys(obj2));
};
type ComparatorProps = {
  data: AccordeonDataConverterProps | EventOverviewProps | OddsOverviewProps | ResultProps;
};
/**
 * A comparator function used by memo react method. The logic of the comparator depends on the react component that uses it.
 * @param prevProps the previous props used by memo function
 * @param nextProps  the next props used by memo function
 * @returns a boolean indicating whether the prevProps and nextProps are equal, if equal the component should not be updated
 */
const comparator = (prevProps: ComparatorProps, nextProps: ComparatorProps) => {
  if (prevProps.data === undefined || nextProps.data === undefined) {
    return false;
  }
  //TODO: Check why the Locked property change is not showing the Lock icon correctly in Altona Magic vs Hume City event
  const diff = getObjectDiff(nextProps.data, prevProps.data);
  //AccordeonDataConverter component comparation logic
  if (diff.length >= 1 && nextProps.data.Events) {
    const dif1 = getObjectDiff(nextProps.data, prevProps.data);
    const dif2 = getObjectDiff(nextProps.data.Events, prevProps.data.Events);
    //check if the sport event locked prop has changed
    if (dif1[0] === 'Locked' || dif2.length >= 1) {
      return false;
    } else {
      return true;
    }
  }
  if (
    diff.length >= 1 &&
    nextProps.data.Events === undefined &&
    nextProps.data.Results === undefined &&
    nextProps.data.Games !== undefined
  ) {
    //EventOverview comparator
    const dif1 = getObjectDiff(nextProps.data, prevProps.data); //to check whether the data changes in the Locked element
    const dif2 = getObjectDiff(nextProps.data.Games, prevProps.data.Games);
    if (dif1[0] === 'Locked' || dif2.length >= 1) {
      return false;
    } else {
      return true;
    }
  }
  if (diff.length >= 1 && nextProps.data.Results !== undefined) {
    const diff = getObjectDiff(nextProps.data.Results, prevProps.data.Results);
    if (diff.length >= 1) {
      return false;
    } else {
      return true;
    }
  }
  if (diff.length <= 1) {
    return true;
  }
  return false;
};

export default comparator;
