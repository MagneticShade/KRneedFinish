"use strict"

 function get() {
    return  fetch("../php/requests/get.php?"+new URLSearchParams({
        type:"GET"
    })).then(json=>{
        return json.json()
    })
 }


function safeGet() {
    return  fetch("../php/requests/get.php?"+new URLSearchParams({
        type:"SAFEGET"
    })).then(json=>{
        return json.json()
    })
}


function del(id) {
     return  fetch("../php/requests/del.php?"+new URLSearchParams({
         id:id
     }))
 }

 function put(formData) {
     return  fetch("../php/requests/put.php",{
         method:'POST',
         body:formData
     }).then(json=>{
         return json.json()
     })
 }

 function post(formData) {
     return  fetch("../php/requests/post.php",{
         method:'POST',
         body:formData
     })
 }


export { get,safeGet,del,put,post }