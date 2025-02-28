const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pweight = document.getElementById("weight");
const pheight = document.getElementById("height");
const img = document.getElementById("image"); // Fix: Use first image element
const type = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefence = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Error fetching Pokémon details:", err);
        return null;
    }
};

const display = async (name, url) => {
    pokemonName.textContent = name;

    const data = await fetchData(url);
    if (data) {
        const { id, name, height, weight, sprites:{ front_default}, types, stats } = data;
        pokemonName.textContent = name.toUpperCase();
        pokemonId.textContent = `#${id}`;
        pweight.textContent = `Weight: ${weight}`;
        pheight.textContent = `Height: ${height}`;
        img.innerHTML = `<img id="sprite" src="${front_default}" alt="Pokémon Image">`

        type.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
      .join('');

        hp.textContent = stats[0].base_stat;
        attack.textContent = stats[1].base_stat;
        defence.textContent = stats[2].base_stat;
        spAttack.textContent = stats[3].base_stat;
        spDefence.textContent = stats[4].base_stat;
        speed.textContent = stats[5].base_stat;
    }
};

const checkInput = (input) => {
    if (input.trim() === "") {
        alert("Please enter a Pokémon name or ID");
        return false;
    }
    return true;
};

const findPokemon = async (arr, input) => {
    input = input.trim().toLowerCase();
    const isNumber = !isNaN(input) && input !== "";

    const found = arr.find(pokemon => pokemon.name.toLowerCase() === input);
    
    if (found) {
        await display(found.name, found.url);
    } else if (isNumber) {
        // If input is a number, try fetching directly by ID
        await display(input, `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`);
    } else {
        alert("Pokémon not found");
    }
};

const fetchPokemonData = async (input) => {
    if (!checkInput(input)) return;

    try {
        const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
        const data = await res.json();
        const { results } = data;

        await findPokemon(results, input);
    } catch (error) {
        console.log("Error fetching Pokémon data:", error);
    }
};

// Event Listener
searchBtn.addEventListener("click", () => {
    fetchPokemonData(userInput.value);

});



userInput.addEventListener("keydown",e=>{
    if(e.key === "enter"){
        fetchPokemonData(userInput.value);
    }
})