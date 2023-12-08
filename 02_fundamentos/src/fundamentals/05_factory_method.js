const FactoryPerson = ({ getId, getAge }) => {
    return ({ name, birthdate }) => {
        return {
            id: getId(),
            name,
            birthdate,
            age: getAge(birthdate)
        }
    }
}
module.exports = {
    FactoryPerson, 
}