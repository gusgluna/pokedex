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
  pokemons.forEach((pokemon) =>
  pokemon.addEventListener("click", pokemonDescription)
  );
}

async function pokemonDescription() {
  const pokemonId = this.id;
  const pokeDescription = await getPokeData(pokemonId);
  const officialArtwork =
  pokeDescription.sprites.other["official-artwork"].front_default;
  const name = pokeDescription.name;
  const pokemonTypes =
  typeof pokeDescription.types[1] != "undefined"
  ? `${pokeDescription.types[0].type.name} and ${pokeDescription.types[1].type.name}`
  : `${pokeDescription.types[0].type.name}`;
  const height = pokeDescription.height / 10;
  const weight = pokeDescription.weight / 10;
  let descOutput = `
  <img class="artwork ${pokeDescription.types[0].type.name}" id="pokeArtwork" src="${officialArtwork}">
  <div class="description">
  <p>No. ${pokemonId}</p>
  <P>Name: <span class="pokeName">${name}</span></P>
  <p>Types: <span class="pokeData">${pokemonTypes}</span></p>
  <p>Heigth: ${height} mts.</p>
  <p>Weigth: ${weight} kg</p>
  </div>
  `;
  
  document.getElementById("pokeDescription").innerHTML = descOutput;
  // let actualType = document.getElementById("pokeDescription").classList[0];
  // document.getElementById("pokeDescription").classList.remove(actualType);
  // document.getElementById("pokeDescription").classList.toggle(pokeDescription.types[0].type.name);
  
}

//to init the pokedex show the firs 151 pokemons
getPokedex(6, 0);

/*
     async function prueba() {
       let prueba = await getPokeData(25);
       console.log(prueba.types[0].type.name);
     }
     prueba();
     */
