const pokemonAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
const searchInputEl = document.getElementById("search-input");
const searchButtonEl = document.getElementById("search-button");
const pokemonNameEl = document.getElementById("pokemon-name")
const pokemonIdEl = document.getElementById("pokemon-id")
const weightEl = document.getElementById("weight")
const heightEl = document.getElementById("height")
const typesEl = document.getElementById("types")

const imgContainerEl = document.getElementById("img-container")
 const imgEl = document.createElement('img');

const  hpEl = document.getElementById("hp");
const  attackEl = document.getElementById("attack");
const  defenseEl = document.getElementById("defense");
const  specialAttackEl = document.getElementById("special-attack");
const  specialDefenseEl = document.getElementById("special-defense");
const  speedEl = document.getElementById("speed");
 

const fetchData = async () => {
  try{
    const res = await fetch(pokemonAPI);
    const data = await res.json();
    showPokemon(data)

  } catch (err) {
    console.log(err)
  }
}



const showPokemonStats = (data) => {
  
const { height, id, name, sprites, stats, types, weight } = data;
  
  typesEl.innerHTML = ""

 pokemonNameEl.innerHTML = name.toUpperCase()
 pokemonIdEl.innerHTML = `#${id}`
 weightEl.innerHTML = `Weight: ${weight}`
 heightEl.innerHTML = `Height: ${height}`
 
 hpEl.innerHTML = stats[0].base_stat
 attackEl.innerHTML =  stats[1].base_stat
 defenseEl.innerHTML = stats[2].base_stat
 specialAttackEl.innerHTML = stats[3].base_stat
 specialDefenseEl.innerHTML = stats[4].base_stat
 speedEl.innerHTML = stats[5].base_stat

 imgEl.id = "sprite"
 imgEl.src = sprites.front_default
 imgContainerEl.appendChild(imgEl)


 const pokemonTypes = types.map(type => {
    const span = document.createElement('span');
    span.textContent = type.type.name.toUpperCase();
    return span;
});

pokemonTypes.forEach(span => typesEl.appendChild(span));
}








function clearInputValue() {
searchInputEl.value =" ";
} 

function removeImgElement() {
  imgElement.remove()
}

const showPokemon = (data) => {
    let inputValue = searchInputEl.value.toLowerCase().trim();
    const {results} = data;
    const pokemonNames = results.map(({ name }) => name.toLowerCase());
    const pokemonIds = results.map(({ id }) => id );
    const numericInputValue = parseInt(inputValue);

  // console.log(pokemonNames)
  // console.log(pokemonIds) 
  
   
      if(inputValue === "red") {
        
        clearInputValue();
        alert("Pokémon not found") 

      } else if (pokemonNames.includes(inputValue) || pokemonIds.includes(numericInputValue)) {
        let pokemonURL = pokemonAPI.concat(`/${inputValue}`)
        const fetchPokemonData = async () => {
        try{
          const res = await fetch(pokemonURL);
          const data = await res.json();
          showPokemonStats(data)

        } catch (err) {
          console.log(err)
        }
      }
        fetchPokemonData()
      }
}


 searchButtonEl.addEventListener("click", function () {
   fetchData()
})
