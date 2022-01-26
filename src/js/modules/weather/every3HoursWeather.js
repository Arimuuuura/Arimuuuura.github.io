import { getValDecimal } from '../util/setValue';

export const every3HoursWeather = (dt, icon, temp, humidity, speed, wrapdiv) => {
  const div = document.createElement('div');
  const every3hours = document.getElementById('every3hours');
  // 時間を表示
  const dayTime = document.createElement('p');
  dayTime.textContent = `${new Date(dt * 1000).getHours()}時`;
  // img を表示
  const dayImg = document.createElement('img');
  dayImg.classList.add('every3hours-img');
  dayImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  // 気温を表示
  const dayTemp = document.createElement('p');
  dayTemp.textContent = `${getValDecimal(temp)}°C`;
  // 湿度を表示
  const dayHumidity = document.createElement('p');
  dayHumidity.textContent = `${humidity}%`;
  // 風速を表示
  const dayWind = document.createElement('p');
  dayWind.textContent = `${getValDecimal(speed)}m/s`;
  wrapdiv.appendChild(div);
  wrapdiv.classList.add('dayly-wrap');
  div.classList.add('dayly-weather');
  div.appendChild(dayTime);
  div.appendChild(dayImg);
  div.appendChild(dayTemp);
  div.appendChild(dayHumidity);
  div.appendChild(dayWind);
  every3hours.appendChild(wrapdiv);
};
