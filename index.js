import { obtenerPokemon, crearCarta, obtenerListado } from "./pokeAPI.js";

const render = document.getElementById("render");
const limit = 20;
let offset = 1;

// Buscar y mostrar pokemon especifico
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", async ()=>{
  const pokemonNombre = document.getElementById("search-input").value.toLowerCase();
  document.getElementById("search-input").value = "";
  render.innerHTML = "";
  const dataPokemon = await obtenerPokemon(pokemonNombre);
  crearCarta(dataPokemon);
})

// Recargar la home page dando click sobre el titulo
const mainTitle = document.getElementById("main-title");
mainTitle.addEventListener("click", ()=>{
  render.innerHTML = "";  
  obtenerListado(1, limit);
})

const previous = document.querySelectorAll(".previous-btn");
for (let index = 0; index < previous.length; index++) {
  previous[index].addEventListener("click", ()=>{
  if (offset!=1){
    offset -= 21;
    render.innerHTML = "";
    obtenerListado(offset, limit);
  }
})
};


const next = document.querySelectorAll(".next-btn");
for (let index = 0; index < next.length; index++) {
  next[index].addEventListener("click", () =>{
  offset += 21;
  render.innerHTML = "";
  obtenerListado(offset, limit);
})
}

obtenerListado(offset, limit);
