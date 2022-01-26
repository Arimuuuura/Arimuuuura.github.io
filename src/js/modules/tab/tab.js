export const tab = () => {
  // タブメニュー
  const menuItems = document.querySelectorAll('.menu li a');
  const contents = document.querySelectorAll('.content');
  menuItems.forEach((clickedItem) => {
    clickedItem.addEventListener('click', (e) => {
      e.preventDefault();
      // a 要素は通常画面遷移するので、e.preventDefault()とすることで画面遷移しなくなる
      menuItems.forEach((item) => {
        item.classList.remove('active');
        // クリックされていない要素から active class を取り除く
      });
      clickedItem.classList.add('active');
      // クリックしたら active 要素を付ける
      contents.forEach((content) => {
        content.classList.remove('active');
        // クリックされていない要素から active class を取り除く
      });
      document.getElementById(clickedItem.dataset.id).classList.add('active');
    });
  });
};
