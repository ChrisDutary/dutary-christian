const PokemonSearchBox = {
    createSearchBox() {
        return `
            <div class="search-input-container">
                <input type="text" id="searchInput" placeholder="Buscar">
            </div>
            <div class="buttons-container">
                <button id="clearButton" disabled>Limpiar</button>
                <button id="searchButton">Buscar</button>
            </div>
        `;
    }, 

    createResultContainer() {
        const resultContainer = document.createElement('div');
        resultContainer.id = 'resultContainer';
        resultContainer.className = 'result-container';
        resultContainer.style.display = 'none';
        return resultContainer;
    },

    createPokemonInfo(pokemon) {
        return `
            <div class="pokemon-info">
                <h2 class="pokemon-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (${pokemon.id})</h2>
                
                <div class="info-section">
                    <h4>Sprites</h4>
                    <div class="pokemon-sprites">
                        ${pokemon.sprites.front ? `<img src="${pokemon.sprites.front}" alt="Front sprite">` : ''}
                        ${pokemon.sprites.back ? `<img src="${pokemon.sprites.back}" alt="Back sprite">` : ''}
                    </div>
                </div>
                
                <div class="info-section2">
                    <h4>Weight / Height</h4>
                    <p>${pokemon.weight} / ${pokemon.height}</p>
                </div>
            </div>
        `;
    },

    createErrorMessage(message) {
        return `
            <div class="error-message">
                <p style="color: red; text-align: center;">${message}</p>
            </div>
        `;
    }
};

class PokemonSearch {
    constructor() {
        this.searchInput = null;
        this.searchButton = null;
        this.clearButton = null;
        this.mainContainer = null;
        this.initialize();
    }

    initialize() {
        this.setupDOMElements();
        this.setupEventListeners();
    }

    setupDOMElements() {
        document.querySelector('.search-box').innerHTML = PokemonSearchBox.createSearchBox();
        
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.clearButton = document.getElementById('clearButton');
        this.mainContainer = document.querySelector('.main-container');
        
        if (!document.getElementById('resultContainer')) {
            this.mainContainer.appendChild(PokemonSearchBox.createResultContainer());
        }
    }

    setupEventListeners() {
        this.searchButton.addEventListener('click', () => this.handleSearch());
        this.clearButton.addEventListener('click', () => this.clearSearch());
        this.searchInput.addEventListener('input', () => this.handleInput());
        this.searchInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
    }

    getResultContainer() {
        let resultContainer = document.getElementById('resultContainer');
        if (!resultContainer) {
            resultContainer = PokemonSearchBox.createResultContainer();
            this.mainContainer.appendChild(resultContainer);
        }
        resultContainer.style.display = 'block';
        return resultContainer;
    }

    clearSearch() {
        this.searchInput.value = '';
        const resultContainer = document.getElementById('resultContainer');
        if (resultContainer) {
            resultContainer.style.display = 'none';
        }
        this.clearButton.disabled = true;
    }

    showError(message) {
        const resultContainer = this.getResultContainer();
        resultContainer.innerHTML = PokemonSearchBox.createErrorMessage(message);
    }

    async displayPokemonInfo(pokemon) {
        try {
            const resultContainer = this.getResultContainer();
            resultContainer.innerHTML = PokemonSearchBox.createPokemonInfo(pokemon);
        } catch (error) {
            console.error('Error displaying Pokemon info:', error);
            this.showError('Error al mostrar la información del Pokémon');
        }
    }

    async handleSearch() {
        const searchTerm = this.searchInput.value.trim();
        if (!searchTerm) {
            this.showError('Por favor ingresa el nombre de un Pokémon');
            return;
        }

        try {
            this.searchButton.disabled = true;
            this.clearButton.disabled = false;
            const pokemon = await pokeAPI.getPokemon(searchTerm);
            await this.displayPokemonInfo(pokemon);
        } catch (error) {
            this.showError('Pokémon no encontrado. Verifica el nombre e intenta de nuevo.');
        } finally {
            this.searchButton.disabled = false;
        }
    }

    handleInput() {
        this.clearButton.disabled = !this.searchInput.value.trim();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PokemonSearch();
});