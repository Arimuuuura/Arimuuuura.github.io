'use strict'
{
    // タブメニュー
    const menuItems = document.querySelectorAll('.menu li a')
    const contents = document.querySelectorAll('.content')
    menuItems.forEach(clickedItem => {
        clickedItem.addEventListener('click', e => {
            e.preventDefault()
            // a 要素は通常画面遷移するので、e.preventDefault()とすることで画面遷移しなくなる
            menuItems.forEach(item => {
                item.classList.remove('active')
                // クリックされていない要素から active class を取り除く
            })
            clickedItem.classList.add('active')
            // クリックしたら active 要素を付ける
            contents.forEach(content => {
                content.classList.remove('active')
                // クリックされていない要素から active class を取り除く
            })
            document.getElementById(clickedItem.dataset.id).classList.add('active')
        })
    })


    // async を付けることで非同期関数と呼ばれるようになる
    // async, await で fetch を使うと Response オブジェクトが帰ってくる

    // 郵便番号による現在の天気呼び出し
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


    // 郵便番号による週間天気の呼び出し
    async function weekzipApi(zipData) {
        const res = await window.fetch("https://api.openweathermap.org/data/2.5/forecast?zip=" + zipData + ",jp&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
        const api_ob = await res.json();
        return api_ob;
    }
    async function zipweekCall(cityData) {
        const weekapis = await weekzipApi(cityData);
        getweekData(weekapis);
    }


    // 都市指定による現在の天気呼び出し
    async function cityApi(cityData) {
        const res = await window.fetch("https://api.openweathermap.org/data/2.5/weather?id=" + cityData + "&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
        const api_ob = await res.json();
        return api_ob;
    }
    async function cityCall(cityData) {
        const apis = await cityApi(cityData);
        console.log(apis);
        getData(apis);
    }


    // 都市指定による週間天気の呼び出し
    async function weekcityApi(cityData) {
        const res = await window.fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityData + "&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric");
        const api_ob = await res.json();
        return api_ob;
    }
    async function cityweekCall(cityData) {
        const weekapis = await weekcityApi(cityData);
        getweekData(weekapis);
    }


    // 郵便番号エラーチェック
    const error = document.getElementById('error');
    const checkError = (apis) => {
        const { cod } = apis;
        if (cod == 200) {
            error.classList.add("hidden");
        } else if (cod == 404) {
            error.innerText = "入力された郵便番号での検索はできません。他の番号を試してください。"
            error.classList.remove("hidden");
            return;
        } else {
            error.innerText = "予期せぬエラーが発生しました。もう一度入力してください。"
            error.classList.remove("hidden");
            return;
        }
    }


    // 指定場所の現在の天気を取得
    const PLACES = document.getElementById("places");
    const IMG = document.getElementById("icon");
    const WEATHERS = document.getElementById("weathers");
    const TEMP = document.getElementById("temp");
    const MIN_TEMP = document.getElementById("min_temp");
    const MAX_TEMP = document.getElementById("max_temp");
    const FEEL_TEMP = document.getElementById("feel_temp");
    const HUMIDITY = document.getElementById("humidity");
    const PRESSURE = document.getElementById("pressure");
    const CLOUDS = document.getElementById("clouds");
    const SUNRISE = document.getElementById("sunrise");
    const SUNSET = document.getElementById("sunset");
    const VISIBILITY = document.getElementById("visibility");
    const WIND = document.getElementById("wind");
    const GUST = document.getElementById("gust");
    const getData = (apis) => {
        checkError(apis);
        const { clouds, main, name, sys, visibility, weather, wind } = apis;
        const { all } = clouds;
        const [{ description, icon }] = weather;
        const { temp, temp_min, temp_max, feels_like, humidity, pressure } = main;
        const { sunrise, sunset } = sys;
        const { deg, gust, speed } = wind;
        const sunriseTime = new Date(sunrise * 1000);
        const sunsetTime = new Date(sunset * 1000);
        const speeds = `${Math.floor(speed * 10) / 10} m/s`;

        PLACES.textContent = `${name}`;
        IMG.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        WEATHERS.textContent = `${description}`;
        TEMP.textContent = `${Math.floor(temp * 10) / 10} °C`;
        MIN_TEMP.textContent = `最低 ${Math.floor(temp_min * 10) / 10} °C`;
        MAX_TEMP.textContent = `最高 ${Math.floor(temp_max * 10) / 10} °C`;
        FEEL_TEMP.textContent = `体感 ${Math.floor(feels_like * 10) / 10} °C`;
        HUMIDITY.textContent = `湿度 ${Math.floor(humidity)} %`;
        PRESSURE.textContent = `気圧 ${Math.floor(pressure)} hPa`;
        CLOUDS.textContent = `雲量 ${Math.floor(all)} %`;
        SUNRISE.textContent = `日の出 ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`;
        SUNSET.textContent = `日の入り ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;
        VISIBILITY.textContent = `視程 ${visibility} m`;
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
        } else {
            WIND.textContent = `北風 ${speeds}`;
        }
        gust != undefined ? (
            GUST.textContent = `突風 ${gust} m/s`
        ) : (
            GUST.textContent = "突風情報なし"
        )
    }


    // 指定場所の3時間ごと、5日分の天気を取得
    const wrapdiv = document.createElement("div");
    const weekly = document.getElementById("weekly");
    const lists = document.getElementById("lists");
    const getweekData = (weekapis) => {
        for (let i=0; i<40; i++) {
            const div = document.createElement("div");
            const icon = weekapis.list[i].weather[0].icon;
            const daylyTime = new Date(weekapis.list[i].dt * 1000).getHours();
            // 取得データのうち24時間分のみを表示
            if (i<=8) {
                this.weekTime = document.createElement("p");
                this.weekTime.textContent = `${new Date(weekapis.list[i].dt * 1000).getHours()}時`;

                this.img = document.createElement("img");
                this.img.classList.add('weeklyimg');
                this.img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                this.weekTemp = document.createElement("p");
                this.weekTemp.textContent = `${Math.floor(weekapis.list[i].main.temp * 10) / 10}°C`;

                this.weekHumidity = document.createElement("p");
                this.weekHumidity.textContent = `${weekapis.list[i].main.humidity}%`;

                this.weekWind = document.createElement("p");
                this.weekWind.textContent = `${Math.floor(weekapis.list[i].wind.speed * 10) / 10}m/s`;
                wrapdiv.appendChild(div);
                wrapdiv.classList.add('dayly-wrap');
                div.classList.add('dayly-weather');
                div.appendChild(this.weekTime);
                div.appendChild(this.img);
                div.appendChild(this.weekTemp);
                div.appendChild(this.weekHumidity);
                div.appendChild(this.weekWind);
                weekly.appendChild(wrapdiv);
            }
            // 取得データのうち時間が昼の12時のみを取得し表示
            if (daylyTime == 12) {
                const dateDiv = document.createElement("div");
                dateDiv.classList.add("row");
                const getDay = new Date(weekapis.list[i].dt * 1000).getDay();
                const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][getDay];
                this.weekDate = document.createElement("p");
                this.weekDate.textContent = `${dayOfWeek}曜`;
                this.weekDate.classList.add("getweekly");
                dateDiv.appendChild(this.weekDate);

                this.tomorrow = document.createElement("img");
                this.tomorrow.classList.add('weeklyimg');
                this.tomorrow.classList.add("getweekly");
                this.tomorrow.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                dateDiv.appendChild(this.tomorrow);

                this.pop = document.createElement("p");
                this.pop.textContent = `${Math.floor(weekapis.list[i].pop * 100)} %`;
                this.pop.classList.add("getweekly");
                dateDiv.appendChild(this.pop);

                this.temp = document.createElement("p");
                this.temp.textContent = `${Math.floor(weekapis.list[i].main.temp * 10) / 10}°C`;
                this.temp.classList.add("getweekly");
                dateDiv.appendChild(this.temp);

                this.humidity = document.createElement("p");
                this.humidity.textContent = `${Math.floor(weekapis.list[i].main.humidity)} %`;
                this.humidity.classList.add("getweekly");
                dateDiv.appendChild(this.humidity);
                lists.appendChild(dateDiv);
            }
        }
    }


    // 出力値のクリア
    const clearweekData = () => {
        while (wrapdiv.firstChild) {
            wrapdiv.removeChild(wrapdiv.firstChild);
        }
        while (lists.firstChild) {
            lists.removeChild(lists.firstChild);
        }
    }


    // 郵便番号の入力値の取得
    const btn = document.getElementById("btn");
    const clear = document.getElementById("clear");
    const target = document.getElementById("target");
    const target2 = document.getElementById("target2");
    // 郵便番号入力チェック
    const checkInput = () => {
        // 正規表現で入力チェック。マッチしなかったら null を返す
        if (target.value.match(/^[1-9][0-9]{2}$/) !== null) {
            target2.focus();
            if (target2.value.match(/^[0-9]{4}$/) !== null) {
                btn.classList.remove('disabled');
            }
        } else {
            btn.classList.add('disabled');
        }
    }

    // イベント

    // 郵便番号の入力中のイベント
    target.addEventListener('keyup', checkInput);
    target2.addEventListener('keyup', checkInput);
    // 郵便番号の検索ボタンをクリックした時のイベント
    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled') == true) {
            return
        }
        const zipData = `${target.value}-${target2.value}`;
        clearweekData();
        zipCall(zipData);
        zipweekCall(zipData);
    })


    // クリアボタンをクリックした時のイベント
    clear.addEventListener('click', () => {
        location.reload();
    })


    // 都市指定のセレクトボックスで選択都市を変更して際のイベント
    const city = document.getElementById('city');
    city.addEventListener('change', () => {
        const num = city.selectedIndex;
        const cityData = city[num].value;
        clearweekData();
        cityCall(cityData);
        cityweekCall(cityData);
    })


    // ページを開いた際のイベント
    window.addEventListener('load', () => {
        const cityData = "1850144";
        cityCall(cityData);
        cityweekCall(cityData);
        target.focus();
    })


    // 天気の詳細を見る時のイベント
    const details = document.getElementById('details');
    const weatherDetails = document.getElementById('weather-details');
    details.addEventListener('click', () => {
        if (weatherDetails.classList.contains('test') == false) {
            weatherDetails.classList.add("test");
            details.textContent = "閉じる";
        } else {
            weatherDetails.classList.remove("test");
            details.textContent = "詳しく見る";
        }
    })
}