import { getPokemon, renderPokemon, sanitizeName } from './pokemon.js';

const htmlElements = {
  form: document.querySelector('#pokemon-form'),
  details: document.querySelector('#pokemon-details'),
}

const handlers = {
  submit: async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const pokemonName = formData.get('pokemon-name');
    const sanitizedName = sanitizeName(pokemonName);
    if (!sanitizedName) {
      alert('Por favor, ingrese un nombre válido');
      return;
    };
    const pokemon = await getPokemon(sanitizedName);
    renderPokemon(htmlElements.details, pokemon);
  }
}

const bindEvents = () => {
  htmlElements.form.addEventListener('submit', handlers.submit);
}

const init = () => {
  bindEvents();
}

init();