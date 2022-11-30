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
    loadDetails(fruit);
    console.log(fruit);
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
    let url = item.nutritionsUrl;
    item.sugar = url.sugar;
    item.calories = url.calories;
  }

  function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });

  var dialogPromiseReject;

  function hideModal() {
    var modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) {
    showModal(title, text);
    let modal = modalContainer.querySelector('.modal');
    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';

    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);

    confirmButton.focus();

    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', () => {
        hideModal();
        reject();
      });
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      })
    });
    dialogPromiseReject = reject;
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }

    document.querySelector('#show-dialog').addEventListener('click', () => {
      showDialog('Confirm action', 'Are you sure you want to do this?').then(() => {
        alert('confirmed!');
      }, () => {
        alert('not confirmed');
      })
    });
  });

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