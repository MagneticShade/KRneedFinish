"use strict"
import { safeGet,del,put,post } from "./requests.js"

let modal=document.getElementById("modal")
let form=modal.querySelector("form")
let closeBut=document.getElementById("close")

modal.addEventListener('close',function () {
    document.getElementById("confirm").remove()
})

closeBut.addEventListener('click',function () {
    modal.close()
})

document.getElementById("add").addEventListener("click",function () {
    setupModal("ДОБАВИТЬ")
    setupModalInput()
})

function remove(id) {
console.log(del(id))
}

function add() {

}

function edit(id) {

    put(id,new FormData(form))

}

function setupModal(text,func,id) {
    let button=document.createElement("button")
    button.textContent=text
    button.setAttribute("id","confirm")
    button.setAttribute("type","submit")
    document.getElementById("buttons").prepend(button)
    modal.showModal()
    button.addEventListener("click",()=>{
        func(id)
    })
    button=null
}
function setupModalInput() {
    let tpl=document.getElementById("prepedInputs")
    let ins=tpl.content.cloneNode(true);

    document.getElementById("inputs").replaceChildren(...ins.childNodes)
}

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

 async function generate(){

    let entries = await safeGet()
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

        let update=document.createElement("button");
        let deleteButton = document.createElement("button");


        update.textContent="ОБНОВИТЬ";
        deleteButton.textContent="УДАЛИТЬ";


        delCell.appendChild(deleteButton);
        updateCell.appendChild(update);


        tr.appendChild(delCell);
        tr.appendChild(updateCell);


        docEntries.appendChild(tr)

        update.addEventListener('click',function () {

            setupModal("ОБНОВИТЬ",edit,id)
            setupModalInput()


        })
        deleteButton.addEventListener('click',function () {

            setupModal("УДАЛИТЬ",remove,id);



        })


    }
    nummerate()
}


 generate()

 document.getElementById("add").addEventListener('click',function () {

 })


