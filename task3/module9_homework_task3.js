/*	Савенкова Марина, FR-92
 *	//#3
 *	Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
 *	 	При клике на кнопку происходит следующее:
 *	       Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
 *	       Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, 
 *	       где get-параметр limit — это введённое число.
 *	После получения данных вывести ниже картинки на экран.
 */


//функция, которая делает XHR-запрос
//и выводит на экран результат
function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } 
    else {
      const result = JSON.parse(xhr.response);
     
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};


const resultNode = document.querySelector('.result-container');
const btnNode = document.getElementById('myBtn');

//функция для отображения результата
//на вход приходит результат запроса, который разбирается по частям
//и выводит изображения с подписью автора
function displayResult(apiData) {
  let cards = '';
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  resultNode.innerHTML = cards;
}

//обработчик событий для кнопки
//если значение в input удовлетворяет условиям задачи, вызывается функция useRequest
btnNode.addEventListener('click', function() {
  const value = document.querySelector('input').value;
  if (!isNaN(parseFloat(value))) {
    if (value>10 || value<1) {
        resultNode.innerHTML = `<p class="message">Число ${value} вне диапазона от 1 до 10!</p>`;
      }
      else if (Math.ceil(value)!=value) {
        resultNode.innerHTML = `<p class="message">Число ${value} дробное!</p>`;
      }
      else {
        useRequest('https://picsum.photos/v2/list/?limit='+value, displayResult);
      }
  }

  else {
    resultNode.innerHTML = `<p class="message">Это не число! >:(</p>`;
  }
  
})
