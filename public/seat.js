const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const makeres = document.querySelector("#kk");

populateUI();

let ticketPrice = +localStorage.getItem('price');

function populateUI() {
    fetch('http://localhost:8081/seats')
        .then(response => response.json())
        .then(data => {
            data.seats.forEach((seat, index) => {
                if (seat.status === 'selected') {
                    seats[index].classList.add('selected');
                } else if (seat.status === 'occupied') {
                    seats[index].classList.add('occupied');
                }
            });
        });
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    localStorage.setItem('total price', selectedSeatsCount * ticketPrice);
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

makeres.addEventListener("click", post);

async function post(e) {
    e.preventDefault();
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats == null) {
        alert("Please select seats");
        return;
    }
    const res = await fetch('http://localhost:8081/rev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: localStorage.getItem('username'),
            match_id: localStorage.getItem('match_id'),
            stadium: localStorage.getItem('stadium_name'),
            stand: localStorage.getItem('stand'),
            seats: selectedSeats
        })
    });
    window.location.href = "payment.html";
}

updateSelectedCount();
