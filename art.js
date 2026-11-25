// art.ts
var fileName = "1737988163229_image.png";
var path = "art/digital/" + fileName;
if (!document.URL.includes("portfolio-website/")) {
  path = "/" + path;
}
var img = document.getElementById("img");
img.setAttribute("src", path);
img.style.width = "max-content";
img.style.height = "max-content";
img.style.maxWidth = "500px";
