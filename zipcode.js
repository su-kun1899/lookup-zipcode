import {setTimeout} from "timers/promises"
import {fetchByAddress} from "./zipcoda_api.js";

export const resolveZipcode = async (address) => {
    // For API call restriction
    await setTimeout(3000)

    try {
        const data = await fetchByAddress(address);

        if (data.status !== 200) {
            console.error(data, address);
            return 'error: status code is not 200';
        }

        return data.items[0].zipcode;
    } catch (e) {
        console.error(e, address);
        return 'error: failed to fetch';
    }
}
