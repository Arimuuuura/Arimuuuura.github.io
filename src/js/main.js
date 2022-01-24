import '../scss/style.scss';
import { tab } from './modules/tab';
import { error } from './modules/error';
const APPID = process.env.APPID;
const CURRENT_WEATHER = process.env.CURRENT_WEATHER;
const WEEKLY_WEATHER = process.env.WEEKLY_WEATHER;
const LANG = process.env.LANG;
const UNITS = process.env.UNITS;

tab();

// 郵便番号による現在の天気呼び出し
const zipcodeApi = async (zipData) => {
  const res = await window.fetch(`${CURRENT_WEATHER}?zip=${zipData},jp&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const api_ob = await res.json();
  return api_ob;
};
const zipCall = async (zipData) => {
  const apis = await zipcodeApi(zipData);
  getData(apis);
};

// 郵便番号による週間天気の呼び出し
const weekzipApi = async (zipData) => {
  const res = await window.fetch(`${WEEKLY_WEATHER}?zip=${zipData},jp&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const api_ob = await res.json();
  return api_ob;
};
const zipweekCall = async (cityData) => {
  const weekapis = await weekzipApi(cityData);
  getweekData(weekapis);
};

// 都市指定による現在の天気呼び出し
const cityApi = async (cityData) => {
  const res = await window.fetch(`${CURRENT_WEATHER}?id=${cityData}&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const api_ob = await res.json();
  return api_ob;
};
const cityCall = async (cityData) => {
  const apis = await cityApi(cityData);
  getData(apis);
};

// 都市指定による週間天気の呼び出し
const weekcityApi = async (cityData) => {
  const res = await window.fetch(`${WEEKLY_WEATHER}?id=${cityData}&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const api_ob = await res.json();
  return api_ob;
};
const cityweekCall = async (cityData) => {
  const weekapis = await weekcityApi(cityData);
  getweekData(weekapis);
};

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

// 小数点第一位を取得
const getValDecimal = (val) => Math.floor(val * 10) / 10;
// 整数を取得
const getValInteger = (val) => Math.floor(val);

const getData = (apis) => {
  error(apis);
  const { clouds, main, name, sys, visibility, weather, wind } = apis;
  const { all } = clouds;
  const [{ description, icon }] = weather;
  const { temp, temp_min, temp_max, feels_like, humidity, pressure } = main;
  const { sunrise, sunset } = sys;
  const { deg, gust, speed } = wind;
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);

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
  if (deg <= 30) {
    WIND.textContent = `北風 ${speeds}`;
  } else if (deg <= 60) {
    WIND.textContent = `北東風 ${speeds}`;
  } else if (deg <= 120) {
    WIND.textContent = `東風 ${speeds}`;
  } else if (deg <= 150) {
    WIND.textContent = `南東風 ${speeds}`;
  } else if (deg <= 210) {
    WIND.textContent = `南風 ${speeds}`;
  } else if (deg <= 240) {
    WIND.textContent = `西風 ${speeds}`;
  } else if (deg <= 300) {
    WIND.textContent = `西風 ${speeds}`;
  } else if (deg <= 330) {
    WIND.textContent = `西風 ${speeds}`;
  } else if (deg <= 360) {
    WIND.textContent = `北風 ${speeds}`;
  }
  gust != undefined ? (GUST.textContent = `突風 ${getValDecimal(gust)} m/s`) : (GUST.textContent = '突風情報なし');
};

// 指定場所の3時間ごと、5日分の天気を取得
const wrapdiv = document.createElement('div');
const every3hours = document.getElementById('every3hours');
const lists = document.getElementById('lists');
const getweekData = (weekapis) => {
  const { list } = weekapis;
  list.map((val, index) => {
    const { dt, main, pop, weather, wind } = val;
    const { temp, humidity } = main;
    const [{ icon }] = weather;
    const { speed } = wind;
    const div = document.createElement('div');
    const daylyTime = new Date(dt * 1000).getHours();
    // 取得データのうち24時間分のみを表示
    if (index <= 8) {
      // 時間を表示
      const dayTime = document.createElement('p');
      dayTime.textContent = `${new Date(dt * 1000).getHours()}時`;
      // img を表示
      const dayImg = document.createElement('img');
      dayImg.classList.add('every3hours-img');
      dayImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
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
    }
    // 取得データのうち時間が昼の12時のみを取得し表示
    if (daylyTime == 12) {
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
      weeklyImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
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
    }
  });
};

// 出力値のクリア
const clearweekData = () => {
  while (wrapdiv.firstChild) {
    wrapdiv.removeChild(wrapdiv.firstChild);
  }
  while (lists.firstChild) {
    lists.removeChild(lists.firstChild);
  }
};

// 郵便番号の入力値の取得
const btn = document.getElementById('btn');
const clear = document.getElementById('clear');
const target = document.getElementById('target');
const target2 = document.getElementById('target2');
// 郵便番号入力チェック
const checkInput = () => {
  // 正規表現で入力チェック。マッチしなかったら null を返す
  if (target.value.match(/^[1-9][0-9]{2}$/) !== null) {
    target2.focus();
    target2.value.match(/^[0-9]{4}$/) !== null && btn.classList.remove('disabled');
  } else {
    btn.classList.add('disabled');
  }
};

// イベント

// 郵便番号の入力中のイベント
target.addEventListener('keyup', checkInput);
target2.addEventListener('keyup', checkInput);
// 郵便番号の検索ボタンをクリックした時のイベント
btn.addEventListener('click', () => {
  if (btn.classList.contains('disabled') == true) return;
  const zipData = `${target.value}-${target2.value}`;
  clearweekData();
  zipCall(zipData);
  zipweekCall(zipData);
});

// クリアボタンをクリックした時のイベント
clear.addEventListener('click', () => {
  location.reload();
});

// 都市指定のセレクトボックスで選択都市を変更して際のイベント
const city = document.getElementById('city');
city.addEventListener('change', () => {
  const num = city.selectedIndex;
  const cityData = city[num].value;
  clearweekData();
  cityCall(cityData);
  cityweekCall(cityData);
});

// ページを開いた際のイベント
window.addEventListener('load', () => {
  const cityData = '1850144';
  cityCall(cityData);
  cityweekCall(cityData);
  target.focus();
});

// 天気の詳細を見る時のイベント
const details = document.getElementById('details');
const weatherDetails = document.getElementById('weather-details');
details.addEventListener('click', () => {
  if (weatherDetails.classList.contains('open') == false) {
    weatherDetails.classList.add('open');
    details.textContent = '閉じる';
  } else {
    weatherDetails.classList.remove('open');
    details.textContent = '詳しく見る';
  }
});
