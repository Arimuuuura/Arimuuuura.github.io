/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n{\n    // タブメニュー\n    const menuItems = document.querySelectorAll('.menu li a')\n    const contents = document.querySelectorAll('.content')\n    menuItems.forEach(clickedItem => {\n        clickedItem.addEventListener('click', e => {\n            e.preventDefault()\n            // a 要素は通常画面遷移するので、e.preventDefault()とすることで画面遷移しなくなる\n            menuItems.forEach(item => {\n                item.classList.remove('active')\n                // クリックされていない要素から active class を取り除く\n            })\n            clickedItem.classList.add('active')\n            // クリックしたら active 要素を付ける\n            contents.forEach(content => {\n                content.classList.remove('active')\n                // クリックされていない要素から active class を取り除く\n            })\n            document.getElementById(clickedItem.dataset.id).classList.add('active')\n        })\n    })\n\n    // async を付けることで非同期関数と呼ばれるようになる\n    // async, await で fetch を使うと Response オブジェクトが帰ってくる\n\n    // 郵便番号による現在の天気呼び出し\n    const zipcodeApi = async (zipData) => {\n        // 実際にAPIをたたく処理\n        // fetch という window オブジェクトがあらかじめ持っている関数を使う\n        const res = await window.fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipData},jp&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric`);\n        const api_ob = await res.json();\n        return api_ob;\n    }\n    const zipCall = async (zipData) => {\n        const apis = await zipcodeApi(zipData);\n        getData(apis);\n    }\n\n    // 郵便番号による週間天気の呼び出し\n    const weekzipApi = async (zipData) => {\n        const res = await window.fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipData},jp&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric`);\n        const api_ob = await res.json();\n        return api_ob;\n    }\n    const zipweekCall = async (cityData) => {\n        const weekapis = await weekzipApi(cityData);\n        getweekData(weekapis);\n    }\n\n    // 都市指定による現在の天気呼び出し\n    const cityApi = async (cityData) => {\n        const res = await window.fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityData}&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric`);\n        const api_ob = await res.json();\n        return api_ob;\n    }\n    const cityCall = async (cityData) => {\n        const apis = await cityApi(cityData);\n        getData(apis);\n    }\n\n    // 都市指定による週間天気の呼び出し\n    const weekcityApi = async (cityData) => {\n        const res = await window.fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityData}&appid=8f241f6e111e93a94a517a3c6477329e&lang=ja&units=metric`);\n        const api_ob = await res.json();\n        return api_ob;\n    }\n    const cityweekCall = async (cityData) => {\n        const weekapis = await weekcityApi(cityData);\n        getweekData(weekapis);\n    }\n\n    // 郵便番号エラーチェック\n    const error = document.getElementById('error');\n    const checkError = (apis) => {\n        const { cod } = apis;\n        if (cod == 200) {\n            error.classList.add(\"hidden\");\n        } else if (cod == 404) {\n            error.innerText = \"入力された郵便番号での検索はできません。他の番号を試してください。\"\n            error.classList.remove(\"hidden\");\n            return;\n        } else {\n            error.innerText = \"予期せぬエラーが発生しました。もう一度入力してください。\"\n            error.classList.remove(\"hidden\");\n            return;\n        }\n    }\n\n    // 指定場所の現在の天気を取得\n    const PLACES = document.getElementById(\"places\");\n    const IMG = document.getElementById(\"icon\");\n    const WEATHERS = document.getElementById(\"weathers\");\n    const TEMP = document.getElementById(\"temp\");\n    const MIN_TEMP = document.getElementById(\"min_temp\");\n    const MAX_TEMP = document.getElementById(\"max_temp\");\n    const FEEL_TEMP = document.getElementById(\"feel_temp\");\n    const HUMIDITY = document.getElementById(\"humidity\");\n    const PRESSURE = document.getElementById(\"pressure\");\n    const CLOUDS = document.getElementById(\"clouds\");\n    const SUNRISE = document.getElementById(\"sunrise\");\n    const SUNSET = document.getElementById(\"sunset\");\n    const VISIBILITY = document.getElementById(\"visibility\");\n    const WIND = document.getElementById(\"wind\");\n    const GUST = document.getElementById(\"gust\");\n\n    // 小数点第一位を取得\n    const getValDecimal = (val) => Math.floor(val * 10) / 10;\n    // 整数を取得\n    const getValInteger = (val) => Math.floor(val);\n\n    const getData = (apis) => {\n        checkError(apis);\n        const { clouds, main, name, sys, visibility, weather, wind } = apis;\n        const { all } = clouds;\n        const [{ description, icon }] = weather;\n        const { temp, temp_min, temp_max, feels_like, humidity, pressure } = main;\n        const { sunrise, sunset } = sys;\n        const { deg, gust, speed } = wind;\n        const sunriseTime = new Date(sunrise * 1000);\n        const sunsetTime = new Date(sunset * 1000);\n\n        PLACES.textContent = `${name}`;\n        IMG.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;\n        WEATHERS.textContent = `${description}`;\n        TEMP.textContent = `${getValDecimal(temp)} °C`;\n        MIN_TEMP.textContent = `最低 ${getValDecimal(temp_min)} °C`;\n        MAX_TEMP.textContent = `最高 ${getValDecimal(temp_max)} °C`;\n        FEEL_TEMP.textContent = `体感 ${getValDecimal(feels_like)} °C`;\n        HUMIDITY.textContent = `湿度 ${getValInteger(humidity)} %`;\n        PRESSURE.textContent = `気圧 ${getValInteger(pressure)} hPa`;\n        CLOUDS.textContent = `雲量 ${getValInteger(all)} %`;\n        SUNRISE.textContent = `日の出 ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`;\n        SUNSET.textContent = `日の入り ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;\n        VISIBILITY.textContent = `視程 ${visibility} m`;\n\n        const speeds = `${getValDecimal(speed)} m/s`;\n        if (deg <= 30) {\n            WIND.textContent = `北風 ${speeds}`;\n        } else if (deg <= 60) {\n            WIND.textContent = `北東風 ${speeds}`;\n        } else if (deg <= 120) {\n            WIND.textContent = `東風 ${speeds}`;\n        } else if (deg <= 150) {\n            WIND.textContent = `南東風 ${speeds}`;\n        } else if (deg <= 210) {\n            WIND.textContent = `南風 ${speeds}`;\n        } else if (deg <= 240) {\n            WIND.textContent = `西風 ${speeds}`;\n        } else if (deg <= 300) {\n            WIND.textContent = `西風 ${speeds}`;\n        } else if (deg <= 330) {\n            WIND.textContent = `西風 ${speeds}`;\n        } else if (deg <= 360) {\n            WIND.textContent = `北風 ${speeds}`;\n        }\n        gust != undefined ? ( GUST.textContent = `突風 ${getValDecimal(gust)} m/s` ) : ( GUST.textContent = \"突風情報なし\" );\n    }\n\n    // 指定場所の3時間ごと、5日分の天気を取得\n    const wrapdiv = document.createElement(\"div\");\n    const weekly = document.getElementById(\"weekly\");\n    const lists = document.getElementById(\"lists\");\n    const getweekData = (weekapis) => {\n        const { list } = weekapis;\n        list.map((val, index) => {\n            const { dt, main, pop, weather, wind } = val;\n            const { temp, humidity } = main;\n            const [{ icon }] = weather;\n            const { speed } = wind;\n            const div = document.createElement(\"div\");\n            const daylyTime = new Date(dt * 1000).getHours();\n            // 取得データのうち24時間分のみを表示\n            if (index <= 8) {\n                // 時間を表示\n                const dayTime = document.createElement(\"p\");\n                dayTime.textContent = `${new Date(dt * 1000).getHours()}時`;\n                // img を表示\n                const dayImg = document.createElement(\"img\");\n                dayImg.classList.add('weekly-img');\n                dayImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;\n                // 気温を表示\n                const dayTemp = document.createElement(\"p\");\n                dayTemp.textContent = `${getValDecimal(temp)}°C`;\n                // 湿度を表示\n                const dayHumidity = document.createElement(\"p\");\n                dayHumidity.textContent = `${humidity}%`;\n                // 風速を表示\n                const dayWind = document.createElement(\"p\");\n                dayWind.textContent = `${getValDecimal(speed)}m/s`;\n                wrapdiv.appendChild(div);\n                wrapdiv.classList.add('dayly-wrap');\n                div.classList.add('dayly-weather');\n                div.appendChild(dayTime);\n                div.appendChild(dayImg);\n                div.appendChild(dayTemp);\n                div.appendChild(dayHumidity);\n                div.appendChild(dayWind);\n                weekly.appendChild(wrapdiv);\n            }\n            // 取得データのうち時間が昼の12時のみを取得し表示\n            if (daylyTime == 12) {\n                const dateDiv = document.createElement(\"div\");\n                dateDiv.classList.add(\"row\");\n                const getDay = new Date(dt * 1000).getDay();\n                const dayOfWeek = [\"日\", \"月\", \"火\", \"水\", \"木\", \"金\", \"土\"][getDay];\n                // 曜日を表示\n                const weekDate = document.createElement(\"p\");\n                weekDate.textContent = `${dayOfWeek}曜`;\n                weekDate.classList.add(\"get-weekly\");\n                dateDiv.appendChild(weekDate);\n                // img を表示\n                const weeklyImg = document.createElement(\"img\");\n                weeklyImg.classList.add('weekly-img');\n                weeklyImg.classList.add(\"get-weekly\");\n                weeklyImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;\n                dateDiv.appendChild(weeklyImg);\n                // 降水確率を表示\n                const weeklyPop = document.createElement(\"p\");\n                weeklyPop.textContent = `${getValInteger(pop * 100)} %`;\n                weeklyPop.classList.add(\"get-weekly\");\n                dateDiv.appendChild(weeklyPop);\n                // 気温を表示\n                const weeklyTemp = document.createElement(\"p\");\n                weeklyTemp.textContent = `${getValDecimal(temp)}°C`;\n                weeklyTemp.classList.add(\"get-weekly\");\n                dateDiv.appendChild(weeklyTemp);\n                // 湿度を表示\n                const weeklyHumidity = document.createElement(\"p\");\n                weeklyHumidity.textContent = `${Math.floor(humidity)} %`;\n                weeklyHumidity.classList.add(\"get-weekly\");\n                dateDiv.appendChild(weeklyHumidity);\n                lists.appendChild(dateDiv);\n            };\n        })\n    }\n\n    // 出力値のクリア\n    const clearweekData = () => {\n        while (wrapdiv.firstChild) {\n            wrapdiv.removeChild(wrapdiv.firstChild);\n        }\n        while (lists.firstChild) {\n            lists.removeChild(lists.firstChild);\n        }\n    }\n\n    // 郵便番号の入力値の取得\n    const btn = document.getElementById(\"btn\");\n    const clear = document.getElementById(\"clear\");\n    const target = document.getElementById(\"target\");\n    const target2 = document.getElementById(\"target2\");\n    // 郵便番号入力チェック\n    const checkInput = () => {\n        // 正規表現で入力チェック。マッチしなかったら null を返す\n        if (target.value.match(/^[1-9][0-9]{2}$/) !== null) {\n            target2.focus();\n            target2.value.match(/^[0-9]{4}$/) !== null && btn.classList.remove('disabled');\n        } else {\n            btn.classList.add('disabled');\n        }\n    }\n\n    // イベント\n\n    // 郵便番号の入力中のイベント\n    target.addEventListener('keyup', checkInput);\n    target2.addEventListener('keyup', checkInput);\n    // 郵便番号の検索ボタンをクリックした時のイベント\n    btn.addEventListener('click', () => {\n        if (btn.classList.contains('disabled') == true) return;\n        const zipData = `${target.value}-${target2.value}`;\n        clearweekData();\n        zipCall(zipData);\n        zipweekCall(zipData);\n    })\n\n    // クリアボタンをクリックした時のイベント\n    clear.addEventListener('click', () => {\n        location.reload();\n    })\n\n    // 都市指定のセレクトボックスで選択都市を変更して際のイベント\n    const city = document.getElementById('city');\n    city.addEventListener('change', () => {\n        const num = city.selectedIndex;\n        const cityData = city[num].value;\n        clearweekData();\n        cityCall(cityData);\n        cityweekCall(cityData);\n    })\n\n    // ページを開いた際のイベント\n    window.addEventListener('load', () => {\n        const cityData = \"1850144\";\n        cityCall(cityData);\n        cityweekCall(cityData);\n        target.focus();\n    })\n\n    // 天気の詳細を見る時のイベント\n    const details = document.getElementById('details');\n    const weatherDetails = document.getElementById('weather-details');\n    details.addEventListener('click', () => {\n        if (weatherDetails.classList.contains('open') == false) {\n            weatherDetails.classList.add(\"open\");\n            details.textContent = \"閉じる\";\n        } else {\n            weatherDetails.classList.remove(\"open\");\n            details.textContent = \"詳しく見る\";\n        }\n    })\n}\n\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });