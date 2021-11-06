async function getDescription(id) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let data = await res.json();
  let res2 = await fetch(`${data.species.url}`);
  let forms = await res2.json();
  let formsObj = {};
  forms.varieties.forEach((form) => {
    id = form.pokemon.url.substr(34, form.pokemon.url.length - 35);
    formsObj[form.pokemon.name] = id;
  });

  let pokemonInfo = {
    name: data.name,
    id: data.id,
    no: data.species.url.substr(42, data.species.url.length - 43),
    artwork: data.sprites.other["official-artwork"].front_default,
    sprite: data.sprites.front_default,
    height: data.height / 10,
    weight: data.weight / 10,
    type:
      typeof data.types[1] == "undefined"
        ? [data.types[0].type.name]
        : [data.types[0].type.name, data.types[1].type.name],
    forms: formsObj,
  };
  return pokemonInfo;
}

async function selectRegion() {
  pokeRegions.forEach((region) => region.classList.remove("selectedRegion"));
  this.classList.toggle("selectedRegion");
  const pokeId = this.id;
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

// Select all Region and add EventListener to get dex
const pokeRegions = document.querySelectorAll(".pokeRegion");
pokeRegions.forEach((region) => region.addEventListener("click", selectRegion));

// function to get all pokemon info of a region and input on the pokeBox div
async function getPokedex(limit, offset) {
  let total = 0;
  document.getElementById(
    "pokeBox"
  ).innerHTML = `<div class="lds-dual-ring"></div>
      <div id="percentLoad">Loading: 0% </div>`;
  let output = "";
  for (var i = offset + 1; i <= limit + offset; i++) {
    let currentPokemon = await getDescription(i);
    output += `
    <div class="pokeCard ${currentPokemon.type[0]}" id="${currentPokemon.id}">
      <img class="sprite" src="${currentPokemon.sprite}">
      <div class="pokeDesc">
        <p>No. ${currentPokemon.no}</p>
        <P><span class="pokeName">${currentPokemon.name}</span></P>
      </div>
    </div>`;
    total++;
    document.getElementById("percentLoad").innerHTML = `Loading: ${Math.ceil(
      (total / limit) * 100
    )}%`;
  }
  document.getElementById("pokeBox").innerHTML = output;
  const pokemons = document.querySelectorAll(".pokeCard");
  pokemons.forEach((pokemon) =>
    pokemon.addEventListener("click", pokemonDescription)
  );
}

async function pokemonDescription() {
  const pokemonId = this.id;
  const pokeDescription = await getDescription(pokemonId);
  document.getElementById("pokeArtwork").src = pokeDescription.artwork;
  document.getElementById("pokeArtwork").className = "";
  document
    .getElementById("pokeArtwork")
    .classList.add("artwork", `${pokeDescription.type[0]}`);
  document.getElementById("name").innerHTML = pokeDescription.name;
  document.getElementById("number").innerHTML = `No. ${pokeDescription.no}`;
  document.getElementById(
    "height"
  ).innerHTML = `Height: ${pokeDescription.height} mts.`;
  document.getElementById(
    "weight"
  ).innerHTML = `Weight: ${pokeDescription.weight} kg`;
  document.getElementById("typeBadges").innerHTML = `<p>Type: ${
    typeof pokeDescription.type[1] == "undefined"
      ? `<span class="${pokeDescription.type[0]} typeBadge">${pokeDescription.type[0]}</span>`
      : `<span class="${pokeDescription.type[0]} typeBadge">${pokeDescription.type[0]}</span> <span class="${pokeDescription.type[1]} typeBadge">${pokeDescription.type[1]}</span>`
  }</p>`;

  formsList = "";
  for (form in pokeDescription.forms) {
    formsList += `<option class="formOption" value="${pokeDescription.forms[form]}">${form}</option>`;
  }
  document.getElementById("selectPokemonForm").innerHTML = formsList;
}

async function pokemonDescriptionForm(pokemonId) {
  const pokeDescription = await getDescription(pokemonId);
  document.getElementById("pokeArtwork").src = pokeDescription.artwork;
  document.getElementById("pokeArtwork").className = "";
  document
    .getElementById("pokeArtwork")
    .classList.add("artwork", `${pokeDescription.type[0]}`);
  document.getElementById("name").innerHTML = pokeDescription.name;
  document.getElementById("number").innerHTML = `No. ${pokeDescription.no}`;
  document.getElementById(
    "height"
  ).innerHTML = `Height: ${pokeDescription.height} mts.`;
  document.getElementById(
    "weight"
  ).innerHTML = `Weight: ${pokeDescription.weight} kg`;
  document.getElementById("typeBadges").innerHTML = `<p>Type: ${
    typeof pokeDescription.type[1] == "undefined"
      ? `<span class="${pokeDescription.type[0]} typeBadge">${pokeDescription.type[0]}</span>`
      : `<span class="${pokeDescription.type[0]} typeBadge">${pokeDescription.type[0]}</span> <span class="${pokeDescription.type[1]} typeBadge">${pokeDescription.type[1]}</span>`
  }</p>`;
}
//to init the pokedex show the first 151 pokemons
getPokedex(151, 0);
