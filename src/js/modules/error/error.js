const errorElement = document.getElementById('error');
export const error = (apis) => {
  // 郵便番号エラーチェック
  const { cod } = apis;
  if (cod == 200) {
    errorElement.classList.add('hidden');
  } else if (cod == 404) {
    errorElement.innerText = '入力された郵便番号での検索はできません。他の番号を試してください。';
    errorElement.classList.remove('hidden');
    return;
  } else {
    errorElement.innerText = '予期せぬエラーが発生しました。もう一度入力してください。';
    errorElement.classList.remove('hidden');
    return;
  }
};
