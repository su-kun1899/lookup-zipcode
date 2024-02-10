import {setTimeout} from "timers/promises"
import {fetchByAddress} from "./zipcoda_api.js";
import fs from "fs";

const cachedZipcode = new Map();

export const resolveZipcode = async (address) => {
    // For API call restriction
    await setTimeout(3000)

    try {
        const data = await fetchByAddress(address);

        if (data.status !== 200) {
            console.error(data, address);
            return 'error: status code is not 200';
        }

        const zipcode = data.items[0].zipcode;
        cachedZipcode.set(`${address}`, zipcode);

        return zipcode;
    } catch (e) {
        console.error(e, address);
        return 'error: failed to fetch';
    }
}

export const storeCache = () => {
    // save cache to a file in JSON format
    const cacheFileName = 'zipcode_cache.json';
    const obj = Object.fromEntries(cachedZipcode);
    const json = JSON.stringify(obj, null, 2);

    fs.writeFileSync(cacheFileName, json);
}
