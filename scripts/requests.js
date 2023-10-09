"use strict"

 function get() {
    return  fetch("../php/requests.php?"+new URLSearchParams({
        type:"GET"
    })).then(json=>{
        return json.json()
    })
 }

 function getSafe() {
    return  fetch("../php/requests.php",{
        method:"GET"
    }).then(json=>{
        return json.json()
    })
 }

 function del(id) {
     return fetch("../php/requests.php",{
        method:"DELETE",
        body:JSON.stringify({"id":id})
    })
 }

 function patch(formData) {
     return fetch("../php/requests.php", {
             method:"PATCH",
             body:JSON.stringify(formData)
         }
     )
 }

 function post(formData) {
     return fetch("../php/requests.php", {
         method:"POST",
         body:formData
         }
     )
 }


export { get,getSafe,del,patch,post }