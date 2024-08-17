"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Global Variable Declaration
const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInputEl = document.getElementById("search-input");
const searchButtonEl = document.getElementById("search-button");
const pokemonNameEl = document.getElementById("pokemon-name");
const pokemonIdEl = document.getElementById("pokemon-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");
const imgContainerEl = document.getElementById("img-container");
const imgEl = document.createElement('img');
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const specialAttackEl = document.getElementById("special-attack");
const specialDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");
// Function to fetch Pokémon API data
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(pokemonAPI);
        const data = yield res.json();
        showPokemon(data);
    }
    catch (err) {
        console.error(err);
    }
});
// Function to show Pokémon stats
const showPokemonStats = (data) => {
    const { height, id, name, sprites, stats, types, weight } = data;
    typesEl.innerHTML = "";
    pokemonNameEl.innerHTML = name.toUpperCase();
    pokemonIdEl.innerHTML = `#${id}`;
    weightEl.innerHTML = `Weight: ${weight}`;
    heightEl.innerHTML = `Height: ${height}`;
    hpEl.innerHTML = stats[0].base_stat.toString();
    attackEl.innerHTML = stats[1].base_stat.toString();
    defenseEl.innerHTML = stats[2].base_stat.toString();
    specialAttackEl.innerHTML = stats[3].base_stat.toString();
    specialDefenseEl.innerHTML = stats[4].base_stat.toString();
    speedEl.innerHTML = stats[5].base_stat.toString();
    imgEl.id = "sprite";
    imgEl.src = sprites.front_default;
    imgContainerEl.innerHTML = ''; // Clear previous image
    imgContainerEl.appendChild(imgEl);
    types.forEach(type => {
        const span = document.createElement('span');
        span.innerHTML = `${type.type.name.toUpperCase()}   `;
        typesEl.appendChild(span);
    });
};
// Function to clear input value
const clearInputValue = () => {
    searchInputEl.value = "";
};
// Function to show Pokémon details
const showPokemon = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const inputValue = searchInputEl.value.toLowerCase().trim();
    const { results } = data;
    const pokemonNames = results.map(({ name }) => name.toLowerCase());
    const pokemonIds = results.map(({ id }) => id);
    const numericInputValue = parseInt(inputValue, 10);
    if (inputValue === "") {
        clearInputValue();
        alert("Input is required!");
        return;
    }
    if (pokemonNames.includes(inputValue) || pokemonIds.includes(numericInputValue)) {
        const pokemonURL = `${pokemonAPI}/${inputValue}`;
        clearInputValue();
        try {
            const res = yield fetch(pokemonURL);
            const pokemonData = yield res.json();
            showPokemonStats(pokemonData);
        }
        catch (err) {
            console.error(err);
        }
    }
    else {
        clearInputValue();
        alert("Pokemon not found!");
    }
});
// Event listener for search button
searchButtonEl.addEventListener("click", fetchData);
// Event listener for Enter key press
searchInputEl.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        fetchData();
    }
});
