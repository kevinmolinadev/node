interface CreateTableModel {
    execute: (options: CreateTableOptions) => string
}

interface CreateTableOptions {
    base: number,
    limit?: number
}
export class CreateTable implements CreateTableModel {
    constructor() {
        /* 
        */
    }

    execute({ base, limit = 10 }: CreateTableOptions) {
        let result = "";
        for (let i = 0; i < limit; i++) {
            result += `${base} x ${i + 1} = ${base * (i + 1)}`;
            if (i < limit - 1) result += "\n";
        }
        return result;
    }
}