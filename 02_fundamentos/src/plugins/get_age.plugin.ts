// const getAgePlugin = require("get-age");
export const getAge = (birthdate: string): number => {
    if (!birthdate) throw new Error("Birthdate is required");
    return new Date().getFullYear() - new Date(birthdate).getFullYear();
};
