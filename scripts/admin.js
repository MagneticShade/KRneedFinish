"use strict"
import { safeGet,del,put,post } from "./requests.js"

let modal
let form
let closeBut
let docEntries =document.getElementById("entries")




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
    
    for (let key in tmp){
        row[row_num].textContent=tmp[key]
        row_num++
    }


}

function setupModal(text,func,id,elem) {

    let tpl=document.getElementById("dialog")
    let ins=tpl.content.cloneNode(true);
    document.querySelector('body').appendChild(ins)

    ins=null

    modal=document.getElementById("modal")
    form=modal.querySelector("form")
    closeBut=document.getElementById("close")

    let button=document.createElement("button")
    button.textContent=text
    button.setAttribute("id","confirm")
    button.setAttribute("type","submit")

    document.getElementById("buttons").prepend(button)

    button=null

    modal.addEventListener("submit",()=>{
        func(id,elem)
    })
    modal.addEventListener('close',function () {
        document.getElementById("modal").remove()
    })

    closeBut.addEventListener('click',function () {
        modal.close()
    })

    modal.showModal()


}

function setupModalInput() {
    let tpl=document.getElementById("prepedInputs")
    let ins=tpl.content.cloneNode(true);
    let backupImage=ins.querySelector("#backupImage")
    let image=ins.querySelector("#imageAdd");
    image.addEventListener("change",function(){
    
        backupImage=image.value
    })

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

            let input = modal.querySelectorAll("input")
            let row=tr.querySelectorAll('p')
            let backupImage=modal.querySelector('#backupImage')

            input[2].value = row[2].textContent
            input[0].value = row[3].textContent
            input[1].value = row[4].textContent
            input[3].value = row[5].textContent
            input[4].value = row[6].textContent
            

        })
        deleteButton.addEventListener('click',function () {

            setupModal("УДАЛИТЬ",remove,id,tr)



        })


    }
    nummerate()
}



document.getElementById("add").addEventListener("click",function () {
    setupModal("ДОБАВИТЬ",add,null,docEntries)
    setupModalInput()

})

 generate()


