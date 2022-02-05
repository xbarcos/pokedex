const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${ id }`

    const pokemonPromises = []

    for (let i = 1; i <= 807; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
            
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {        
        const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator += `
                <li class="card ${ types[0] }">
                <img class="card-image" alt="${ pokemon.name }" src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${ pokemon.id }.svg"/>
                    <h2 class="card-title">${ pokemon.id }. ${ pokemon.name } </h2>
                    <p class="card-subtitle">${ types.join(' / ') }</p                
                </li>
            `
            return accumulator
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]')
        console.log(pokemons)

        ul.innerHTML = lisPokemons
    })
}
fetchPokemon()