import { obtenerPokemon, crearCarta, obtenerListado } from "./pokeAPI.js";

// Buscar y mostrar pokemon especifico
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", async ()=>{
  const pokemonNombre = document.getElementById("search-input").value.toLowerCase();
  document.getElementById("search-input").value = "";
  document.getElementById("render").innerHTML = "";
  const dataPokemon = await obtenerPokemon(pokemonNombre);
  crearCarta(dataPokemon);
})

// Recargar la home page dando click sobre el titulo
const mainTitle = document.getElementById("main-title");
mainTitle.addEventListener("click", ()=>{
  document.getElementById("render").innerHTML = "";  
  obtenerListado();
})
obtenerListado();
