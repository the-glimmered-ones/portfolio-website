var ART_STORE_URL = "https://y1srumwmhlmocc73.private.blob.vercel-storage.com/";
var path = "art/digital/1737988163229_image.png";
if (!document.URL.includes("portfolio-website/")){
   path = "/" + path
}
const img = document.getElementById("img")
img.setAttribute("src", path)
img.style.width = "max-content"
img.style.height = "max-content"
img.style.maxWidth = "500px"