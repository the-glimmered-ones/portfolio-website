if (!document.URL.includes(".html")){
    window.location.href = "index.html";
}

document.head.innerHTML = `
<link rel="icon" href="favicon.ico">`
+ document.head.innerHTML
document.body.innerHTML = 
`<nav>
    <a href="index.html" id="index"><h2>Home</h2></a>
    <a href="code.html" id="code"><h2>Code</h2></a>
    <a href="art.html" id="art"><h2>Art</h2></a>
    <a href="about.html" id="about"><h2>Who Am I?</h2></a>
</nav>`
+ document.body.innerHTML

const HOST_WEBSITE = "onrender.com/"
const LOCAL_WEBSITE = "portfolio-website/"
let startIndex = 0
if (document.URL.indexOf(HOST_WEBSITE) == -1){
    startIndex = document.URL.indexOf(LOCAL_WEBSITE)+LOCAL_WEBSITE.length
}
else {
    startIndex = document.URL.indexOf(HOST_WEBSITE)+HOST_WEBSITE.length
}
const address = document.URL.substring(startIndex, document.URL.indexOf(".html"))
console.log(address)
addEventListener("load", () => {
    const btn = document.getElementById(address);
    btn.style.textDecoration = "underline solid 2px";
    btn.style.color = "rgb(50, 224, 50)";
    btn.style.backgroundColor = "black";
})