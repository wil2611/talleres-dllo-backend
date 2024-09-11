const v = ["A", "E", "I", "O", "U"];
const c = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "Ñ", "P", "Q", "R", "S", "T", "V", "X", "Z", "W", "Y"]
function includes(arr, target) {
    return arr.find((item) => item === target) ? true : false;
}
function desglosarString(str, op) {
    if (op !== "vocales" && op !== "consonantes") return undefined;
    if (str.length === 0) return 0;

    let abc = op === "vocales" ? v : c;
    return str.split("").filter((item) => includes(abc, item.toUpperCase())).length;
}

function twoSum(arr, target) {

    const findPair = (a) => arr.findIndex((b) => a !== b ? a + b === target : false);

    return arr.map((item) => findPair(item))
        .sort((a, b) => a - b)
        .filter(item => item >= 0);
}

function conversionRomana(romano) {
    const valores = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    function convertir(romano) {
        if (romano.length === 0) return 0;
        const valorActual = valores[romano[0]];
        const valorSiguiente = romano.length > 1 ? valores[romano[1]] : 0;

        if (valorSiguiente > valorActual) {
            return valorSiguiente - valorActual + convertir(romano.slice(2));
        } else {
            return valorActual + convertir(romano.slice(1));
        }
    }
    return convertir(romano.toUpperCase());
}