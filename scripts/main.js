"use strict"

let modal=document.getElementById("modal")
async function generate(){
    let entries 

   await fetch("../php/requests.php?"+new URLSearchParams({
        type:"GET"
    })).then(result=>{
      return result.json()
    }).then(json=>{
         entries=json
    })

    let docEntries=document.getElementById("entries");
    let tr=document.createElement("tr");
    for(let row of entries){
       
        let position=document.createElement("td");
        let image=document.createElement("td");
        let name=document.createElement("td");
        let birhdate=document.createElement("td");
        let date=document.createElement("td");

        let positionText=document.createElement("p");
        let imageImg=document.createElement("img");
        let nameText=document.createElement("p");
        let birhdateText=document.createElement("p");
        let dateText=document.createElement("p");
        
        positionText.textContent=row.position
        imageImg.setAttribute("src",row.path)
        nameText.textContent=row.name
        birhdateText.textContent=row.birhdate
        dateText.textContent=row.date

        position.appendChild(positionText);
        image.appendChild(imageImg)
        name.appendChild(nameText)
        birhdate.appendChild(birhdateText)
        date.appendChild(dateText)

        tr.appendChild(position)
        tr.appendChild(image)
        tr.appendChild(name)
        tr.appendChild(birhdate)
        tr.appendChild(date)

        image.addEventListener("click",function(){
            document.getElementById("fullSize").setAttribute("src",row.path)
            document.getElementById("name").textContent=row.name
            modal.showModal()

        })
    }
    docEntries.appendChild(tr)
}
generate();

document.getElementById("closeModal").addEventListener("click",function(){

    modal.close()
})