import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
    .options({
        'b':{
            alias: "base",
            type: "number",
            demandOption:true,
            describe:"Number base for multiplication table"
        },
        'l':{
            alias: "limit",
            type:"number",
            default:10,
            describe:"Number for limit the table multiplication"
        },
        "c":{
            alias:"create",
            type:"boolean",
            default:false,
            describe:"Create file with table multiplication"
        },
        "n":{
            alias:"name",
            type:"string",
            default:"table",
            describe:"Name the file"
        },
        "d":{
            alias:"directory",
            type:"string",
            default:"tables",
            describe:"Output Directory the"
        }
    }).check((argv,options)=>{
        if(argv.b < 1) throw new Error("Base must be greater than 0");
        return true;
    }).parseAsync();