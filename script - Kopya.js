const searchForm = document.getElementById('flight-search-form');
const resultsContainer = document.getElementById('results');
const oneWayCheckbox = document.getElementById('one-way');
const returnDateInput = document.getElementById('return-date');

oneWayCheckbox.addEventListener('change', function() {
  returnDateInput.disabled = this.checked;
});
const roundTripFlights = [
    { type: 'round-trip', departure: 'IST', arrival: 'JFK', departureDate: '2023-09-01', arrivalDate: '2023-09-02', departureTime: '08:00', arrivalTime: '14:00', duration: '12h 0m' },
    { type: 'round-trip', departure: 'JFK', arrival: 'IST', departureDate: '2023-09-02', arrivalDate: '2023-09-03', departureTime: '15:00', arrivalTime: '21:00', duration: '12h 0m' },
    
    // ... Diğer gidiş-dönüş uçuş verileri ...
  ];
const oneWayFlights = [
    { type: 'one-way', departure: 'IST', arrival: 'JFK', departureDate: '2023-09-01', departureTime: '08:00', arrivalTime: '14:00', duration: '12h 0m' },
    { type: 'one-way', departure: 'ANK', arrival: 'LHR', departureDate: '2023-09-01', departureTime: '10:00', arrivalTime: '13:00', duration: '4h 0m' },
    { type: 'one-way', departure: 'CDG', arrival: 'LHR', departureDate: '2023-09-01', departureTime: '11:30', arrivalTime: '14:30', duration: '3h 0m' },
    { type: 'one-way', departure: 'LHR', arrival: 'CDG', departureDate: '2023-09-01', departureTime: '11:30', arrivalTime: '14:30', duration: '3h 0m' },
    // ... Diğer tek yönlü uçuş verileri ...
  ];
const allFlights = [
    { type: 'one-way', departure: 'IST', arrival: 'JFK', departureDate: '2023-09-01', departureTime: '08:00', arrivalTime: '14:00', duration: '12h 0m' },
    { type: 'one-way', departure: 'ANK', arrival: 'LHR', departureDate: '2023-09-01', departureTime: '10:00', arrivalTime: '13:00', duration: '4h 0m' },
    { type: 'one-way', departure: 'CDG', arrival: 'LHR', departureDate: '2023-09-01', departureTime: '11:30', arrivalTime: '14:30', duration: '3h 0m' },
    { type: 'one-way', departure: 'LHR', arrival: 'CDG', departureDate: '2023-09-01', departureTime: '11:30', arrivalTime: '14:30', duration: '3h 0m' },
    { type: 'round-trip', departure: 'IST', arrival: 'JFK', departureDate: '2023-09-01', arrivalDate: '2023-09-02', departureTime: '08:00', arrivalTime: '14:00', duration: '12h 0m' },
    { type: 'round-trip', departure: 'JFK', arrival: 'IST', departureDate: '2023-09-02', arrivalDate: '2023-09-03', departureTime: '15:00', arrivalTime: '21:00', duration: '12h 0m' },
];

displayResults(allFlights);

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const departureAirport = document.getElementById('departure').value;
  const arrivalAirport = document.getElementById('arrival').value;
  const departureDate = document.getElementById('departure-date').value;
  const returnDate = document.getElementById('return-date').value;

  displaySpinner(); // Spinnerı göster

  setTimeout(() => {


    let filteredFlights = allFlights.filter(flight =>
        (oneWayCheckbox.checked && flight.type === 'one-way') ||
        (!oneWayCheckbox.checked && flight.type === 'round-trip')
      );
  
      if (departureAirport) {
        filteredFlights = filteredFlights.filter(flight => flight.departure === departureAirport);
      }
    
      if (arrivalAirport) {
        filteredFlights = filteredFlights.filter(flight => flight.arrival === arrivalAirport);
      }
    
      if (departureDate) {
        filteredFlights = filteredFlights.filter(flight => flight.departureDate === departureDate);
      }
    
      if (!oneWayCheckbox.checked && returnDate) {
        filteredFlights = filteredFlights.filter(flight => flight.arrivalDate === returnDate);
      }
  

    hideSpinner(); // Spinnerı gizle
    displayResults(filteredFlights);
  }, 1700);
});

function displaySpinner() {
  const spinnerContainer = document.getElementById('spinner-container');
  spinnerContainer.style.display = 'block';
}

function hideSpinner() {
  const spinnerContainer = document.getElementById('spinner-container');
  spinnerContainer.style.display = 'none';
}

  let filteredFlights = allFlights.filter(flight =>
    (oneWayCheckbox.checked && flight.type === 'one-way') ||
    (!oneWayCheckbox.checked && flight.type === 'round-trip')
  );

  if (departureAirport) {
    filteredFlights = filteredFlights.filter(flight => flight.departure === departureAirport);
  }
  
  if (arrivalAirport) {
    filteredFlights = filteredFlights.filter(flight => flight.arrival === arrivalAirport);
  }
  
  if (departureDate) {
    filteredFlights = filteredFlights.filter(flight => flight.departureDate === departureDate);
  }
  
  if (!oneWayCheckbox.checked && returnDate) {
    filteredFlights = filteredFlights.filter(flight => flight.arrivalDate === returnDate);
  }

  displayResults(filteredFlights);
;

function displayResults(data) {
  resultsContainer.innerHTML = '';

  if (data.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'Uçuş bulunamadı.';
    resultsContainer.appendChild(noResultsMessage);
    return;
  }

  data.forEach(flight => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${flight.departure} - ${flight.arrival}</h2>
      <p>Kalkış Tarihi: ${flight.departureDate}</p>
      <p>Kalkış Saati: ${flight.departureTime}</p>
      <p>Varış Saati: ${flight.arrivalTime}</p>
      <p>Uçuş Süresi: ${flight.duration}</p>
      <p>Tip: ${flight.type === 'round-trip' ? 'Gidiş-Dönüş' : 'Tek Yön'}</p>
      <button class="details-button" onclick="toggleFlightDetails('${flight.departure}-${flight.arrival}')">Daha Fazla Detay</button>
      <div class="details" id="details-${flight.departure}-${flight.arrival}">
        <p>Havayolu: ${getRandomAirline()}</p>
        <p>Fiyat: ${getRandomPrice()} USD</p>
        <p>Detaylar: Uçuş detayları, bagaj politikası, vs. burada gösterilebilir.</p>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}

function toggleFlightDetails(id) {
  const detailsContainer = document.getElementById(`details-${id}`);
  detailsContainer.classList.toggle('active');
}

function getRandomAirline() {
  const airlines = ['Turkish Airlines', 'Emirates', 'Lufthansa', 'Delta Airlines', 'Qatar Airways'];
  const randomIndex = Math.floor(Math.random() * airlines.length);
  return airlines[randomIndex];
}

function getRandomPrice() {
  return Math.floor(Math.random() * 500) + 100;
}
