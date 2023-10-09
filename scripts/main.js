"use strict"
import { get } from "./requests.js"

async function start() {
    await generate()

    let modal=document.getElementById("modal")
    let images=document.querySelectorAll("td>img")

    for ( let img of images){
        img.addEventListener("click",function () {
            document.getElementById("fullSize").setAttribute("src",img.getAttribute("src"))
            document.getElementById("name").textContent=img.parentElement.parentElement.querySelector(".name").textContent
            modal.showModal()
        })
    }

    document.getElementById("closeModal").addEventListener("click",function(){
        modal.close()
    })
}

start()

async function generate(admin){


    let entries = await get()
    let docEntries =document.getElementById("entries");
    let tr = document.createElement("tr");
    let positionNumber = 1;
    for(let row of entries){

        let position = document.createElement("td");
        let image = document.createElement("td");
        let name = document.createElement("td");
        let birthdate = document.createElement("td");
        let date = document.createElement("td");

        let positionText = document.createElement("p");
        let nameText = document.createElement("p");
        let dateText = document.createElement("p");

        positionText.classList.add("position")
        nameText.classList.add("name")
        dateText.classList.add("date")

        positionText.textContent= String(positionNumber)
        nameText.textContent=row.name+" "+row.middlename+ " " + row.surname
        dateText.textContent=row.date

        position.appendChild(positionText)
        name.appendChild(nameText)
        date.appendChild(dateText)


        tr.appendChild(position)
        tr.appendChild(name)
        tr.appendChild(date)

        if (admin==true){
            let imageSrc=document.createElement("p");
            imageSrc.classList.add("img")
            imageSrc.textContent=row.path
            image.appendChild(imageSrc)

            let birthdateText=document.createElement("p")
            birthdateText.classList.add("birthdate")
            birthdateText.textContent=row.birthdate
            birthdate.appendChild(birthdateText)
            tr.appendChild(birthdate)
        }
        else{
            let imageImg=document.createElement("img");
            imageImg.classList.add("img")
            imageImg.setAttribute("src",row.path)
            image.appendChild(imageImg)
        }

        tr.appendChild(image)




        positionNumber++

    }
    docEntries.appendChild(tr)
}