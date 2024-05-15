alert("hello");

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("click", function redirect_stand() {
        if (input.classList.contains("btn")) {
            localStorage.setItem('match_info', input.classList[1]);
        }
    });
});

