document.addEventListener('DOMContentLoaded', function() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '73e12fc717mshb9d1a02a698bc14p138f57jsne7fc0ec991f6',
            'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }
    };

    const resultsDiv = document.getElementById('results');

    function fetchAndDisplayRaces() {
        fetch('https://api-formula-1.p.rapidapi.com/races?season=2023', options)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = '';

                if (data.response && data.response.length > 0) {
                    const races = data.response.filter(race => race.type === "Race").sort((a, b) => new Date(a.date) - new Date(b.date));

                    if (races.length > 0) {
                        races.forEach(race => {
                            const raceInfo = `
                                <div class="race-card">
                                    <h2>${race.competition.name ? race.competition.name : 'Nombre no disponible'}</h2>
                                    <div class="race-card-content">
                                        <p>Nombre de la carrera: ${race.name ? race.name : 'No disponible'}</p>
                                        <p>Fecha: ${race.date ? new Date(race.date).toLocaleDateString() : 'Fecha no disponible'}</p>
                                        <p>Ubicación: ${race.circuit && race.circuit.location ? race.circuit.location : 'Ubicación no disponible'}</p>
                                        <p>País: ${race.circuit && race.circuit.country ? race.circuit.country : 'País no disponible'}</p>
                                    </div>
                                </div>
                            `;
                            resultsDiv.innerHTML += raceInfo;
                        });
                    } else {
                        resultsDiv.innerHTML = '<p>No se encontraron carreras de tipo "Race".</p>';
                    }
                } else {
                    resultsDiv.innerHTML = '<p>No se encontraron datos de carreras.</p>';
                }
            })
            .catch(err => {
                console.error('Error al obtener los datos de las carreras:', err);
                resultsDiv.innerHTML = '<p>Ocurrió un error al obtener los datos de las carreras. Revisa la consola para más detalles.</p>';
            });
    }

    fetchAndDisplayRaces();
});