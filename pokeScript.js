// Create a function to get data from the API

async function getPokeData(pokeNum) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
  let pokeInfo = await res.json();
  //console.log(pokeInfo.name);
  return pokeInfo;
}

const pokeRegions = document.querySelectorAll(".pokeRegion");
pokeRegions.forEach((region) => region.addEventListener("click", selectRegion));
/*
async function prueba() {
  let prueba = await getPokeData(25);
  console.log(prueba.types[0].type.name);
}
prueba();
*/

async function getPokedex(pokeLimit, pokeOffset) {
  document.getElementById("pokeBox").innerHTML =
    '<div class="lds-dual-ring"></div>';

  let output = "";

  for (var i = pokeOffset + 1; i <= pokeLimit + pokeOffset; i++) {
    let currentPokemon = await getPokeData(i);
    output += `
    <div class="pokeCard ${currentPokemon.types[0].type.name}">
        <img class="sprite" src="${currentPokemon.sprites.front_default}">
        <div class="pokeDesc">
          <p>No. ${currentPokemon.id}</p>
          <P><span class="pokeName">${currentPokemon.name}</span></P>
        </div>
    </div>
    `;
  }

  document.getElementById("pokeBox").innerHTML = output;
}


async function selectRegion() {
  pokeRegions.forEach((region) => region.classList.remove('selectedRegion'));
  this.classList.toggle('selectedRegion');
  let pokeId = this.id;
  console.log(pokeId);
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
