"use strict"
import { safeGet,del,put,post } from "./requests.js"

let modal=document.getElementById("modal")
let form=modal.querySelector("form")
let closeBut=document.getElementById("close")
let docEntries =document.getElementById("entries");




function remove(id,elem) {
    del(id)
    elem.remove()
    nummerate()
}

async function add(id,elem) {
    let formdata= new FormData(form)
    await post(formdata)
    generate()
}

async function edit(id,elem) {
    let formdata=new FormData(form)
    formdata.append("id",String(id))
    let tmp=await put(formdata)
    let row=elem.querySelectorAll('p')
    let row_num=2;
    console.log(tmp)
    for (let key in tmp){
        row[row_num].textContent=tmp[key]
        row_num++
    }


}

function setupModal(text,func,id,elem) {
    let button=document.createElement("button")
    button.textContent=text
    button.setAttribute("id","confirm")
    button.setAttribute("type","submit")
    document.getElementById("buttons").prepend(button)
    modal.showModal()
    button.addEventListener("click",()=>{
        func(id,elem)
    })
    button=null
}

function setupModalInput() {
    let tpl=document.getElementById("prepedInputs")
    let ins=tpl.content.cloneNode(true);

    document.getElementById("inputs").replaceChildren(...ins.childNodes)
}

 function nummerate() {
     let temp = document.querySelectorAll(".position")
     let row_number = document.querySelectorAll("tr")
     let posNumber = 1
     if (temp.length == row_number.length) {
         for (let pos of temp) {
             pos.firstElementChild.textContent = String(posNumber)
             posNumber++
         }

     } else {
         let rows = document.querySelectorAll("#entries>tr")
         if (temp > 0)
             temp.map(x => x.remove())
         for (let row of rows) {
             let cell = document.createElement("td")
             cell.classList.add("position")
             let cellText = document.createElement("p")
             cellText.textContent = String(posNumber)
             cell.prepend(cellText)
             row.prepend(cell)
             posNumber++
         }

     }
 }

 async function generate(){
     docEntries.replaceChildren("")
    let entries = await safeGet()


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

            setupModal("ОБНОВИТЬ",edit,id,tr)
            setupModalInput()


        })
        deleteButton.addEventListener('click',function () {

            setupModal("УДАЛИТЬ",remove,id,tr)



        })


    }
    nummerate()
}

modal.addEventListener('close',function () {
    document.getElementById("confirm").remove()
})

closeBut.addEventListener('click',function () {
    modal.close()
})

document.getElementById("add").addEventListener("click",function () {
    setupModal("ДОБАВИТЬ",add,null,docEntries)
    setupModalInput()

})

 generate()


