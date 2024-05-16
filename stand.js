
const stand = document.getElementById('stand1');
const price = document.getElementById('price');



document.querySelectorAll("path").forEach(path=>{
    path.addEventListener("click", function handlePathClick(){

        if(path.classList.contains("std")){
            stand.innerText = path.classList[0];
            price.innerText = path.classList[2];

        }
        
        localStorage.setItem("stand", path.classList[0]);
        localStorage.setItem("price", path.classList[2]);
        
    });
});






document.querySelector("#booktic").addEventListener("click", function() {  
    alert("Book Ticket");
});

var k = 0;






