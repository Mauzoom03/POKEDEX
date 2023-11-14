/*Inicializacion aqui obtenemos la lista pokedex y la introducimos en una variable*/
let pokemonData=[];
const getPokedex = () => {
  const pokedex$$ = document.querySelector("#pokedex");
  return pokedex$$;
};

/*obtenemos la info de la pokedex*/
const getPokedexData = async () => {
  const pokedexElements = getPokedex();
  const pokemonTotal = 150;


  /*Mapeamos los pokemones y sus stats*/
  for (let i = 1; i <= pokemonTotal; i++) {
     await fetch("https://pokeapi.co/api/v2/pokemon/" + i)
      .then((response) => response.json())
      .then((data) => {
        const pokemon = {
          name: data.name,
          image: data.sprites["front_default"],
          Type: data.types.map((type) => type.type.name).join(", "),
          id: data.id,
        };
        pokemonData.push(pokemon);
      });
  }
};

/*funcion donde pintamos los pokemones y su info*/
const printPokemon= (pokemonData,pokedexElements) => {
  const div1 = document.createElement("div");
  div1.classList.add("pokemonData");
};

getPokedexData();




/*Creando filtro para pokemones segun su type*/

const filterByType = (typeToFilter, allPokemon) => {
  const lowercaseType = typeToFilter.toLowerCase();

  const filteredPokemon = pokemonData.filter((data) => {
   
    const lowercaseTypes = data.Type.toLowerCase();

    return lowercaseTypes.includes(lowercaseType);
  });

  return filteredPokemon;
};

let allPokemon=[];

const fireTypePokemon = filterByType('fire', allPokemon);

const doPokemon = (pokemonData, pokedexElements) => {
  pokedexElements.innerHTML = "";
  for(let i = 0; i < pokemonData.length; i++) {
    const pokemon = pokemonData[i];

    const div2 = document.createElement("div");
    div2.classList.add("pokemonData");

    const name$$ = document.createElement("p");
    name$$.textContent = "Name : " + pokemon.name;

    const img$$ = document.createElement("img");
    img$$.src = pokemon.image;

    const type$$ = document.createElement("p");
    type$$.textContent = "Type : " + pokemon.Type;

    const id$$ = document.createElement("p");
    id$$.textContent = "ID : " + pokemon.id;

    div2.appendChild(name$$);
    div2.appendChild(img$$);
    div2.appendChild(type$$);
    div2.appendChild(id$$);

    pokedexElements.appendChild(div2);

console.log(fireTypePokemon);
};
};


// agregando eventListener a el fltro*/
const initializeFilterButtons = () => {
  const pokedexElements = getPokedex();
  const filterButtons = document.querySelectorAll('.btn-item');

  for (let i = 0; i < filterButtons.length; i++) {
    const button = filterButtons[i];

    button.addEventListener('click', () => {
      const typeToFilter = button.id.toLowerCase();
      const filteredPokemon = filterByType(typeToFilter, allPokemon);
      doPokemon(filteredPokemon, pokedexElements);
    });
  };

  /*View all btn*/
  const viewAllButton = document.querySelector('#view-all');
  viewAllButton.addEventListener('click', () => {
    doPokemon(pokemonData,pokedexElements);
  });
};
initializeFilterButtons();

