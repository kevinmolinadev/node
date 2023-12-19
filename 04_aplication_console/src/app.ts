import fs from "node:fs"

const number = 8;
let table = `====================\nTabla del ${number}\n====================`
for (let i = 0; i < 10; i++) {
    table += `\n${number} x ${i + 1} = ${number * (i + 1)}`
}

console.log(table);

const path = "src/multiplication"
//Create directory 
fs.mkdirSync(path, { recursive: true });
//Save file 
fs.writeFileSync(`${path}/table-${number}.txt`, table);