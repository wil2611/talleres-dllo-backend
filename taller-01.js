
function convertidorTemp(C) {
    F = C * 9 / 5 + 32
    return F
}
//console.log(convertidorTemp(30))

function resolvedor(a, b, c, signo) {
    if (signo == "+") {
        x1 = (-b + Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
        return x1
    } else {
        x2 = (-b - Math.sqrt(Math.pow(b, 2) - 4 * a * c)) / (2 * a)
        return x2
    }
}
//console.log(resolvedor(1,5,4,"-"))

function mejorParidad(numero) {
    return numero % 2 == 0
}
//console.log(mejorParidad(2))

function peorParidad(numero) {
    if (numero == 0) { return true }
     else if (numero == 1) { return false } 
     else if (numero == 2) { return true } 
     else if (numero == 3) { return false } 
     else if (numero == 4) { return true } 
     else if (numero == 5) { return false } 
     else if (numero == 6) { return true } 
     else if (numero == 7) { return false } 
     else if (numero == 8) { return true } 
     else if (numero == 9) { return false } 
     else if (numero == 10) { return true }
}

//console.log(peorParidad(2))