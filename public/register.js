document.querySelector("button[type='submit']").addEventListener("click", function(event) {
    event.preventDefault();

    var name = document.querySelector("input[name='name']").value;
    var phone = document.querySelector("input[name='phone']").value;
    var email = document.querySelector("input[name='email']").value;
    var password = document.querySelector("input[name='password']").value;
    var confirmPassword = document.querySelector("input[name='confirm-password']").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem('name', name);
    localStorage.setItem('phone', phone);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

});

const regi= document.querySelector("button[type='submit']")
const baseUrl = 'http://localhost:8081/reg'

async function post(e){

    e.preventDefault();
    
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({
        username: localStorage.getItem('name'),
        phone: localStorage.getItem('phone'),
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password')
      })
    })
  
    window.location.href = "index.html";
  }
  
  regi.addEventListener("click", post)