// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then((result) => {
//     return result.json()
// }).then((data) => {
//     console.log(data);
// })

// обьект с курсами валют
const rates = {};
// элементы для отображения курса валют
const elUSD = document.querySelector('[data-value="USD"]');
const elEUR = document.querySelector('[data-value="EUR"]');
const elGBP = document.querySelector('[data-value="GBP"]');

// элементы формы, ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

// используем асинхронную функцию
// функция получения курса валют и отображения их на странице

async function getCurrencies () {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;
    
    // записываем информацию по валютам в константу

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    elUSD.textContent = rates.USD.Value.toFixed(2);
    elEUR.textContent = rates.EUR.Value.toFixed(2);
    elGBP.textContent = rates.GBP.Value.toFixed(2);


    // цвет информера USD
    if (rates.USD.Value > rates.USD.Previous) {
        elUSD.classList.add('top');
    } else {
        elUSD.classList.add('bottom');
    }

      // цвет информера EUR
      if (rates.EUR.Value > rates.EUR.Previous) {
        elEUR.classList.add('top');
    } else {
        elEUR.classList.add('bottom');
    }

      // цвет информера GBP
      if (rates.GBP.Value > rates.GBP.Previous) {
        elGBP.classList.add('top');
    } else {
        elGBP.classList.add('bottom');
    }
}
getCurrencies()

// слушаем изменения в текстовом поле и в select
input.oninput = convertValue;
select.oninput = convertValue;

// функция конвертации
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}