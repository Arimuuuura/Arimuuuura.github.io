import '../scss/style.scss';
import { tab } from './modules/tab/tab';
import { getWeekData, clearWeekData } from './modules/data/getWeekData';

import { getCurrentData } from './modules/data/getCurrentData';
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
  getCurrentData(apis);
};

// 郵便番号による週間天気の呼び出し
const weekzipApi = async (zipData) => {
  const res = await window.fetch(`${WEEKLY_WEATHER}?zip=${zipData},jp&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const api_ob = await res.json();
  return api_ob;
};
const zipweekCall = async (cityData) => {
  const weekapis = await weekzipApi(cityData);
  getWeekData(weekapis);
};

// 都市指定による現在の天気呼び出し
const cityApi = async (cityData) => {
  const res = await window.fetch(`${CURRENT_WEATHER}?id=${cityData}&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const api_ob = await res.json();
  return api_ob;
};
const cityCall = async (cityData) => {
  const apis = await cityApi(cityData);
  getCurrentData(apis);
};

// 都市指定による週間天気の呼び出し
const weekcityApi = async (cityData) => {
  const res = await window.fetch(`${WEEKLY_WEATHER}?id=${cityData}&appid=${APPID}&lang=${LANG}&units=${UNITS}`);
  const api_ob = await res.json();
  return api_ob;
};
const cityweekCall = async (cityData) => {
  const weekapis = await weekcityApi(cityData);
  getWeekData(weekapis);
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
  clearWeekData();
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
  clearWeekData();
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
