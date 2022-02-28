/*	Савенкова Марина, FR-92
 *	//#5
 *	Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.
 *  
 *          Заголовок первого input — «номер страницы».
 *          Заголовок второго input — «лимит».
 *          Заголовок кнопки — «запрос».
 *  
 *  При клике на кнопку происходит следующее:
 *  
 *          Если число в первом input не попадает в диапазон от 1 до 10 или не является числом 
 *            — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
 *          Если число во втором input не попадает в диапазон от 1 до 10 или не является числом 
 *            — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
 *          Если и первый, и второй input не в диапазонах или не являются числами 
 *            — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
 *          Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, 
 *          где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
 *  
 *  Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
 *  
 *  После получения данных вывести список картинок на экран.
 *  Если пользователь перезагрузил страницу, то ему должны показываться картинки 
 *  из последнего успешно выполненного запроса (использовать localStorage).
 */


const resultNode = document.querySelector('.result-container');
//отображаем последний удачно выполненный запрос
getStoragePicture(resultNode);

const btnNode = document.getElementById('myBtn');

//функция, выолняющая запрос и отображающая результат
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

//функция, отображающая результат
function displayResult(apiData) {
  let cards = '';

  //строки, которые будут сохранены в localStorage
  let strAuthors = '';
  let strPict = '';

  apiData.forEach(item => {
    //конкатенируем всех авторов и все url картинок через '|'
    strAuthors += (item.author + '|');
    strPict += (item.download_url + '|');

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
  //сохраняем нужные нам данные
  setStoragePicture(strAuthors, strPict);
}

//обработчик событий для кнопки
btnNode.addEventListener('click', function() {
  const val1 = document.getElementsByName("myInput1")[0].value;
  const val2 = document.getElementsByName("myInput2")[0].value;
  if (!checkInputVal(val1) && !checkInputVal(val2)) {
    resultNode.innerHTML = `<p class="message">Номер страницы и лимит вне диапазона от 1 до 10!</p>`;
    return;
  }

    if (!checkInputVal(val1)) {
        resultNode.innerHTML = `<p class="message">Номер страницы вне диапазона от 1 до 10!</p>`;
        return;
      }
      else if (!checkInputVal(val2)) {
        resultNode.innerHTML = `<p class="message">Лимит вне диапазона от 1 до 10!</p>`;
        return;
      }
        else {
          useRequest('https://picsum.photos/v2/list?page='+val1+'&limit='+val2, displayResult);
       }
  
})

//проверка введенного значения
function checkInputVal(value) {
  let res = parseFloat(value);
  if (!isNaN(res)) {
    if (value>10 || value<1 || Math.ceil(value)!=value) {
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



//функция для сохрания данных в localStorage
//устанавливается только одна пара ключ-значение (строка со всеми авторами и строка со всеми url)
function setStoragePicture(strAuthors, strPict) {
  localStorage.clear(); 
  localStorage.setItem("lastPictAuthors", strAuthors);
  localStorage.setItem("lastPict", strPict);
}


//функция, отображающая изображения из последнего успешного запроса
function getStoragePicture(resultNode) {
  if (localStorage.getItem('lastPictAuthors') == null) {
    return;
  }

  //так как там мы конкатенировали строки, то здесь их нужно разбить
  let authArr = localStorage.getItem("lastPictAuthors").split("|");
  let pictArr = localStorage.getItem("lastPict").split("|");

  let cards = '';

  for(let i = 0; i < authArr.length; i++) {
    if (authArr[i]!="") {
      const cardBlock = `
      <div class="card">
        <img
          src="${pictArr[i]}"
          class="card-image"
        />
        <p>${authArr[i]}</p>
      </div>
    `;
    cards = cards + cardBlock;
    }
  }
  resultNode.innerHTML = cards;
}
