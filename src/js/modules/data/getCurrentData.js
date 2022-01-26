import { currentWeather } from '../weather/currentWeather';
// import { getValDecimal, getValInteger } from '../util/setValue';

export const getCurrentData = (apis) => {
  currentWeather(apis);
};
