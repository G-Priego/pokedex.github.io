import { obtenerPokemon, crearCarta, obtenerListado, showGen } from "./pokeAPI.js";

const render = document.getElementById("render");
const limit = 20;
let offset = 1; // para que empiece siempre por el pokemon numero 1

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
  location.reload();
})

// ver pagina anterior
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

//ver pagina siguiente
const next = document.querySelectorAll(".next-btn");
for (let index = 0; index < next.length; index++) {
  next[index].addEventListener("click", () =>{
  offset += 21;
  render.innerHTML = "";
  obtenerListado(offset, limit);
})
}

const select = document.getElementById("gen-select");
select.addEventListener("change", ()=>{
  console.log(select.value);
  showGen(select.value);
});

obtenerListado(offset, limit);
