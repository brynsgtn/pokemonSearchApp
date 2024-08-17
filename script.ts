// Global Variable Declaration
const pokemonAPI: string = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInputEl = document.getElementById("search-input") as HTMLInputElement;
const searchButtonEl = document.getElementById("search-button") as HTMLButtonElement;
const pokemonNameEl = document.getElementById("pokemon-name") as HTMLElement;
const pokemonIdEl = document.getElementById("pokemon-id") as HTMLElement;
const weightEl = document.getElementById("weight") as HTMLElement;
const heightEl = document.getElementById("height") as HTMLElement;
const typesEl = document.getElementById("types") as HTMLElement;
const imgContainerEl = document.getElementById("img-container") as HTMLElement;
const imgEl = document.createElement('img') as HTMLImageElement;
const hpEl = document.getElementById("hp") as HTMLElement;
const attackEl = document.getElementById("attack") as HTMLElement;
const defenseEl = document.getElementById("defense") as HTMLElement;
const specialAttackEl = document.getElementById("special-attack") as HTMLElement;
const specialDefenseEl = document.getElementById("special-defense") as HTMLElement;
const speedEl = document.getElementById("speed") as HTMLElement;

type FetchedData = {
  name: string;
  id: number;
  url: string;
}

type Sprites = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

type Stats = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

type Types = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

type PokemonData = {
  base_experience: number;
  height: number;
  id: number;
  name: string;
  order: number;
  sprites: Sprites;
  stats: Stats[];
  types: Types[];
  weight: number;
}

// Function to fetch Pokémon API data
const fetchData = async (): Promise<void> => {
  try {
    const res = await fetch(pokemonAPI);
    const data: { results: FetchedData[] } = await res.json();
    showPokemon(data);
  } catch (err) {
    console.error(err);
  }
}

// Function to show Pokémon stats
const showPokemonStats = (data: PokemonData): void => {
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
}

// Function to clear input value
const clearInputValue = (): void => {
  searchInputEl.value = "";
}

// Function to show Pokémon details
const showPokemon = async (data: { results: FetchedData[] }): Promise<void> => {
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
      const res = await fetch(pokemonURL);
      const pokemonData: PokemonData = await res.json();
      showPokemonStats(pokemonData);
    } catch (err) {
      console.error(err);
    }
  } else {
    clearInputValue();
    alert("Pokemon not found!");
  }
}

// Event listener for search button
searchButtonEl.addEventListener("click", fetchData);

// Event listener for Enter key press
searchInputEl.addEventListener("keypress", (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    fetchData();
  }
});
