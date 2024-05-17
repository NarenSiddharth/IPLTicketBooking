const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');


const makeres = document.querySelector("#kk");

var k = 0;


document.querySelector("#bck").addEventListener("click", function() {
    const stand1 = localStorage.getItem('stadium');

    if(stand1 == "stand1"){
      window.location.href = "stand1.html";
    }
    else if(stand1 == "stand"){
      window.location.href = "stand.html";
    }
   
});

const baseUrl = 'http://localhost:8081/rev'

async function post(e){

  e.preventDefault();
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats == null)
    {
      alert("Please select seats");
      return;
    }
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hometeam: localStorage.getItem('hometeam'),
      awayteam: localStorage.getItem('awayteam'),
      stadium: localStorage.getItem('stadium'),
      stand: localStorage.getItem('stand'),
      price: localStorage.getItem('price'),
      seats: JSON.parse(localStorage.getItem('selectedSeats'))


    })
  })

  window.location.href = "payment.html";
}


makeres.addEventListener("click", post)


   





let ticketPrice = +localStorage.getItem('price');

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) 
        {
          seat.classList.add('selected');
        }
      });
    }
  }
  

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  
    //copy selected seats into arr
    // map through array
    //return new array of indexes
  
    const selectedSeatsCount = selectedSeats.length;
  
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
  }

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
      e.target.classList.toggle('selected');
  
      updateSelectedCount();
    }
  });


  updateSelectedCount();