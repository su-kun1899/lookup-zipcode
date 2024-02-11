import {setTimeout} from "timers/promises"
import {fetchByAddress} from "./zipcoda_api.js";
import fs from "fs";

const cachedZipcode = new Map();

export const resolveZipcode = async (address) => {
    // Check if the cache has the address
    if (cachedZipcode.has(address)) {
        return cachedZipcode.get(address);
    }

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

const cacheFileName = 'zipcode_cache.json'

export const storeCache = () => {
    // save cache to a file in JSON format
    const obj = Object.fromEntries(cachedZipcode)
    const json = JSON.stringify(obj, null, 2)

    fs.writeFileSync(cacheFileName, json)
}

export const restoreCache = () => {
    if (fs.existsSync(cacheFileName) === false) {
        return
    }

    const data = fs.readFileSync(cacheFileName, 'utf8')
    const obj = JSON.parse(data)

    for (const [key, value] of Object.entries(obj)) {
        cachedZipcode.set(key, value)
    }
}
