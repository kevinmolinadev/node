const fs = require('fs');
//LEER ARCHIVOS Y MANIPULARLOS

const data = fs.readFileSync('README_REACT.md', 'utf-8');
const newData = data.replace(/react/ig, "next");
fs.writeFileSync("README_CUSTOM.md", newData);

//MANEJAR LOGICA SOBRE LOS ARCHIVOS

//Encontrar el numero de palabras del archivo
const wordsCount = data.split(" ").length;
console.log(`La cantidad de palabras en este archivo son ${wordsCount}`);

//Encontrar las concidencias de la palabra react
const reactWordsCount = data.match(/react/ig).length
console.log(`La cantidad de palabras react en este archivo son ${reactWordsCount}`);


