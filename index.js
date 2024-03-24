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

//ver por generacion
const select = document.getElementById("gen-select");
select.addEventListener("change", ()=>{
  //ocultar los botones de navegación cada vez que se consulta una generacion
  const navBtns = document.querySelectorAll(".pagination");
  navBtns.forEach(element => {
    element.style.display = "none"; 
  });
  //llamar a la funcion que muestra la generacion de acuerdo al valor seleccionado
  showGen(select.value);
});

obtenerListado(offset, limit);
