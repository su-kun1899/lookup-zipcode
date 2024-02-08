import querystring from "querystring";
import https from "https";

export const fetchByAddress = (address) => {
    const query = querystring.stringify({address: address})

    const options = {
        hostname: 'zipcoda.net',
        port: 443,
        path: `/api?${query}`,
        method: 'GET',
    }

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = ''
            res.on('data', (chunk) => {
                data += chunk
            })

            res.on('end', () => {
                resolve(JSON.parse(data))
            })
        })

        req.on('error', (error) => {
            reject(`Problem with request: ${error.message}`)
        })

        req.end()
    })
}
