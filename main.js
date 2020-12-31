// async を付けることで非同期関数と呼ばれるようになる
// async, await で fetch を使うと Response オブジェクトが帰ってくる

async function callApi() {
    // 実際にAPIをたたく処理
    // fetch という window オブジェクトがあらかじめ持っている関数を使う
    const res = await window.fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    console.log(users);
}

callApi();

