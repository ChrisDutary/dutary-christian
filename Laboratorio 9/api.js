class PokeAPI {
    constructor() {
        this.baseURL = 'https://pokeapi.co/api/v2';
    }

    async getPokemon(name) {
        try {
            const response = await fetch(`${this.baseURL}/pokemon/${name.toLowerCase()}`);
            if (!response.ok) {
                throw new Error('Pokemon no encontrado');
            }
            const data = await response.json();
            
            return {
                name: data.name,
                id: data.id,
                sprites: {
                    front: data.sprites.front_default,
                    back: data.sprites.back_default
                },
                weight: data.weight / 10,
                height: data.height / 10,
                abilities: data.abilities.map(ability => ({
                    name: ability.ability.name,
                    isHidden: ability.is_hidden
                }))
            };
        } catch (error) {
            throw error;
        }
    }

    async getEvolutionChain(pokemonId) {
        try {
            const speciesResponse = await fetch(`${this.baseURL}/pokemon-species/${pokemonId}`);
            const speciesData = await speciesResponse.json();

            const evolutionResponse = await fetch(speciesData.evolution_chain.url);
            const evolutionData = await evolutionResponse.json();

            // Array para almacenar todas las evoluciones
            const evolutions = [];
            
            // Añadir el Pokémon base
            evolutions.push(evolutionData.chain.species.name);
            
            // Función recursiva para procesar todas las evoluciones
            const processEvolutionsTo = (evolvesTo) => {
                for (const evolution of evolvesTo) {
                    evolutions.push(evolution.species.name);
                    if (evolution.evolves_to.length > 0) {
                        processEvolutionsTo(evolution.evolves_to);
                    }
                }
            };

            // Procesar todas las evoluciones posibles
            if (evolutionData.chain.evolves_to.length > 0) {
                processEvolutionsTo(evolutionData.chain.evolves_to);
            }

            return evolutions;
        } catch (error) {
            console.error('Error al obtener la cadena de evolución:', error);
            return [];
        }
    }
}

// Exportamos una instancia de la clase
const pokeAPI = new PokeAPI();