document.addEventListener('DOMContentLoaded', function() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '73e12fc717mshb9d1a02a698bc14p138f57jsne7fc0ec991f6',
            'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com'
        }
    };

    fetch('https://api-formula-1.p.rapidapi.com/circuits', options)
        .then(response => response.json())
        .then(data => {
            console.log('Datos de pistas:', data); 

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.response && data.response.length > 0) {
                data.response.forEach(circuitData => {
                    const circuitInfo = `
                        <div class="circuit-card">
                            <h2>${circuitData.name}</h2>
                            <img src="${circuitData.image}" alt="${circuitData.name}" style="width:200px;">
                            <p>Ubicación: ${circuitData.location ? circuitData.location : 'No disponible'}</p>
                            <p>País: ${circuitData.country ? circuitData.country : 'No disponible'}</p>
                            <p>Longitud: ${circuitData.length ? circuitData.length + ' km' : 'No disponible'}</p>
                            <p>Vueltas: ${circuitData.laps ? circuitData.laps : 'No disponible'}</p>
                            <p>Capacidad: ${circuitData.capacity ? circuitData.capacity : 'No disponible'}</p>
                        </div>
                    `;
                    resultsDiv.innerHTML += circuitInfo;
                });
            } else {
                resultsDiv.innerHTML = '<p>No se encontraron datos de pistas.</p>';
            }
        })
        .catch(err => {
            console.error('Error al obtener los datos de las pistas:', err);
            document.getElementById('results').innerHTML = '<p>Ocurrió un error al obtener los datos de las pistas. Revisa la consola para más detalles.</p>';
        });
});
