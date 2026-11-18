document.body.innerHTML = 
`<nav>
    <a href="index.html" id="home"><h2>Home</h2></a>
    <a href="code.html" id="code"><h2>Code</h2></a>
    <a href="art.html" id="art"><h2>Art</h2></a>
    <a href="about.html" id="about"><h2>Who Am I?</h2></a>
</nav>`
+ document.body.innerHTML

console.log(document.URL)
const address = document.URL.substring(document.URL.indexOf("portfolio-website/")+"portfolio-website/".length)
console.log(address)