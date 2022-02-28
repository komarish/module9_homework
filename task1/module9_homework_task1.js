/*	Савенкова Марина, FR-92
 *	//#1
 *	Вам дана заготовка и результат, который вы должны получить. 
 *	Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
 *	<list>
 *	  <student>
 *	    <name lang="en">
 *	      <first>Ivan</first>
 *	      <second>Ivanov</second>
 *	    </name>
 *	    <age>35</age>
 *	    <prof>teacher</prof>
 *	  </student>
 *	  <student>
 *	    <name lang="ru">
 *	      <first>Петр</first>
 *	      <second>Петров</second>
 *	    </name>
 *	    <age>58</age>
 *	    <prof>driver</prof>
 *	  </student>
 *	</list>
 *	
 *	
 *	{
 *	  list: [
 *	    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
 *	    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
 *	  ]
 *	}
 *
 */


 const xmlString = `<list>
					  <student>
					    <name lang="en">
					      <first>Ivan</first>
					      <second>Ivanov</second>
					    </name>
					    <age>35</age>
					    <prof>teacher</prof>
					  </student>
					  <student>
					    <name lang="ru">
					      <first>Петр</first>
					      <second>Петров</second>
					    </name>
					    <age>58</age>
					    <prof>driver</prof>
					  </student>
					</list>`;

//создаем объект класса с интерфейсом парсинга XML
const parser = new DOMParser();

//преобразуем XML в объект JavaScript в виде DOM
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

//Получение DOM-узлов student
const studentNodes = xmlDOM.querySelectorAll("student");

//заготовка под результат
const result = {list: []};

for (let node of studentNodes) {

  //Получение всех DOM-узлов
  const nameNode = node.querySelector("name");
  const nameAttr = nameNode.getAttribute("lang");
		const firstNode = node.querySelector("first");
		const secondNode = node.querySelector("second");
	const ageNode = node.querySelector("age");
	const profNode = node.querySelector("prof");

	//создание элемента списка результата
	const tmp = {
	  name: firstNode.textContent+' '+secondNode.textContent,
	  age: Number(ageNode.textContent),
	  prof: profNode.textContent,
	  lang: nameAttr
	};

	//добавляем в конец списка
	result.list.push(tmp);	
}

console.log('result', result);