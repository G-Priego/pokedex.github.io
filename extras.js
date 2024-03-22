// funcion para traducir los tipos de pokemon al español
export function typeToSpanish(array) {
    const types = {
        "steel": "acero",
        "water": "agua",
        "dragon": "dragón",
        "electric": "eléctrico",
        "fairy": "hada",
        "ghost": "fantasma",
        "fire": "fuego",
        "ice": "hielo",
        "bug": "bicho",
        "fighting": "lucha",
        "normal": "normal",
        "rock": "roca",
        "grass": "planta",
        "psychic": "psíquico",
        "dark": "siniestro",
        "ground": "tierra",
        "poison": "veneno",
        "flying": "volador"
    };
    
    for (let index = 0; index < array.length; index++) {
        if (types.hasOwnProperty(array[index])) {
            array[index] = types[array[index]];
        }
    }
    return array;
}