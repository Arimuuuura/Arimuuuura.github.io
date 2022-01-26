import { error } from '../error/error';
import { getValDecimal, getValInteger } from '../util/setValue';

// 指定場所の現在の天気を取得
const PLACES = document.getElementById('places');
const IMG = document.getElementById('icon');
const WEATHERS = document.getElementById('weathers');
const TEMP = document.getElementById('temp');
const MIN_TEMP = document.getElementById('min_temp');
const MAX_TEMP = document.getElementById('max_temp');
const FEEL_TEMP = document.getElementById('feel_temp');
const HUMIDITY = document.getElementById('humidity');
const PRESSURE = document.getElementById('pressure');
const CLOUDS = document.getElementById('clouds');
const SUNRISE = document.getElementById('sunrise');
const SUNSET = document.getElementById('sunset');
const VISIBILITY = document.getElementById('visibility');
const WIND = document.getElementById('wind');
const GUST = document.getElementById('gust');

export const currentWeather = (apis) => {
  const { clouds, main, name, sys, visibility, weather, wind } = apis;
  const { all } = clouds;
  const [{ description, icon }] = weather;
  const { temp, temp_min, temp_max, feels_like, humidity, pressure } = main;
  const { sunrise, sunset } = sys;
  const { deg, gust, speed } = wind;
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

  error(apis);

  PLACES.textContent = `${name}`;
  const image = document.createElement('img');
  image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  while (IMG.firstChild) {
    IMG.removeChild(IMG.firstChild);
  }
  IMG.appendChild(image);
  WEATHERS.textContent = `${description}`;
  TEMP.textContent = `${getValDecimal(temp)} °C`;
  MIN_TEMP.textContent = `最低 ${getValDecimal(temp_min)} °C`;
  MAX_TEMP.textContent = `最高 ${getValDecimal(temp_max)} °C`;
  FEEL_TEMP.textContent = `体感 ${getValDecimal(feels_like)} °C`;
  HUMIDITY.textContent = `湿度 ${getValInteger(humidity)} %`;
  PRESSURE.textContent = `気圧 ${getValInteger(pressure)} hPa`;
  CLOUDS.textContent = `雲量 ${getValInteger(all)} %`;
  SUNRISE.textContent = `日の出 ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`;
  SUNSET.textContent = `日の入り ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;
  VISIBILITY.textContent = `視程 ${visibility} m`;

  const speeds = `${getValDecimal(speed)} m/s`;

  switch (true) {
    case deg <= 30:
      WIND.textContent = `北風 ${speeds}`;
      break;
    case deg <= 60:
      WIND.textContent = `北東風 ${speeds}`;
      break;
    case deg <= 120:
      WIND.textContent = `東風 ${speeds}`;
      break;
    case deg <= 150:
      WIND.textContent = `南東風 ${speeds}`;
      break;
    case deg <= 210:
      WIND.textContent = `南風 ${speeds}`;
      break;
    case deg <= 240:
      WIND.textContent = `南西風 ${speeds}`;
      break;
    case deg <= 300:
      WIND.textContent = `西風 ${speeds}`;
      break;
    case deg <= 330:
      WIND.textContent = `北西風 ${speeds}`;
      break;
    case deg <= 360:
      WIND.textContent = `北風 ${speeds}`;
      break;
    default:
      WIND.textContent = `情報なし`;
  }

  gust ? (GUST.textContent = `突風 ${getValDecimal(gust)} m/s`) : (GUST.textContent = '突風情報なし');
};
