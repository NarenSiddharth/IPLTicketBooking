const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const makeres = document.querySelector("#kk");

populateUI();

let ticketPrice = +localStorage.getItem('price') || 100; // Default price if not set

// Populate UI with seats data from backend
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

// Update selected count and total
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    localStorage.setItem('totalPrice', selectedSeatsCount * ticketPrice);
}

// Function to update seat status on the backend
async function updateSeatStatus(seatIndex, status) {
    try {
        const response = await fetch('http://localhost:8081/seats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                seatIndex: seatIndex,
                status: status
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update seat status');
        }
    } catch (error) {
        console.error('Error updating seat status:', error);
    }
}

// Seat click event
container.addEventListener('click', async (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        const seatIndex = Array.from(seats).indexOf(e.target);
        e.target.classList.toggle('selected');

        // Update seat status on the backend
        await updateSeatStatus(seatIndex, e.target.classList.contains('selected') ? 'selected' : 'available');

        // Update selected count and total
        updateSelectedCount();
    }
});

// Post reservation data to backend
async function post(e) {
    e.preventDefault();
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (!selectedSeats || selectedSeats.length === 0) {
        alert("Please select seats");
        return;
    }

    const response = await fetch('http://localhost:8081/rev', {
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

makeres.addEventListener("click", post);

updateSelectedCount();
