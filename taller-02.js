//Punto 1
function findMax(lista){
    let mayor=0;
    for (let i = 0; i < lista.length; i++) {
        if(lista[i]>mayor){
            mayor=lista[i];
        }
    }
    return mayor;
}
//Punto 2
function includes(lista,num){
    for (let i = 0; i < lista.length; i++) {
        if(lista[i]==num){
            return true;
        }
    }
    return false;
}
//Punto 3
function sum(lista){
    let suma=0;
    for (let i = 0; i < lista.length; i++) {
        suma+=lista[i];
    }
    return suma;
}
//Punto 4
function missingNumbers(lista){
    let min= lista[0];
    let max= findMax(lista);
    let listaFaltantes=[];
    for (let i = 0; i < lista.length; i++) {
        if(lista[i]<min){
            min=lista[i];
        }
    }
    for (let i = min; i < max-1; i++) {
        if(includes(lista,i)==false){
           listaFaltantes.push(i);
        }
    }
    return listaFaltantes;
}
