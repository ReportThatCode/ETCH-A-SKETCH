
let color = "#000000"
let pixels = "20";
let mode = "pincel"

// btns Active 

const btnTools = document.querySelectorAll(".btn");
const pixelsChange = document.querySelectorAll(".pixels");
const containerPixels = document.querySelector("#container-draw")

function createPixels(){

  containerPixels.innerHTML = ""
    
  containerPixels.style.gridTemplateColumns=  `repeat(${pixels},1fr)`;
  containerPixels.style.gridTemplateRows=  `repeat(${pixels},1fr)`;

  const numberPixels = parseInt(pixels);
  const numberPotenciado = Math.round(numberPixels * numberPixels);
  console.log(numberPotenciado)
  for(let i = 0; i < numberPotenciado; i++){

    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    containerPixels.appendChild(pixel)
  }


}

createPixels();

function drawing(e){
   if(e.target.matches(".pixel")){

    if(mode === "pincel"){
        e.target.style.backgroundColor = color
    }
    else if(mode === "rainbow"){
        e.target.style.backgroundColor = rainbowColor();
    }
    else if(mode = "erase"){
        e.target.style.backgroundColor = "#f3f3f3"
    }


   }
}

function startDraw(){
    containerPixels.addEventListener("mouseover",drawing)
}

function stopDraw(){
    containerPixels.removeEventListener("mouseover",drawing)
}

function rainbowColor(){
    
    const caracteresHex = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += caracteresHex[Math.floor(Math.random() * 16)];
    }
    return color;
    
    
}
document.addEventListener("click",(e)=>{
    stopDraw()

    if(e.target.matches("#color")){
        
        btnTools.forEach(el => { el.classList.remove("active");})
        document.querySelector("#color-btn").classList.add("active")
        mode = "pincel"
    }

    if(e.target.matches(".pixel")){
        if(mode === "pincel"){
            e.target.style.backgroundColor = color
        }
        else if(mode === "rainbow"){
            e.target.style.backgroundColor = rainbowColor();
        }
        else if(mode = "erase"){
            e.target.style.backgroundColor = "#f3f3f3"
        }
        startDraw()
    }
    if(e.target.matches("#rainbow")){
        mode = "rainbow"
    }
    if(e.target.matches("#color-btn")){
        mode = "pincel"
    }
    if(e.target.matches("#erase")){
        mode = "erase"
    }


    if(e.target.matches("#clear")){
        
        setTimeout(()=>{
            e.target.classList.remove("active")
        },400)
        
        setTimeout(()=>{
            document.querySelector("#color-btn").classList.add("active")
            mode = "pincel"
            color = document.querySelector("#color").value
        },500)
        createPixels();
    }

    if(e.target.matches(".btn")){

        btnTools.forEach(el => {

            el.classList.remove("active");
    
            e.target.classList.add("active");

    
    })
  }


  if(e.target.matches(".pixels")){

    pixels = e.target.id;
    document.querySelector("#range").value = e.target.id 
    document.querySelector(".value-range").textContent = `${e.target.id }x${e.target.id}`
    pixelsChange.forEach(el => {

        el.classList.remove("activePixels");

        e.target.classList.add("activePixels");

    })  
    
    createPixels();
}

})

document.addEventListener("dblclick",(e)=>{
    if(e.target.matches(".pixel")){
        stopDraw();
    }
})

// Pick color
document.querySelector("#color").addEventListener("change",(e)=>{
    color = e.target.value;
})

// change size
document.querySelector("#range").addEventListener("input",(e)=>{
    pixels = e.target.value;
    document.querySelector(".value-range").textContent = `${e.target.value}x${e.target.value}`
    pixelsChange.forEach(el => el.classList.remove("activePixels"))
    createPixels()

})