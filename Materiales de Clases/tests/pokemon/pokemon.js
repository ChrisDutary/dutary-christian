const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeName = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

const getPokemon = async (name) => {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  return response.json();
}

const renderPokemon = (template, pokemon) => {
  const { name, sprites, abilities } = pokemon;
  const html = `
    <div class="pokemon-card">
      <div class="pokemon-card__header">
        <h2>${name}</h2>
        <img src="${sprites.front_default}" alt="${name}" />
      </div>
      <div class="pokemon-card__body">
        <h3>Habilidades</h3>
        <ul>${abilities.map(({ability}) => `<li>${ability.name}</li>`).join('')}</ul>
      </div>
    </div>
  `;
  template.innerHTML += html;
}

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};