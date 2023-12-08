const { getAge, getId } = require("./plugins")
const { message } = require("./fundamentals/01_template");
require("./fundamentals/02_desestructurin");
const { getItemById } = require("./fundamentals/03_callback")
const { getItemById: getItemByIdArrow } = require("./fundamentals/04_arrows")
const { FactoryPerson } = require("./fundamentals/05_factory_method");
const { fetchTeam } = require("./fundamentals/06_promises");

console.log(message);

function callback(error, item) {
    if (error) throw new Error(error);
    console.log(item);
}
getItemById(2, callback);
getItemByIdArrow(1, callback);



const buildPerson = FactoryPerson({ getId, getAge })
const obj = {
    name: "Kevin",
    birthdate: "2003-12-06"
}
const person = buildPerson(obj);
console.log(person);


fetchTeam()
    .then(team => console.log({ team }))
    .catch(e => console.log(e));
