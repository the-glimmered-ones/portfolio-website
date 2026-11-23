var hue = 0;
function changeColor(){
    const socials = <HTMLCollectionOf<HTMLElement>> document.getElementsByClassName("socials");
    hue ++
    if (hue % 360 == 0){
        hue = 0
    }
    const color = `hsl(${hue} 80% 75% / 25%)`
    console.log(color)
    for (let i of socials){
        i.style.backgroundColor = color
    }
}

addEventListener("load", () => {
    setInterval(changeColor, 15)
})