!function(e){var t={};function n(d){if(t[d])return t[d].exports;var o=t[d]={i:d,l:!1,exports:{}};return e[d].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,d){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:d})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var d=Object.create(null);if(n.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(d,o,function(t){return e[t]}.bind(null,o));return d},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);const d=e=>Math.floor(10*e)/10,o=e=>Math.floor(e),a=document.getElementById("lists"),s=document.createElement("div"),c=e=>{const{list:t}=e;t.map((e,t)=>{const{dt:n,main:c,pop:i,weather:l,wind:r}=e,{temp:m,humidity:u}=c,[{icon:p}]=l,{speed:g}=r,y=new Date(1e3*n).getHours();t<=8&&((e,t,n,o,a,s)=>{const c=document.createElement("div"),i=document.getElementById("every3hours"),l=document.createElement("p");l.textContent=new Date(1e3*e).getHours()+"時";const r=document.createElement("img");r.classList.add("every3hours-img"),r.src=`https://openweathermap.org/img/wn/${t}@2x.png`;const m=document.createElement("p");m.textContent=d(n)+"°C";const u=document.createElement("p");u.textContent=o+"%";const p=document.createElement("p");p.textContent=d(a)+"m/s",s.appendChild(c),s.classList.add("dayly-wrap"),c.classList.add("dayly-weather"),c.appendChild(l),c.appendChild(r),c.appendChild(m),c.appendChild(u),c.appendChild(p),i.appendChild(s)})(n,p,m,u,g,s),12==y&&((e,t,n,a,s,c)=>{const i=document.createElement("div");i.classList.add("row");const l=["日","月","火","水","木","金","土"][new Date(1e3*e).getDay()],r=document.createElement("p");r.textContent=l+"曜",r.classList.add("get-weekly"),i.appendChild(r);const m=document.createElement("img");m.classList.add("every3hours-img"),m.classList.add("get-weekly"),m.src=`https://openweathermap.org/img/wn/${t}@2x.png`,i.appendChild(m);const u=document.createElement("p");u.textContent=o(100*n)+" %",u.classList.add("get-weekly"),i.appendChild(u);const p=document.createElement("p");p.textContent=d(a)+"°C",p.classList.add("get-weekly"),i.appendChild(p);const g=document.createElement("p");g.textContent=Math.floor(s)+" %",g.classList.add("get-weekly"),i.appendChild(g),c.appendChild(i)})(n,p,i,m,u,a)})},i=()=>{for(;s.firstChild;)s.removeChild(s.firstChild);for(;a.firstChild;)a.removeChild(a.firstChild)},l=document.getElementById("error"),r=document.getElementById("places"),m=document.getElementById("icon"),u=document.getElementById("weathers"),p=document.getElementById("temp"),g=document.getElementById("min_temp"),y=document.getElementById("max_temp"),h=document.getElementById("feel_temp"),C=document.getElementById("humidity"),f=document.getElementById("pressure"),E=document.getElementById("clouds"),x=document.getElementById("sunrise"),v=document.getElementById("sunset"),w=document.getElementById("visibility"),L=document.getElementById("wind"),b=document.getElementById("gust"),I=e=>{const{clouds:t,main:n,name:a,sys:s,visibility:c,weather:i,wind:I}=e,{all:B}=t,[{description:$,icon:k}]=i,{temp:j,temp_min:_,temp_max:M,feels_like:D,humidity:O,pressure:S}=n,{sunrise:P,sunset:H}=s,{deg:T,gust:q,speed:A}=I,z=new Date(1e3*P),F=new Date(1e3*H);(e=>{const{cod:t}=e;if(200!=t)return 404==t?(l.innerText="入力された郵便番号での検索はできません。他の番号を試してください。",void l.classList.remove("hidden")):(l.innerText="予期せぬエラーが発生しました。もう一度入力してください。",void l.classList.remove("hidden"));l.classList.add("hidden")})(e),r.textContent=""+a;const G=document.createElement("img");for(G.src=`https://openweathermap.org/img/wn/${k}@2x.png`;m.firstChild;)m.removeChild(m.firstChild);m.appendChild(G),u.textContent=""+$,p.textContent=d(j)+" °C",g.textContent=`最低 ${d(_)} °C`,y.textContent=`最高 ${d(M)} °C`,h.textContent=`体感 ${d(D)} °C`,C.textContent=`湿度 ${o(O)} %`,f.textContent=`気圧 ${o(S)} hPa`,E.textContent=`雲量 ${o(B)} %`,x.textContent=`日の出 ${z.getHours()}:${z.getMinutes()}`,v.textContent=`日の入り ${F.getHours()}:${F.getMinutes()}`,w.textContent=`視程 ${c} m`;const J=d(A)+" m/s";switch(!0){case T<=30:L.textContent="北風 "+J;break;case T<=60:L.textContent="北東風 "+J;break;case T<=120:L.textContent="東風 "+J;break;case T<=150:L.textContent="南東風 "+J;break;case T<=210:L.textContent="南風 "+J;break;case T<=240:L.textContent="南西風 "+J;break;case T<=300:L.textContent="西風 "+J;break;case T<=330:L.textContent="北西風 "+J;break;case T<=360:L.textContent="北風 "+J;break;default:L.textContent="情報なし"}b.textContent=q?`突風 ${d(q)} m/s`:"突風情報なし"},B="8f241f6e111e93a94a517a3c6477329e",$=async(e,t)=>{const n=e?`?zip=${e},jp`:"?id="+t,d=await window.fetch(`https://api.openweathermap.org/data/2.5/weather${n}&appid=${B}&lang=ja&units=metric`),o=await d.json();I(o);const a=await window.fetch(`https://api.openweathermap.org/data/2.5/forecast${n}&appid=${B}&lang=ja&units=metric`),s=await a.json();c(s)};(()=>{const e=document.querySelectorAll(".menu li a"),t=document.querySelectorAll(".content");e.forEach(n=>{n.addEventListener("click",d=>{d.preventDefault(),e.forEach(e=>{e.classList.remove("active")}),n.classList.add("active"),t.forEach(e=>{e.classList.remove("active")}),document.getElementById(n.dataset.id).classList.add("active")})})})();const k=document.getElementById("btn"),j=document.getElementById("clear"),_=document.getElementById("target"),M=document.getElementById("target2"),D=()=>{null!==_.value.match(/^[1-9][0-9]{2}$/)?(M.focus(),null!==M.value.match(/^[0-9]{4}$/)&&k.classList.remove("disabled")):k.classList.add("disabled")};_.addEventListener("keyup",D),M.addEventListener("keyup",D),k.addEventListener("click",()=>{if(1==k.classList.contains("disabled"))return;const e=`${_.value}-${M.value}`;i(),$(e,"")}),j.addEventListener("click",()=>{location.reload()});const O=document.getElementById("city");O.addEventListener("change",()=>{const e=O.selectedIndex,t=O[e].value;i(),$("",t)}),window.addEventListener("load",()=>{$("","1850144"),_.focus()});const S=document.getElementById("details"),P=document.getElementById("weather-details");S.addEventListener("click",()=>{0==P.classList.contains("open")?(P.classList.add("open"),S.textContent="閉じる"):(P.classList.remove("open"),S.textContent="詳しく見る")})}]);