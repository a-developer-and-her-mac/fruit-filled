// An IIFE
let fruitRepository = (function () {
  let fruitList = [];
  let apiUrl = 'https://fruityvice.com/api/fruit/all';

  //Gets all the fruits from the array
  function getAll() {
    return fruitList;
  }

  // Adds fruits to the array
  function add(fruit) {
    fruitList.push(fruit);
  }

  //Adds list items on the screen
  function addListItem(fruit) {
    let fruitRecord = document.querySelector('.fruit-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = fruit.name;
    button.classList.add('button');
    listItem.appendChild(button);
    fruitRecord.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(fruit);
    });
  }

  //Shows more details about the selected fruit
  function showDetails(fruit) {
    loadDetails(fruit).then(() => console.log(fruit));
  }

  function loadList() {
    return fetch(apiUrl).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      json.forEach((item) => {
        let fruit = {
          name: item.name,
          nutritionsUrl: item.nutritions
        };
        add(fruit);
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  function loadDetails(item) {
    let url = item.nutritions;
    return fetch(url).then((reponse) => {
      return reponse.json();
    }).then((json) => {
      item.sugar = details.sugar;
      item.calories = details.calories;
    }).catch((error) => {
      console.log(error);
    })
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }
})();
//Grabs the stuff from the fruit IIFE and runs the list item function
fruitRepository.loadList().then(() => {
  fruitRepository.getAll().forEach((fruit) => {
    fruitRepository.addListItem(fruit);
  });
});