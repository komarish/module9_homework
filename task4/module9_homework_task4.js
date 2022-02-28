/*	Савенкова Марина, FR-92
 *	//#4
 *	Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. 
 *  В input можно ввести любое число. 
 *  При клике на кнопку происходит следующее:
 *  
 *        Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
 *        Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
 *  После получения данных вывести ниже картинку на экран.
 */




const resultNode = document.querySelector('.result-container');
const btnNode = document.getElementById('myBtn');


//обработчик событий для кнопки
btnNode.addEventListener('click', () => {
  //получаем значения из input-ов
  const val1 = document.getElementsByName("myInput1")[0].value;
  const val2 = document.getElementsByName("myInput2")[0].value;

  //если значения не удовлетворяют условиям, выводим сообщение об ошибке
  if (!checkInputVal(val1) || !checkInputVal(val2)) {
      resultNode.innerHTML = `<p class="message">Одно из чисел вне диапазона от 100 до 300!</p>`;
      return;
  }

  //опции для запроса
  const options = {
  method: 'GET', // выбор метода запроса
  mode: 'cors', // режим работы запроса
  headers: { // дополнительные заголовки для запроса
    'Content-Type': 'application/json',
    'Charset':'UTF-8'
  }
};

  //Делаем запрос за данными
  fetch(`https://picsum.photos/${val1}/${val2}`, options)
    .then((response) => {
      //Объект ответа на запрос
      console.log('response', response);
      //Превращаем объект в JSON. Мы не можем его сразу прочитать,
      //надо отдать в следующий then
      const result = response.url;
      const cardBlock = `
      <div class="card">
        <img
          src="${result}"
          class="card-image"
        />
      </div>
    `;
    resultNode.innerHTML = cardBlock;
    })
   .catch((err) => { console.log('error', err) });
});


//функция для проверки введенного в input значения
function checkInputVal(value) {
  let res = parseFloat(value);
  if (!isNaN(res)) {
    if (value>300 || value<100 || Math.ceil(value)!=value) {
        return false;
      }
    else {
       return true;
    }
  }
  else {
    return false;
  }
}
