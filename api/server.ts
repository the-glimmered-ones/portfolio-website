import index from "../index.html"
import code from "../code.html"
import art from "../art.html"
import about from "../about.html"
import { get } from '@vercel/blob'

console.log("server file reached")
const HOST_NAME = "localhost"
const PORT = 2323
const ART_STORE_URL = "https://y1srumwmhlmocc73.private.blob.vercel-storage.com/"
console.log(PORT)

async function serveRes(url: string, subfolder: string = ""){
    let filePath = url.slice(url.indexOf(subfolder) + (subfolder).length)
    const foundTexture = new URL(ART_STORE_URL + subfolder + filePath)
    // const token = process.env.BLOB_READ_WRITE_TOKEN;
    // const options = {
    //     headers: {
    //         "Authorization": `Bearer ${token}`,
    //     },
    // };
    console.log(foundTexture.toString())
    if (foundTexture){
        const result = await get(foundTexture.toString(), {
            access: 'private',
            headers: {
                "Authorization": `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            },
        })
        console.log("result: ", result)

        if (!result || result.statusCode !== 200) {
            return new Response('Not found', { status: 404 })
        }

        //return new Response(final)
        return new Response(result.stream, {
            headers: {
            'content-type': result.blob.contentType,
            'x-content-type-options': 'nosniff',
            'cache-control': 'private, no-store',
            },
        })
    }
    else{
        return new Response("404 not found")
    }
}

const server = Bun.serve({
    port: PORT,
    //hostname: HOST_NAME,
    routes: {
        "/": index,
        "/code.html": code,
        "/art.html": art,
        "/about.html": about,
        "/favicon.ico": Bun.file("./favicon.ico"),
        "/art/digital/*": ({url}) => {return serveRes(url, "digital-art/")},
        "/art/pen-and-ink/*": ({url}) => {return serveRes(url, "pen-and-ink/")},
        "/art/pixel/*": ({url}) => {return serveRes(url, "pixel-art/")},
    },
    fetch(req){
        console.log(req.url)
        return new Response("no route assigned for this url", {status: 420})
    }
})