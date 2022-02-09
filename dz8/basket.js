"use strict";
const data = [];
// const data = [
//   { id: "1", name: "Product 1", price: "52" },
//   { id: "1", name: "Product 1", price: "52" },
//   { id: "2", name: "Product 2", price: "53" },
//   { id: "3", name: "Product 3", price: "54" },
//   { id: "2", name: "Product 2", price: "53" },
//   { id: "1", name: "Product 1", price: "52" },
//   { id: "2", name: "Product 2", price: "53" },
//   { id: "2", name: "Product 2", price: "53" },
//   { id: "2", name: "Product 2", price: "53" },
//   { id: "2", name: "Product 2", price: "53" },
// ];

const countCart = document.querySelector(".cartIconWrap span");
const featuredItemsEl = document.querySelector(".featuredItems");
const basketRowEl = document.querySelector(".basketRow.basketRowTable");
const basketTotalValueEL = document.querySelector(".basketTotalValue");

// Клик по кнопке Добавить
featuredItemsEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("addToCart")) {
    return;
  } else {
    // добавляем данные в массив, "parentNode" не понял как сделать красиво
    data.push(e.target.parentNode.parentNode.parentNode.dataset);
    // рисуем счетчик у корзины
    if (data.length > 0) {
      countCart.classList.remove("hidden");
      countCart.innerText = data.length;
    }
    // итоговая сумма в Корзине
    let basketTotalValue = 0;
    data.forEach((el) => {
      basketTotalValue += Number(el.price);
    });
    // Рисуем
    basketTotalValueEL.innerText = basketTotalValue;

    // Логика работы корзины
    // Делал сам V1
    let renderCartHtml = "";
    // получаем уникальные ID товаров
    const dataProdID = unicProdId();
    // по iD товара, собираем данные (Имя, Цена, Кол-во, ИтоговаяЦена)
    for (let i = 0; i < dataProdID.length; i++) {
      let res = getCartData(dataProdID[i]);
      let id = res[0];
      let prodName = res[1];
      let prodCount = res[2];
      let prodPrice = res[3];
      let prodTotalPrice = res[4];

      renderCartHtml += `
                <div>${prodName}</div>
                <div>${prodCount}</div>
                <div>${prodPrice}</div>
                <div>${prodTotalPrice}</div>
            `;
    }
    // вывод в корзину
    console.log(renderCartHtml);
    basketRowEl.innerHTML = renderCartHtml;
  }
});

// Функции
function unicProdId() {
  const arr = [];
  data.forEach((el) => {
    arr.push(el.id);
  });
  return arr.filter(onlyUnique);
}
// уникальные значения для .filter
//https://overcoder.net/q/2589/%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D0%B2%D1%81%D0%B5-%D1%83%D0%BD%D0%B8%D0%BA%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B2-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B5-javascript-%D1%83%D0%B4%D0%B0%D0%BB%D0%B8%D1%82%D1%8C-%D0%B4%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B0%D1%82%D1%8B
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getCartData(prodID) {
  prodID = String(prodID);
  let name;
  let price;
  let count = 0;
  let totalPrice = 0;

  for (let i = 0; i < data.length; i++) {
    if (prodID === data[i].id) {
      name = data[i].name;
      price = data[i].price;
      ++count;
      totalPrice += Number(data[i].price);
    }
  }
  return [prodID, name, count, price, totalPrice];
}

// не смог догнать как его прикрутить, времени было мало
class Cart {
  constructor(id, name, price, count, totalPrice) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.count = count;
    this.totalPrice = totalPrice;
  }

  /**
   * @returns {string} html-разметка для товара
   */
  getCartMarkup() {
    return `
    <div>${this.name}</div>
    <div>${this.count}</div>
    <div>${this.price}</div>
    <div>${this.totalPrice}</div>
    `;
  }
}
