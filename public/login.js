document.querySelector("input[type='submit']").addEventListener("click", function(event) {
    
    event.preventDefault();

    
    var username = document.querySelector("input[name='username']").value;
    var password = document.querySelector("input[name='password']").value;

    
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    
    window.location.href = "home.html";
});
