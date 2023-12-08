import { message } from "./fundamentals/01_template";
import { Day, getDayById } from "./fundamentals/03_callback";
import { FactoryPerson } from "./fundamentals/05_factory_method";
import { fetchPokemonNameById } from "./fundamentals/06_promises";
import { getAge, getId, buildLogger } from "./plugins";
const logger = buildLogger("app")

console.log(message);

function callback(error: string | undefined, day: Day | undefined) {
    if (error) throw new Error(error);
    console.log(day);
}
getDayById(2, callback);
getDayById(1, callback);



const buildPerson = FactoryPerson({ getId, getAge })
const obj = {
    name: "Kevin",
    birthdate: "2003-12-06"
}
const person = buildPerson(obj);
console.log(person);


fetchPokemonNameById(1)
    .then(team => logger.log(`${team}`))
    .catch(e => logger.error(e));
