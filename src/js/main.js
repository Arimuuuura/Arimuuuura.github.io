import '../scss/style.scss';
import { tab } from './modules/tab/tab';
import { clearWeekData } from './modules/data/getWeekData';
import { getWeatherData } from './modules/api/fetchWeatherData';

tab();

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
  getWeatherData(zipData, '');
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
  getWeatherData('', cityData);
});

// ページを開いた際のイベント
window.addEventListener('load', () => {
  const cityData = '1850144';
  getWeatherData('', cityData);
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
