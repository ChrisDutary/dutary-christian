const App = (() => {
  const htmlElements = {
    generateButton: document.querySelector('#generate'),
    sortAscendingButton: document.querySelector('#sort-asc'),
    sortDescendingButton: document.querySelector('#sort-desc'),
    responseContainer: document.querySelector('#response'),
  }

  const templates = {
    card: (number) => `
      <div class="card">
        <span class="js-random-number" data-id="${number}">${number < 10 ? '0' + number : number}</span>
      </div>
    `
  }

  const utils = {
    clearResponse() {
      htmlElements.responseContainer.innerHTML = '';
    },
    getCurrentNumbers() {
      const randomNumbersTags = document.querySelectorAll('.js-random-number');
      return Object.values(randomNumbersTags).map(e => Number(e.dataset.id));
    },
    randomNumbersBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    renderNumber(n) {
      htmlElements.responseContainer.innerHTML += templates.card(n);
    },
    randomNumberThatDoesntExist(min, max, arr) {
      let random = utils.randomNumbersBetween(min, max);
      if (arr.length >= max - min + 1) {
        return null;
      }
      while (arr.includes(random)) {
        random = utils.randomNumbersBetween(min, max);
      }
      return random;
    }
  }

  const handlers = {
    onGenerate(e) {
      e.preventDefault();
      const MIN = 1;
      const MAX = 99;
      const random = utils.randomNumberThatDoesntExist(MIN, MAX, utils.getCurrentNumbers());
      if (random === null) {
        alert('Ya no hay más números por generar');
        return;
      }
      utils.renderNumber(random);
    },
    onSort(asc=false) {
      return (e) => {
        e.preventDefault();
        const randomNumbers = utils.getCurrentNumbers();
        const factor = asc ? 1 : -1;
        const sorted = randomNumbers.sort((a, b) => a * factor  - b * factor);
        utils.clearResponse();
        sorted.forEach(element => {
          utils.renderNumber(element); 
        });
      }
    }
  }

  const bindEvents = () => {
    htmlElements.generateButton.addEventListener('click', handlers.onGenerate);
    htmlElements.sortAscendingButton.addEventListener('click', handlers.onSort(true));
    htmlElements.sortDescendingButton.addEventListener('click', handlers.onSort());
  }

  return {
    init() {
      bindEvents();
    }
  };
})();

App.init();