interface FactoryPersonOptions {
    getId: () => string,
    getAge: (birthdate: string) => number
}

interface PersonOptions {
    name: string,
    birthdate: string,
}

export const FactoryPerson = ({ getId, getAge }: FactoryPersonOptions) => {
    return ({ name, birthdate }: PersonOptions) => {
        return {
            id: getId(),
            name,
            birthdate,
            age: getAge(birthdate)
        }
    }
}
