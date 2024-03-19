const baseUrl = "https://pokeapi.co/api/v2/";

function crearCarta(pokemon) {
  let article = document.createElement("article");
  article.classList.add("carta");
  //article.style.backgroundColor = getRandomColor();
  article.innerHTML = `
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.img}" alt="">
    <p>Tipo: ${pokemon.type}</p>
    `;
  const openBtn = document.createElement("button");
  openBtn.textContent = "Mostrar info";
  article.appendChild(openBtn)

  openBtn.addEventListener("click", () => {
  const popup = document.createElement("dialog");
    popup.innerHTML = `
    <h2>Características</h2>
    <ul>
        <li>ID: ${pokemon.id}</li> 
        <li>Altura: ${pokemon.height}</li>
        <li>Peso: ${pokemon.weight}</li>
        <li>Ataque: ${pokemon.attack}</li>
        <li>Experiencia base: ${pokemon.base_experience}</li>
    </ul>  
    <button class="close-btn">Cerrar</button>     
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

async function obtenerPokemon(nombre) {
  let respuestaApi = await fetch(`${baseUrl}pokemon/${nombre}`);
  let pokemon = await respuestaApi.json();
  let propiedadesPokemon = {
    name: pokemon.name,
    height: pokemon.height,
    id: pokemon.id,
    weight: pokemon.weight,
    img: pokemon.sprites.front_default, // Imagen del pokemon
    attack: pokemon.stats.find((stat) => stat.stat.name === "attack").base_stat, // Ataque base del Pokémon
    base_experience: pokemon.base_experience, // Experiencia base del Pokémon
    type: pokemon.types.map((type) => type.type.name),
  };
  crearCarta(propiedadesPokemon);
}

async function obtenerListado() {
  let respuestaApi = await fetch(`${baseUrl}pokemon`);
  let listadoPokemons = await respuestaApi.json();
  console.log("informacion obtenerListado:", listadoPokemons.results);
  for (let index = 0; index < listadoPokemons.results.length; index++) {
    await obtenerPokemon(listadoPokemons.results[index].name);
  }
}

const getRandomColor = () => {
  const hexVal = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hexVal}`;
};

obtenerListado();
