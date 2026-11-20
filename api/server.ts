import page from "../index.html"
console.log("server file reached")
const HOST_NAME = "localhost"
const PORT = 2323
const ART_STORE_URL = "https://y1srumwmhlmocc73.private.blob.vercel-storage.com/"


async function serveRes(url: string, subfolder: string = ""){
    let filePath = url.slice(url.indexOf(subfolder) + (subfolder).length)
    const foundTexture = new URL(ART_STORE_URL + subfolder + filePath)
    console.log(foundTexture)
    if (foundTexture){
        return new Response(await (await Bun.fetch(foundTexture)).blob())
    }
    else{
        return new Response("404 not found")
    }
}

const server = Bun.serve({
    port: PORT,
    hostname: HOST_NAME,
    routes: {
        "/": page,
        "/digital-art/": ({url}) => {return serveRes(url, "digital-art/")},
        "/pen-and-ink/*": ({url}) => {return serveRes(url, "pen-and-ink/")},
        "/pixel-art/*": ({url}) => {return serveRes(url, "pixel-art/")},
    },
    error(error) {
        return new Response(`Error: ${error.message}`, { status: 404 });
    },
})