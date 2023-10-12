"use strict"

 function get() {
    return  fetch("../php/requests.php?"+new URLSearchParams({
        type:"GET"
    })).then(json=>{
        return json.json()
    })
 }


function safeGet() {
    return  fetch("../php/requests.php?"+new URLSearchParams({
        type:"SAFEGET"
    })).then(json=>{
        return json.json()
    })
}


function del(id) {
     return  fetch("../php/requests.php?"+new URLSearchParams({
         type:"DEL",
         id:id
     })).then(json=>{
         return json.json()
     })
 }

 function put(id,formData) {
     return  fetch("../php/requests.php?"+new URLSearchParams({
         type:"PUT",
         id:id,
         data:formData
     }))
 }

 function post(formData) {
     return  fetch("../php/requests.php?"+new URLSearchParams({
         type:"POST",
         data:formData
     }))
 }


export { get,safeGet,del,put,post }