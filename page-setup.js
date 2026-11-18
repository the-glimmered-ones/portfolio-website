if (!document.URL.includes(".html")){
    window.location.href = "index.html";
}

document.head.innerHTML = `
<link rel="icon" type="image/x-icon" href="favicon.ico">`
+ document.head.innerHTML
document.body.innerHTML = 
`<nav>
    <a href="index.html" id="index"><h2>Home</h2></a>
    <a href="code.html" id="code"><h2>Code</h2></a>
    <a href="art.html" id="art"><h2>Art</h2></a>
    <a href="about.html" id="about"><h2>Who Am I?</h2></a>
</nav>`
+ document.body.innerHTML

console.log(document.URL.indexOf("portfolio-website/"))
const address = document.URL.substring(document.URL.indexOf("portfolio-website/")+"portfolio-website/".length, document.URL.indexOf(".html"))
console.log(address)
const btn = document.getElementById(address);
btn.style.textDecoration = "underline solid 2px";
btn.style.color = "rgb(50, 224, 50)";
btn.style.backgroundColor = "black";