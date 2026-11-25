var ART_STORE_URL = "https://y1srumwmhlmocc73.private.blob.vercel-storage.com/";
var fileName = ""//TODO: gitignore/secret list of filenames
var path = "art/digital/" + fileName;
if (!document.URL.includes("portfolio-website/")){
   path = "/" + path
}
const img = <HTMLImageElement>document.getElementById("img")
img.setAttribute("src", path)
img.style.width = "max-content"
img.style.height = "max-content"
img.style.maxWidth = "500px"