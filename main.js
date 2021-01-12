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
const visibility = document.getElementById("visibility");
const target = document.getElementById("target");
const target2 = document.getElementById("target2");
const btn = document.getElementById("btn");
const clear = document.getElementById("clear");
const city1 = document.getElementById('city1');
const city2 = document.getElementById('city2');
// const select = document.querySelector('.select');
const select1 = document.getElementById('select1');
const select2 = document.getElementById('select2');
// const city = document.querySelector('.city');
const weekly = document.getElementById("weekly");

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

async function zipcodeApi(zipData) {
    // 実際にAPIをたたく処理
    // fetch という window オブジェクトがあらかじめ持っている関数を使う
    const res = await window.fetch("https://api.openweathermap.org/data/2.5/weather?zip=" + zipData + ",jp&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
    const api_ob = await res.json();
    return api_ob;
}

async function zipCall(zipData) {
    const apis = await zipcodeApi(zipData);
    getData(apis);
}

async function cityApi(cityData) {
    // 実際にAPIをたたく処理
    // fetch という window オブジェクトがあらかじめ持っている関数を使う
    const res = await window.fetch("https://api.openweathermap.org/data/2.5/weather?id=" + cityData + "&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
    const api_ob = await res.json();
    return api_ob;
}

async function weekcityApi(cityData) {
    // 実際にAPIをたたく処理
    // fetch という window オブジェクトがあらかじめ持っている関数を使う
    // const res = await window.fetch("https://api.openweathermap.org/data/2.5/weather?id=" + cityData + "&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
    const res = await window.fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityData + "&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
    const api_ob = await res.json();
    return api_ob;
}

async function cityCall(cityData) {
    const apis = await cityApi(cityData);
    getData(apis);
}

async function cityweekCall(cityData) {
    const weekapis = await weekcityApi(cityData);
    getweekData(weekapis);
}

const getweekData = (weekapis) => {
    const section = document.createElement("section");
    const icon = weekapis.list[0].weather[0].icon
    this.time = document.createElement("p");
    this.time.textContent = `${new Date(weekapis.list[0].dt * 1000).getHours()}時`;

    this.img = document.createElement("img");
    this.img.classList.add('weeklyimg');
    this.img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    this.temp = document.createElement("p");
    this.temp.textContent = `${Math.floor(weekapis.list[0].main.temp * 10) / 10}°C`;

    this.humidity = document.createElement("p");
    this.humidity.textContent = `${weekapis.list[0].main.humidity}%`;

    this.wind = document.createElement("p");
    this.wind.textContent = `${Math.floor(weekapis.list[0].wind.speed * 10) / 10}m/s`;

    section.appendChild(this.time);
    section.appendChild(this.img);
    section.appendChild(this.temp);
    section.appendChild(this.humidity);
    section.appendChild(this.wind);
    weekly.appendChild(section);
}

const getData = (apis) => {
    const weatherArry = apis.weather[0];
    const mainArry = apis.main;
    const sysArry = apis.sys;
    const sunriseTime = new Date(sysArry.sunrise * 1000);
    const sunsetTime = new Date(sysArry.sunset * 1000);
    const winds = apis.wind;
    const place = apis.name;
    const cloud = apis.clouds;
    const view = apis.visibility;

    places.textContent = `${place}`;
    img.src = "https://openweathermap.org/img/wn/" + weatherArry.icon + "@2x.png";
    weathers.textContent = `${weatherArry.description}`;
    temp.textContent = `${Math.floor(mainArry.temp * 10) / 10} °C`;
    min_temp.textContent = `最低 ${Math.floor(mainArry.temp_min * 10) / 10} °C`;
    max_temp.textContent = `最高 ${Math.floor(mainArry.temp_max * 10) / 10} °C`;
    feel_temp.textContent = `体感 ${Math.floor(mainArry.feels_like * 10) / 10} °C`;
    humidity.textContent = `湿度： ${mainArry.humidity} %`;
    pressure.textContent = `気圧： ${mainArry.pressure} hPa`;
    clouds.textContent = `雲量： ${cloud.all} %`;
    sunrise.textContent = `日の出： ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`;
    sunset.textContent = `日の入り： ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;
    speed.textContent = `風速： ${winds.speed} m/s`;
    visibility.textContent = `視程 ${view} m`;
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

select1.addEventListener('click', () => {
    if (city1.classList.contains('hidden') == true) {
        city1.classList.remove('hidden');
    } else {
        city1.classList.add('hidden');
    }
})

city1.addEventListener('change', () => {
    const num = city1.selectedIndex;
    const cityData = city1[num].value;
    cityCall(cityData);
})

select2.addEventListener('click', () => {
    if (city2.classList.contains('hidden') == true) {
        city2.classList.remove('hidden');
    } else {
        city2.classList.add('hidden');
    }
})

city2.addEventListener('change', () => {
    const num = city2.selectedIndex;
    const cityData = city2[num].value;
    cityCall(cityData);
})

btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled') == true) {
        return
    }
    const zipData = `${target.value}-${target2.value}`;
    zipCall(zipData);
})

clear.addEventListener('click', () => {
    location.reload();
})

window.addEventListener('load', () => {
    const cityData = "1850144";
    cityCall(cityData);
})
window.addEventListener('load', () => {
    const cityData = "1850144";
    cityweekCall(cityData);
})
target.focus();