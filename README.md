# zipcode-resolver

This is a Node.js application that reads an input CSV file with addresses, resolves the postal codes
with [ZIPCODA API](https://zipcoda.net/doc) for each address,
and writes the results to an output CSV file.

## Usage

1. Install the dependencies:

```bash
npm install
```

2. Prepare your `input.csv` file. The file should contain a column named '住所' with the addresses for which you want to
   resolve the postal codes. See examples below and the `input.csv.example` file.

```csv
"住所"
"東京都中野区弥生町3-4-14"
"千葉県市川市真間1-3-20"
"愛知県名古屋市緑区鳴子町1-3-10"
```

3. Run the application:

```bash
npm start
```

4. The results are output to the `output.csv` file.

## Note

This application uses the [ZIPCODA API](https://zipcoda.net/doc) to resolve zipcodes.  
Please be aware of the API call limit when using this application.

The application waits a few seconds for each address to prevent excessive API calls, but caches the results.  
If you want to clear the cache, delete the `zipcode_cache.json` file.
