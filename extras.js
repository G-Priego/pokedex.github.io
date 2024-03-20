export function typeToSpanish(array) {
    const types = {
        "steel": "Acero",
        "water": "Agua",
        "dragon": "Dragón",
        "electric": "Eléctrico",
        "fairy": "Hada",
        "ghost": "Fantasma",
        "fire": "Fuego",
        "ice": "Hielo",
        "bug": "Bicho",
        "fighting": "Lucha",
        "normal": "Normal",
        "rock": "Roca",
        "grass": "Planta",
        "psychic": "Psíquico",
        "dark": "Siniestro",
        "ground": "Tierra",
        "poison": "Veneno",
        "flying": "Volador"
    };
    
    for (let index = 0; index < array.length; index++) {
        if (types.hasOwnProperty(array[index])) {
            array[index] = types[array[index]];
        }
    }
    return array;
}