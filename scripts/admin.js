"use strict"
import { getSafe,del,patch,post } from "./requests.js"



 function nummerate() {
    let temp=document.querySelectorAll(".position")
    let posNumber=1
    if (temp.length>0){
        for (let pos of temp){
            pos.firstElementChild.textContent=String(posNumber)
            posNumber++
        }

    }
    else{
        let rows=document.querySelectorAll("#entries>tr")
        for (let row of rows){
            let cell=document.createElement("td")
            cell.classList.add("position")
            let cellText=document.createElement("p")
            cellText.textContent=String(posNumber)
            cell.prepend(cellText)
            row.prepend(cell)
            posNumber++
        }

    }
}

function remove(id) {
    console.log(del(id))
}

 async function generate(){

    let entries = await getSafe()
    let docEntries =document.getElementById("entries");


    for(let row of entries){
        let tr=document.createElement("tr")


        let id=row.id
        delete row.id

        for(let cell in row){
            let tmp=document.createElement("td");
            tmp.classList.add(`${cell}`)
            let text=document.createElement("p");
            text.textContent=row[cell]
            tmp.appendChild(text)
            tr.appendChild(tmp)

        }

        let delCell = document.createElement("td")
        let updateCell=document.createElement("td")

        let update=document.createElement("input");
        let deleteButton = document.createElement("input");



        update.setAttribute("type","button");
        deleteButton.setAttribute("type","button");

        update.value="ОБНОВИТЬ";
        deleteButton.value="УДАЛИТЬ";


        delCell.appendChild(deleteButton);
        updateCell.appendChild(update);


        tr.appendChild(delCell);
        tr.appendChild(updateCell);


        docEntries.appendChild(tr)

        update.addEventListener('click',function () {
            document.getElementById("modalDel").showModal()
            document.querySelector("#modalUpdate>form").action=`javascript:${patch(id)}`

        })
        deleteButton.addEventListener('click',function () {
            document.getElementById("modalDel").showModal()


        })


    }
    nummerate()
}


 generate()

 document.getElementById("add").addEventListener('click',function () {

 })


