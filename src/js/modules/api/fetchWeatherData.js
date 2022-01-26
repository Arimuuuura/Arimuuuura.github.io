import { setCurrentData } from '../data/setCurrentData';
import { getWeekData } from '../data/getWeekData';

const APPID = process.env.APPID;
const CURRENT_WEATHER = process.env.CURRENT_WEATHER;
const WEEKLY_WEATHER = process.env.WEEKLY_WEATHER;
const LANG = process.env.LANG;
const UNITS = process.env.UNITS;

// api call
export const getWeatherData = async (zipData, cityData) => {
  const query = zipData ? `?zip=${zipData},jp` : `?id=${cityData}`;

  const current_res = await window.fetch(`${CURRENT_WEATHER}${query}&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const current_obj = await current_res.json();
  setCurrentData(current_obj);

  const weekly_res = await window.fetch(`${WEEKLY_WEATHER}${query}&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const weekly_obj = await weekly_res.json();
  getWeekData(weekly_obj);
};
