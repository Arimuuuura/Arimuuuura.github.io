import { getValDecimal, getValInteger } from '../util/setValue';

export const weeklyWeather = (dt, icon, pop, temp, humidity, lists) => {
  const dateDiv = document.createElement('div');
  dateDiv.classList.add('row');
  const getDay = new Date(dt * 1000).getDay();
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][getDay];
  // 曜日を表示
  const weekDate = document.createElement('p');
  weekDate.textContent = `${dayOfWeek}曜`;
  weekDate.classList.add('get-weekly');
  dateDiv.appendChild(weekDate);
  // img を表示
  const weeklyImg = document.createElement('img');
  weeklyImg.classList.add('every3hours-img');
  weeklyImg.classList.add('get-weekly');
  weeklyImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  dateDiv.appendChild(weeklyImg);
  // 降水確率を表示
  const weeklyPop = document.createElement('p');
  weeklyPop.textContent = `${getValInteger(pop * 100)} %`;
  weeklyPop.classList.add('get-weekly');
  dateDiv.appendChild(weeklyPop);
  // 気温を表示
  const weeklyTemp = document.createElement('p');
  weeklyTemp.textContent = `${getValDecimal(temp)}°C`;
  weeklyTemp.classList.add('get-weekly');
  dateDiv.appendChild(weeklyTemp);
  // 湿度を表示
  const weeklyHumidity = document.createElement('p');
  weeklyHumidity.textContent = `${Math.floor(humidity)} %`;
  weeklyHumidity.classList.add('get-weekly');
  dateDiv.appendChild(weeklyHumidity);
  lists.appendChild(dateDiv);
};
