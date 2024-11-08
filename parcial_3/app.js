document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchType = document.getElementById('searchType');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const resultContainer = document.getElementById('resultContainer');

    const clearSearch = () => {
        searchInput.value = '';
        resultContainer.innerHTML = '';
        resultContainer.classList.add('hidden');
    };

    const showError = (message) => {
        resultContainer.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
        resultContainer.classList.remove('hidden');
    };

    const BABY_POKEMON = ['pichu', 'cleffa', 'igglybuff', 'togepi', 'tyrogue', 'smoochum', 'elekid', 'magby', 'azurill', 'wynaut', 'budew', 'chingling', 'bonsly', 'mime jr.', 'happiny', 'munchlax', 'riolu', 'mantyke', 'toxel'];

    const displayPokemonInfo = async (pokemon) => {
        try {
            const evolutionChain = await pokeAPI.getEvolutionChain(pokemon.id);
            
            resultContainer.innerHTML = `
                <div class="pokemon-info">
                    <div class="info-section">
                        <h2 class="pokemon-title">${pokemon.name} (${pokemon.id})</h2>
                        
                        <h4>Sprites</h4>
                        <div class="pokemon-sprites">
                            ${pokemon.sprites.front ? `<img src="${pokemon.sprites.front}" alt="Front">` : ''}
                            ${pokemon.sprites.back ? `<img src="${pokemon.sprites.back}" alt="Back">` : ''}
                        </div>
                        
                        <h4>Evolution chain</h4>
                        <ul class="pokemon-list">
                            ${evolutionChain.map(evo => `
                                <li>
                                    ${evo}
                                    ${BABY_POKEMON.includes(evo.toLowerCase()) ? ' 🍼' : ''}
                                    ${evo === pokemon.name ? ' ⚡' : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="info-section2">
                        <h4>Weight / Height</h4>
                        <p class="weight-height">${pokemon.weight} / ${pokemon.height}</p>
                        
                        <h4>Abilities</h4>
                        <ul class="pokemon-list">
                            ${pokemon.abilities.map(ability => `
                                <li>${ability.name}${ability.isHidden ? ' 🔍' : ''}</li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } catch (error) {
            showError('Error al cargar los detalles del Pokémon');
        }
    };

    const displayAbilityInfo = async (ability) => {
        resultContainer.innerHTML = `
            <div class="pokemon-info">
                <div class="info-section">
                    <h2 class="pokemon-title">Pokémon con ${ability.name}</h2>
                    <ul class="pokemon-list">
                        ${ability.pokemon.map(p => `
                            <li>${p.name}${p.isHidden ? ' 🔍' : ''}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        resultContainer.classList.remove('hidden');
    };

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) {
            showError('Por favor ingresa un término de búsqueda');
            return;
        }

        try {
            if (searchType.value === 'pokemon') {
                const pokemon = await pokeAPI.getPokemon(searchTerm);
                displayPokemonInfo(pokemon);
            } else {
                const ability = await pokeAPI.getAbility(searchTerm);
                displayAbilityInfo(ability);
            }
            resultContainer.classList.remove('hidden');
        } catch (error) {
            showError(searchType.value === 'pokemon' ? 
                'Pokémon no encontrado. Verifica el nombre e intenta nuevamente.' : 
                'Habilidad no encontrada. Verifica el nombre e intenta nuevamente.');
        }
    });

    clearButton.addEventListener('click', clearSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
});