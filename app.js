import fs from "fs";
import {parse} from "csv-parse/sync";

console.log(`Processing started at ${new Date().toISOString()}`)

// Read the input file
const inputFile = fs.readFileSync('input.csv')
const inputRecords = parse(inputFile, {
    columns: true,
    skip_empty_lines: true,
});

for (const record of inputRecords) {
    console.log(record);
}

console.log(`Processing ended at ${new Date().toISOString()}`)
