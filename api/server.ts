import index from "../index.html"
import code from "../code.html"
import art from "../art.html"
import about from "../about.html"
console.log("server file reached")
const HOST_NAME = "localhost"
const PORT = 2323
const ART_STORE_URL = "https://y1srumwmhlmocc73.private.blob.vercel-storage.com/"
console.log(PORT)

async function serveRes(url: string, subfolder: string = ""){
    let filePath = url.slice(url.indexOf(subfolder) + (subfolder).length)
    const foundTexture = new URL(ART_STORE_URL + subfolder + filePath)
    
    const token =
        await Bun.secrets.get({ service: "github", name: "BLOB_READ_WRITE_TOKEN" }) ||
        process.env.BLOB_READ_WRITE_TOKEN;
    console.log(token)
    const options = {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    };
    console.log(foundTexture.toString())
    if (foundTexture){
        return new Response(await (await Bun.fetch(foundTexture, options)).blob())
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
        
        "/digital-art/*": ({url}) => {return serveRes(url, "digital-art/")},
        "/pen-and-ink/*": ({url}) => {return serveRes(url, "pen-and-ink/")},
        "/pixel-art/*": ({url}) => {return serveRes(url, "pixel-art/")},
    },
    error(error) {
        return new Response(`Error: ${error.message}`, { status: 404 });
    },
})