// Function to get data from the API https://pokeapi.co/api/v2/
async function getPokeData(pokeNum) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
  let pokeInfo = await res.json();
  //console.log(pokeInfo.name);
  return pokeInfo;
}

// Select all Region Div
const pokeRegions = document.querySelectorAll(".pokeRegion");

// Add a event listener to each Region Div
pokeRegions.forEach((region) => region.addEventListener("click", selectRegion));

// This function execute when a region is selected
async function selectRegion() {
  // First reset all the Region Divs to remove class: "selectedRegion"
  pokeRegions.forEach((region) => region.classList.remove("selectedRegion"));
  // Then aply the class: "slectedRegion" to the current select region
  this.classList.toggle("selectedRegion");
  // define a constant tath get the id of the region.
  const pokeId = this.id;
  // swicht to execute the funcition getPokedex() acord to selected region.
  switch (pokeId) {
    case "kanto":
      await getPokedex(151, 0);
      break;
    case "johto":
      await getPokedex(100, 151);
      break;
    case "hoenn":
      await getPokedex(135, 251);
      break;
    case "sinnoh":
      await getPokedex(107, 386);
      break;
    case "unova":
      await getPokedex(156, 493);
      break;
    case "kalos":
      await getPokedex(72, 649);
      break;
    case "alola":
      await getPokedex(88, 721);
      break;
    case "galar":
      await getPokedex(89, 809);
      break;
  }
}

// function to get all pokemon info of a region and input on the pokeBox div
// Need two inputs pokemlimit that mean the number of pokemons to show
// and pokeoffset thas is the offset btw XD..
async function getPokedex(pokeLimit, pokeOffset) {
  // while wait to fetch all the info show a loading animation
  document.getElementById("pokeBox").innerHTML =
    '<div class="lds-dual-ring"></div>';
  //Define a variable to store all of each pokemon of the region.
  let output = "";
  //for loop to get all the info of every pokemon
  for (var i = pokeOffset + 1; i <= pokeLimit + pokeOffset; i++) {
    let currentPokemon = await getPokeData(i);
    // every iteration update the output varible to store new pokemon data
    output += `
    <div class="pokeCard ${currentPokemon.types[0].type.name}" id="${currentPokemon.id}">
    <img class="sprite" src="${currentPokemon.sprites.front_default}">
        <div class="pokeDesc">
          <p>No. ${currentPokemon.id}</p>
          <P><span class="pokeName">${currentPokemon.name}</span></P>
          </div>
          </div>
          `;
  }
  //insert all the info in the div pokeBox
  document.getElementById("pokeBox").innerHTML = output;

  const pokemons = document.querySelectorAll(".pokeCard");
  //console.log(pokemons);
  pokemons.forEach((pokemon) =>
    pokemon.addEventListener("click", pokemonDescription)
  );
}

async function pokemonDescription() {
  const pokemonId = this.id;
  let pokeDesc = await getPokeData(pokemonId);
  let officialArtwork = pokeDesc.sprites.other['official-artwork'].front_default;
  let descOutput = `
  <img class="artwork" src="${officialArtwork}">
        <div class="pokeDescription">
          <p>No. ${pokeDesc.id}</p>
          <P><span class="pokeName">${pokeDesc.name}</span></P>
          </div>
  `;
  document.getElementById("pokeDescription").innerHTML = descOutput;
}

//to init the pokedex show the firs 151 pokemons
getPokedex(6, 0);

/*
      heigth = x/10 = mts
      id numero pokedex
      sprites:
      front_default
      front_shiny
      types [array]
      type.name
      weigth 69/10 kg
      
      */

/*
     async function prueba() {
       let prueba = await getPokeData(25);
       console.log(prueba.types[0].type.name);
     }
     prueba();
     */
