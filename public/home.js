


document.querySelectorAll("input").forEach(input => {
    input.addEventListener("click", function redirect_stand() {
        if (input.classList.contains("btn")) {
            localStorage.setItem('hometeam', input.classList[1]);
            localStorage.setItem('awayteam',input.classList[2]);
            localStorage.setItem('stadium',input.classList[3]);
            localStorage.setItem('stadium name',input.classList[4]);
            localStorage.setItem('matchid',input.classList[5]);
        }
    });
});

