import {Dimensions} from 'react-native';

export const calculateDimension = (
  percentage: number,
  dimension: 'width' | 'height',
): number => {
  const dimensions = Dimensions.get('window');
  return dimensions[dimension] * percentage;
};
