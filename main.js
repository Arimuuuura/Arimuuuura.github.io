// async を付けることで非同期関数と呼ばれるようになる
// async, await で fetch を使うと Response オブジェクトが帰ってくる

const lists = document.getElementById("lists");
const img = document.getElementById("icon");
const places = document.getElementById("places");
const weathers = document.getElementById("weathers");
const temp = document.getElementById("temp");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const feel_temp = document.getElementById("feel_temp");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const clouds = document.getElementById("clouds");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const speed = document.getElementById("speed");
const deg = document.getElementById("deg");
const gust = document.getElementById("gust");
const target = document.getElementById("target");
const target2 = document.getElementById("target2");
const btn = document.getElementById("btn");
const clear = document.getElementById("clear");

function checkInput() {
    // 正規表現で入力チェック
    // 正規表現にマッチしなかったら null を返す
    if (target.value.match(/^[1-9][0-9]{2}$/) !== null) {
        target2.focus();
        if (target2.value.match(/^[0-9]{4}$/) !== null) {
            btn.classList.remove('disabled');
        }
    } else {
        btn.classList.add('disabled');
    }
}

async function callApi(placeData) {
    // 実際にAPIをたたく処理
    // fetch という window オブジェクトがあらかじめ持っている関数を使う
    const res = await window.fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + placeData + ",jp&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
    const api_ob = await res.json();
    return api_ob;
}


async function listApi(placeData) {
    const apis = await callApi(placeData);
    const weatherArry = apis.weather[0];
    const mainArry = apis.main;
    const sysArry = apis.sys;
    const winds = apis.wind;
    const place = apis.name;
    const cloud = apis.clouds;

    places.textContent = `${place}`;
    img.src = "http://openweathermap.org/img/wn/" + weatherArry.icon + "@2x.png";
    weathers.textContent = `${weatherArry.description}`;
    temp.textContent = `現在の気温： ${mainArry.temp} °C`;
    min_temp.textContent = `最低気温： ${mainArry.temp_min} °C`;
    max_temp.textContent = `最高気温： ${mainArry.temp_max} °C`;
    feel_temp.textContent = `体感温度： ${mainArry.feels_like} °C`;
    humidity.textContent = `湿度： ${mainArry.humidity} %`;
    pressure.textContent = `気圧： ${mainArry.pressure} hPa`;
    clouds.textContent = `雲量： ${cloud.all} %`;
    sunrise.textContent = `日の出： ${new Date(sysArry.sunrise * 1000).toLocaleTimeString()}`;
    sunset.textContent = `日の入り： ${new Date(sysArry.sunset * 1000).toLocaleTimeString()}`;
    speed.textContent = `風速： ${winds.speed} m/s`;
    if (winds.deg <= 30) {
        deg.textContent = "風向 ： 北風";
    } else if (winds.deg <= 60) {
        deg.textContent = "風向 ： 北東風";
    } else if (winds.deg <= 120) {
        deg.textContent = "風向 ： 東風";
    } else if (winds.deg <= 150) {
        deg.textContent = "風向 ： 南東風";
    } else if (winds.deg <= 210) {
        deg.textContent = "風向 ： 南風";
    } else if (winds.deg <= 240) {
        deg.textContent = "風向 ： 南西風";
    } else if (winds.deg <= 300) {
        deg.textContent = "風向 ： 西風";
    } else if (winds.deg <= 330) {
        deg.textContent = "風向 ： 北西風";
    } else {
        deg.textContent = "風向 ： 北風";
    }
    if (winds.gust != undefined) {
        gust.classList.remove('hidden');
        gust.textContent = `突風： ${winds.gust} m/s`;
    }
}

target.addEventListener('keyup', checkInput);
target2.addEventListener('keyup', checkInput);

btn.addEventListener('click', () => {
    const placeData = `${target.value}-${target2.value}`;
    listApi(placeData);
})

clear.addEventListener('click', () => {
    location.reload();
})

window.addEventListener('load', () => {
    const placeData = "150-0002";
    listApi(placeData);
})
target.focus();