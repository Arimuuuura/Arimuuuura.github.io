import { weeklyWeather } from '../weather/weeklyWeather';
import { every3HoursWeather } from '../weather/every3HoursWeather';

const lists = document.getElementById('lists');
const wrapdiv = document.createElement('div');

export const getWeekData = (weekapis) => {
  const { list } = weekapis;
  list.map((val, index) => {
    const { dt, main, pop, weather, wind } = val;
    const { temp, humidity } = main;
    const [{ icon }] = weather;
    const { speed } = wind;

    const daylyTime = new Date(dt * 1000).getHours();
    // 取得データのうち24時間分のみを表示
    if (index <= 8) {
      every3HoursWeather(dt, icon, temp, humidity, speed, wrapdiv);
    }
    // 取得データのうち時間が昼の12時のみを取得し表示
    if (daylyTime == 12) {
      weeklyWeather(dt, icon, pop, temp, humidity, lists);
    }
  });
};

// 出力値のクリア
export const clearWeekData = () => {
  while (wrapdiv.firstChild) {
    wrapdiv.removeChild(wrapdiv.firstChild);
  }
  while (lists.firstChild) {
    lists.removeChild(lists.firstChild);
  }
};
