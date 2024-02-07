import fs from "fs";
import {parse} from "csv-parse/sync";
import {stringify} from "csv-stringify/sync";

console.log(`Processing started at ${new Date().toISOString()}`)

// Read the input file
const inputFile = fs.readFileSync('input.csv')
const inputRecords = parse(inputFile, {
    columns: true,
    skip_empty_lines: true,
});

// Resolve the zip code for each address
const outputRecords = [];
for (const record of inputRecords) {
    const address = record['住所']
    // TODO: Replace this with the actual postal code resolution
    const zipcode = '1234567'

    outputRecords.push({
        zipcode: zipcode,
        address: address,
    })
}

// Write the output file
const output = stringify(outputRecords, {
    header: true,
})
fs.writeFileSync('output.csv', output)

console.log(`Processing ended at ${new Date().toISOString()}`)
