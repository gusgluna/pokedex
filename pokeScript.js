async function getPokeData(pokeNum) {
  let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
  let pokeInfo = await res.json();
  //console.log(pokeInfo.name);
  return pokeInfo;
}

//getPokeData(1);

async function getPokedex(pokeLimit, pokeOffset) {
  document.getElementById("pokeBox").innerHTML = '<div class="lds-dual-ring"></div>';
  
  let output = "";

  for (var i = pokeOffset + 1; i <= pokeLimit + pokeOffset; i++) {
    let currentPokemon = await getPokeData(i);
    output += `
    <div class="pokeCard">
        <img class="sprite" src="${currentPokemon.sprites.front_default}">
        <div class="pokeDesc">
          <p>No. ${currentPokemon.id}</p>
          <P>Name: <span class="pokeName">${currentPokemon.name}</span></P>
        </div>
    </div>
    `;
  }

  document.getElementById("pokeBox").innerHTML = output;
}

async function pokedexKanto(){
  await getPokedex(151, 0);
}

async function pokedexJohto(){
  await getPokedex(100, 151);
}

async function pokedexHoenn(){
  await getPokedex(135, 251);
}

async function pokedexSinnoh(){
  await getPokedex(107, 386);
}

async function pokedexUnova(){
  await getPokedex(156, 493);
}

async function pokedexKalos(){
  await getPokedex(72, 649);
}

async function pokedexAlola(){
  await getPokedex(88, 721);
}

async function pokedexGalar(){
  await getPokedex(89, 809);
}

document.getElementById('kanto').addEventListener("click", pokedexKanto);
document.getElementById('johto').addEventListener("click", pokedexJohto);
document.getElementById('hoenn').addEventListener("click", pokedexHoenn);
document.getElementById('sinnoh').addEventListener("click", pokedexSinnoh);
document.getElementById('unova').addEventListener("click", pokedexUnova);
document.getElementById('kalos').addEventListener("click", pokedexKalos);
document.getElementById('alola').addEventListener("click", pokedexAlola);
document.getElementById('galar').addEventListener("click", pokedexGalar);

getPokedex(9, 0);

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
