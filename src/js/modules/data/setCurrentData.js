import { currentWeather } from '../weather/currentWeather';

export const setCurrentData = (apis) => {
  currentWeather(apis);
};
