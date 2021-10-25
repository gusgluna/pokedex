// Get data of the pokedex from the API https://pokeapi.co/api/v2/
async function getPokeData(id) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let pokeRes = await res.json();
  let pokeInfo = {
    name: pokeRes.name,
    id: pokeRes.id,
    type: pokeRes.types[0].type.name,
    sprite: pokeRes.sprites.front_default,
  };
  return pokeInfo;
}

async function getFullDescription(id) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let fullDesc = await res.json();
  let res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  let forms = await res2.json();

  let pokeforms = {};
  forms.varieties.forEach((form) => {
    pokeforms[form.pokemon.name] = form.pokemon.url;
  });

  let pokeFullDescription = {
    name: fullDesc.name,
    id: fullDesc.id,
    type:
      typeof fullDesc.types[1] == "undefined"
        ? [fullDesc.types[0].type.name]
        : [fullDesc.types[0].type.name, fullDesc.types[1].type.name],
    artwork: fullDesc.sprites.other["official-artwork"].front_default,
    height: fullDesc.height / 10,
    weight: fullDesc.weight / 10,
    forms: pokeforms,
  };
  console.log(pokeFullDescription);
  return pokeFullDescription;
}

async function getPokeForm() {}

// Select all Region Div
const pokeRegions = document.querySelectorAll(".pokeRegion");

// Add a event listener to each Region Div
pokeRegions.forEach((region) => region.addEventListener("click", selectRegion));

// This function execute when a region is selected
async function selectRegion() {
  // First reset all the Region Divs to remove class: "selectedRegion"
  pokeRegions.forEach((region) => region.classList.remove("selectedRegion"));
  // Then aply the class: "slectedRegion" to the current selected region
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
    <div class="pokeCard ${currentPokemon.type}" id="${currentPokemon.id}">
      <img class="sprite" src="${currentPokemon.sprite}">
      <div class="pokeDesc">
        <p>No. ${currentPokemon.id}</p>
        <P><span class="pokeName">${currentPokemon.name}</span></P>
      </div>
    </div>
          `;
  }
  //insert all the information in the div pokeBox
  document.getElementById("pokeBox").innerHTML = output;

  const pokemons = document.querySelectorAll(".pokeCard");
  pokemons.forEach((pokemon) =>
    pokemon.addEventListener("click", pokemonDescription)
  );
}

async function pokemonDescription() {
  const pokemonId = this.id;
  const pokeDescription = await getFullDescription(pokemonId);
  let descOutput = `
  <img 
  class="artwork ${pokeDescription.type[0]}" 
  id="pokeArtwork" 
  src="${pokeDescription.artwork}
  "/>
  <div class="description">
    <p>No. ${pokeDescription.id}</p>
    <P>Name: <span class="pokeName">${pokeDescription.name}</span></P>
    <p>Type: ${
      typeof pokeDescription.type[1] == "undefined"
        ? `<span class="${pokeDescription.type[0]} typeBadge">${pokeDescription.type[0]}</span>`
        : `<span class="${pokeDescription.type[0]} typeBadge">${pokeDescription.type[0]}</span> <span class="${pokeDescription.type[1]} typeBadge">${pokeDescription.type[1]}</span>`
    }</p>
    <p>Heigth: ${pokeDescription.height} mts.</p>
    <p>Weigth: ${pokeDescription.weight} kg</p>
  </div>
  `;

  document.getElementById("pokeDescription").innerHTML = descOutput;
}

//to init the pokedex show the firs 151 pokemons
getPokedex(10, 0);
