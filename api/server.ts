import index from "../index.html"
import code from "../code.html"
import art from "../art.html"
import about from "../about.html"
import { get, issueSignedToken, presignUrl } from '@vercel/blob'

console.log("server file reached")
//const HOST_NAME = "localhost"
const PORT = 2323
const ART_STORE_URL = "https://y1srumwmhlmocc73.private.blob.vercel-storage.com/"
console.log(PORT)

//https://vercel.com/docs/vercel-blob/using-blob-sdk#read-write-tokens
async function serveRes(url: string, subfolder: string = ""){
    let filePath = url.slice(url.indexOf("art/") + ("art/").length)
    if (subfolder == "digital" || subfolder == "pixel"){
        const pathStart = filePath.slice(0,filePath.indexOf(subfolder)+ subfolder.length)
        const pathEnd = filePath.slice(pathStart.length)
        filePath = pathStart + "-art" + pathEnd
    }
    const foundTexture = new URL(ART_STORE_URL + filePath)
    console.log("url: ", foundTexture.toString())
    // const token = process.env.BLOB_READ_WRITE_TOKEN;
    // const options = {
    //     headers: {
    //         "Authorization": `Bearer ${token}`,
    //     },
    // };
 
    // Server: issue a signed token. `issueSignedToken` calls the Blob
    // control API, so cache the result and reuse it across requests until it's
    // near expiry to avoid a network round-trip on every URL you sign.
    const token = await issueSignedToken({
    pathname: foundTexture.pathname.slice(1),
    operations: ['get'],
    validUntil: Date.now() + 60 * 60 * 1000,
    });
    
    // Sign a URL valid for 5 minutes, even though the token is valid for 1 hour.
    const { presignedUrl } = await presignUrl(token, {
    operation: 'get',
    pathname: foundTexture.pathname.slice(1),
    access: 'private',
    validUntil: Date.now() + 5 * 60 * 1000,
    });
    
    const res = await fetch(presignedUrl);
    console.log(res)

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
        "/index.html": index,
        "/code.html": code,
        "/art.html": art,
        "/about.html": about,
        "/favicon.ico": Bun.file("./favicon.ico"),
        "/art/digital/*": ({url}) => {return serveRes(url, "digital")},
        "/art/pen-and-ink/*": ({url}) => {return serveRes(url, "pen-and-ink/")},
        "/art/pixel/*": ({url}) => {return serveRes(url, "pixel")},
    },
    fetch(req){
        console.log(req.url)
        return new Response("no route assigned for this url", {status: 420})
    }
})