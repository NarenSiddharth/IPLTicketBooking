document.querySelector("input[type='submit']").addEventListener("click", function(event) {
    
    event.preventDefault();

    
    var username = document.querySelector("input[name='username']").value;
    var password = document.querySelector("input[name='password']").value;

    
    localStorage.setItem('lusername', username);
    localStorage.setItem('lpassword', password);

    
    window.location.href = "home.html";
});

const log= document.querySelector("input[type='submit']")
const baseUrl = 'http://localhost:8081/log'

async function post(e){

    e.preventDefault();
    
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({
        lusername: localStorage.getItem('lusername'),
        lpassword: localStorage.setItem('lpassword')
      })
    })
    
    .then(response=>{
        if (response.status === 200) {
            window.location.href = "index.html";
        } else if (response.status === 404) {
            alert("User does not exist");
        } else if (response.status === 401) {
            alert("Wrong username or password");
        } else {
            return response.text().then(text => { throw new Error(text); });
        }

    })

    
  }
  
  log.addEventListener("click", post)
