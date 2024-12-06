let currentDriverIndex = 0;
const driversPerPage = 7;

async function mostrarPilotos() {
    const resultadoDiv = document.getElementById('resultado');
    const driverEndpoint = 'https://api.openf1.org/v1/drivers?session_key=latest';

    try {
        const response = await fetch(driverEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const driversData = await response.json();

        if (driversData && driversData.length > 0) {
            resultadoDiv.innerHTML = '';

            driversData.forEach(driver => {
                const driverDiv = document.createElement('div');
                driverDiv.classList.add('driver');

                driverDiv.innerHTML = `
                    <h2>${driver.full_name} (${driver.driver_number})</h2>
                    <p><strong>Nombre de transmisión:</strong> ${driver.broadcast_name}</p>
                    <p><strong>Código del país:</strong> ${driver.country_code}</p>
                    <p><strong>Primer nombre:</strong> ${driver.first_name}</p>
                    <p><strong>Apellido:</strong> ${driver.last_name}</p>
                    <p><strong>Equipo:</strong> ${driver.team_name}</p>
                    <p><strong>Color del equipo:</strong> #${driver.team_colour}</p>
                    <p><strong>Acrónimo del nombre:</strong> ${driver.name_acronym}</p>
                    <img src="${driver.headshot_url}" alt="Foto de ${driver.full_name}" style="width: 100px;">
                `;

                resultadoDiv.appendChild(driverDiv);
            });
        } else {
            resultadoDiv.innerHTML = 'No se encontraron datos de pilotos.';
        }
    } catch (error) {
        resultadoDiv.innerHTML = `Ocurrió un error: ${error.message}`;
    }
}

async function mostrarEstadisticasVueltas() {
    const resultadoDiv = document.getElementById('resultado');
    const driverEndpoint = 'https://api.openf1.org/v1/drivers?session_key=latest';
    const lapsEndpoint = 'https://api.openf1.org/v1/laps?session_key=latest&driver_number=';
    const carDataEndpoint = 'https://api.openf1.org/v1/car_data?session_key=latest&driver_number=';

    try {
        const response = await fetch(driverEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const driversData = await response.json();

        if (driversData && driversData.length > 0) {
            resultadoDiv.innerHTML = '';

            const driversToShow = driversData.slice(currentDriverIndex, currentDriverIndex + driversPerPage);

            for (const driver of driversToShow) {
                const driverNumber = driver.driver_number;

   
                const lapsResponse = await fetch(lapsEndpoint + driverNumber, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!lapsResponse.ok) {
                    throw new Error(`Error: ${lapsResponse.status}`);
                }

                const lapsData = await lapsResponse.json();

                let lapsInfo = '';

                if (lapsData && lapsData.length > 0) {
                    const firstLap = lapsData.find(lap => lap.lap_number === 1);
                    if (firstLap) {
                        lapsInfo = `
                            <p><strong>Lap ${firstLap.lap_number}</strong></p>
                            <p>Lap Duration: ${firstLap.lap_duration}s</p>
                            <p>Speed Trap: ${firstLap.st_speed} km/h</p>
                            <p>Pit Out Lap: ${firstLap.is_pit_out_lap ? 'Yes' : 'No'}</p>
                        `;
                    } else {
                        lapsInfo = '<p>No data available for Lap 1.</p>';
                    }
                } else {
                    lapsInfo = '<p>No laps data available.</p>';
                }

                const carResponse = await fetch(carDataEndpoint + driverNumber, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!carResponse.ok) {
                    throw new Error(`Error: ${carResponse.status}`);
                }

                const carData = await carResponse.json();

                let carInfo = '';

                if (carData && carData.length > 0) {
                    const car = carData[0]; // Tomar el primer conjunto de datos del carro
                    carInfo = `
                        <p><strong>RPM:</strong> ${car.rpm}</p>
                        <p><strong>Speed:</strong> ${car.speed} km/h</p>
                        <p><strong>Driver Number:</strong> ${car.driver_number}</p>
                    `;
                } else {
                    carInfo = '<p>No car data available.</p>';
                }

                const driverDiv = document.createElement('div');
                driverDiv.classList.add('driver');

                driverDiv.innerHTML = `
                    <h2>${driver.full_name} (${driver.driver_number})</h2>
                    <p><strong>Equipo:</strong> ${driver.team_name}</p>
                    <p><strong>País:</strong> ${driver.country_code}</p>
                    <img src="${driver.headshot_url}" alt="Foto de ${driver.full_name}" style="width: 100px;">
                    <div class="car">
                        ${carInfo}
                    </div>
                    <div class="laps">
                        ${lapsInfo}
                    </div>
                `;

                resultadoDiv.appendChild(driverDiv);
            }

            if (currentDriverIndex + driversPerPage < driversData.length) {
                const moreButton = document.createElement('button');
                moreButton.textContent = 'Cargar más pilotos';
                moreButton.onclick = () => {
                    currentDriverIndex += driversPerPage;
                    mostrarEstadisticasVueltas();
                };
                resultadoDiv.appendChild(moreButton);
            }
        } else {
            resultadoDiv.innerHTML = 'No se encontraron datos de pilotos.';
        }
    } catch (error) {
        resultadoDiv.innerHTML = `Ocurrió un error: ${error.message}`;
    }
}
