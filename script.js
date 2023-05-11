let areas
let moveingArea = {moveing : false, area : null, diffX : 0, diffY : 0}
function getArea(){
    areas = document.querySelectorAll("textarea")

    areas.forEach((textarea)=>{
        textarea.addEventListener('mousedown', (e)=>{
            let diffX = e.clientX - textarea.getBoundingClientRect().left
            let diffY = e.clientY - textarea.getBoundingClientRect().top
            if(0 <= diffY && diffY <= 30){
                e.preventDefault();
                textarea.blur()
                moveingArea.moveing = true
                moveingArea.area = textarea
                moveingArea.diffX = diffX
                moveingArea.diffY = diffY

                //最前面
                textarea.parentNode.appendChild(textarea)
            }
        });
    
        textarea.addEventListener("mouseup",()=>{
            moveingArea.moveing = false
        })
    
        textarea.addEventListener("mousemove",(e)=>{
            let diffY = e.clientY - textarea.getBoundingClientRect().top
            if(0 <= diffY && diffY <= 30){
                if(moveingArea.moveing === false){
                    textarea.style.cursor = "grab"
                }else{
                    textarea.style.cursor = "grabbing"
                }
            }else{
                textarea.style.cursor = "text"
            }
        })
    })
}

getArea()

addEventListener("mousemove",(e)=>{
    if(moveingArea.moveing === true){
        moveingArea.area.style.top = e.clientY - moveingArea.diffY
        moveingArea.area.style.left = e.clientX - moveingArea.diffX
    }
})

//trash
let trash = document.querySelector("#trash")
trash.addEventListener("mouseup",()=>{
    if(moveingArea.moveing === true){
        moveingArea.area.remove()
        moveingArea.moveing = false
    }
})


/*---- text area end ----*/

/* ---- control Panel ---- */
let colors = ["#fff","#ff00ff","#00ffff","#ffff00"]

function clickedTool(tool, ...data){
    console.log(tool)
    if(tool === "generate"){
        if(data){
            generateMemo({color:colors[data[0]]})
        }else{
            generateMemo({color : colors[Math.floor((Math.random() * colors.length))]})
        }
        getArea()
    }
}

/* ---- panel end ---- */




//Utility functions
function toggleFullscreen(){
    if(document.fullscreenElement){
        document.exitFullscreen()
    }else{
        document.documentElement.requestFullscreen()
    }
}

function generateMemo({color = null, x = 600, y = 320}={}){
    let can = document.querySelector("#canvas")
    let memo = document.createElement("textarea")
    memo.style.top = y
    memo.style.left = x
    memo.style.width = "260"
    memo.style.height = "220"
    if(color){
        memo.style.background = `${color}`
    }
    can.appendChild(memo)
}



//end functions