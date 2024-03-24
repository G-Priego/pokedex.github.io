import { typeToSpanish, getFirst } from "./extras.js";

export const baseURL = "https://pokeapi.co/api/v2/";

export async function obtenerPokemon(id) {
    try {
        let respuestaApi = await fetch(`${baseURL}pokemon/${id}`);
        let pokemon = await respuestaApi.json();
        return {
        name: pokemon.name,
        height: pokemon.height,
        id: pokemon.id,
        weight: pokemon.weight,
        img: pokemon.sprites.front_default, // Imagen del pokemon
        attack: pokemon.stats.find((stat) => stat.stat.name === "attack").base_stat, // Ataque base del Pokémon
        base_experience: pokemon.base_experience, // Experiencia base del Pokémon
        type: typeToSpanish(pokemon.types.map((type) => type.type.name)),
        };
    } catch (error) {
      location.reload();
      alert("No se encontró al pokemon :c");
      throw new Error('Error fetching Pokemon info:', error);
    }
}

export function crearCarta(pokemon) {
  // Crear párrafos segun la cantidad de tipos que tiene cada pokemon
  let types = pokemon.type.map((type) =>
    `<p class="${type} type">${type}</p>`
  );
  types = types.join(""); // Para que al mostrarlos no aparezca la coma
  
  let article = document.createElement("article");
  article.classList.add("carta");
  article.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.img}" alt="${pokemon.name}">
    <div class="pokemon-types">${types}</div>    
    `;
  const openBtn = document.createElement("button");
  openBtn.classList.add("info-btn")
  openBtn.innerHTML = "&#43;info";
  article.appendChild(openBtn)

  openBtn.addEventListener("click", () => {
  const popup = document.createElement("dialog");
    popup.innerHTML = `
    <div class="close"><a class="close-btn">&times</a></div>
    <p>Características</p>
    
    <ul>
        <li>ID: ${pokemon.id}</li> 
        <li>Altura: ${pokemon.height} m</li>
        <li>Peso: ${pokemon.weight} kg</li>
        <li>Ataque: ${pokemon.attack}</li>
        <li>Experiencia base: ${pokemon.base_experience}</li>
    </ul>  
    `;
    document.getElementById("render").appendChild(popup);
    popup.showModal();

    // Agregar evento para cerrar el popup al hacer clic en el botón de cerrar
    const closeBtn = popup.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      popup.close();
      popup.remove(); // Eliminar el popup del DOM una vez cerrado
    });
  });
  document.getElementById("render").appendChild(article);
}

export async function obtenerListado(offset, limit) {
  for (let index = offset; index <= limit + offset; index++) {
    const pokemon = await obtenerPokemon(index);
    crearCarta(pokemon);
  }
}

// Array que guarda la cantidad de pokemones por generacion
const gensLength = [151, 100, 135, 107, 156, 72, 88, 96, 120];
export async function showGen(gen){
  //Traer el contenedor del boton de cargar mas y vaciarlo siempre al inicio para que no se acumulen
  const divBtn = document.getElementById("btn-holder");
  divBtn.innerHTML = "";
  //Vaciar el render cada vez que se llama la funcion
  document.getElementById("render").innerHTML = "";
  //Crear boton
  const loadBtn = document.createElement("button");
  loadBtn.classList.add("render-loadBtn");
  loadBtn.textContent = "Cargar más";
  //Agregar el botón recien creado al div btn-holder
  divBtn.appendChild(loadBtn);

  // Declarar las variables que se pasarán como argumentos a obtenerListado
  let limit = 20;
  const firstPokemon = getFirst(gen, gensLength);
  // Variable que se modificará dependiendo del boton cargar mas (si el usuario quiere ver mas pokemon de la generacion)
  let offset = firstPokemon;

  const lastPokemon = firstPokemon + gensLength[gen-1]-1;
  
  await obtenerListado(firstPokemon, limit);
  //Agregar el boton de cargar mas al render solo cuando se hayan cargado los pokemon
  document.getElementById("render").appendChild(divBtn);

  loadBtn.addEventListener("click", ()=>{
    if (limit != 20){
      alert("No hay más pokemon");
      return;
    }
    offset += 21;
    limit = Math.min(20, lastPokemon-offset);
    obtenerListado(offset, limit);
  })
}

/*Codigo para ver todos los pokemon de una generacion por su nombre
  Algunos nombres guardados en data.pokemon_species no coinciden con los de la api
   y tiene el error de no "encontrarlos"
 export function fetchGen(gen){
   fetch(`${baseURL}generation/${gen}`)
     .then((results) => results.json())
     .then((data) => showGen(data.pokemon_species))
 }

 async function showGen(arrayGen){
   document.getElementById("render").innerHTML = "";
   arrayGen.forEach(async element => {
    const pokemon = await obtenerPokemon(element.name);
    crearCarta(pokemon);
   });
 } */