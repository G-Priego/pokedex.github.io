import { typeToSpanish } from "./extras.js";

export const baseURL = "https://pokeapi.co/api/v2/";

export async function obtenerPokemon(nombre) {
    try {
        let respuestaApi = await fetch(`${baseURL}pokemon/${nombre}`);
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
        throw new Error('Error fetching Pokemon info:', error);
    }
  }

export function crearCarta(pokemon) {
  let article = document.createElement("article");
  article.classList.add("carta");
  //article.style.backgroundColor = getRandomColor();
  article.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.img}" alt="">
    <p>${pokemon.type}</p>
    `;
  const openBtn = document.createElement("button");
  openBtn.textContent = "Mostrar info";
  article.appendChild(openBtn)

  openBtn.addEventListener("click", () => {
  const popup = document.createElement("dialog");
    popup.innerHTML = `
    <div class="close"><a class="close-btn">&times</a></div>
    <p>Características</p>
    
    <ul>
        <li>ID: ${pokemon.id}</li> 
        <li>Altura: ${pokemon.height}</li>
        <li>Peso: ${pokemon.weight}</li>
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

export async function obtenerListado() {
  let respuestaApi = await fetch(`${baseURL}pokemon`);
  let listadoPokemons = await respuestaApi.json();
  for (let index = 0; index < listadoPokemons.results.length; index++) {
    const pokemon = await obtenerPokemon(listadoPokemons.results[index].name);
    crearCarta(pokemon);
    console.log(typeToSpanish(pokemon.type));
  }
}