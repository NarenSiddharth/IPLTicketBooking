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

    window.location.href = "login.html";
});
