const API_URL = 'https://api.openf1.org/v1';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener los datos');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function loadDrivers() {
    const drivers = await fetchData(`${API_URL}/drivers`);
    const driver1Select = document.getElementById('driver1');
    const driver2Select = document.getElementById('driver2');

    driver1Select.innerHTML = '';
    driver2Select.innerHTML = '';

    drivers.forEach(driver => {
        const option1 = document.createElement('option');
        option1.value = driver.driver_number;
        option1.textContent = `${driver.first_name} ${driver.last_name}`;
        driver1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = driver.driver_number;
        option2.textContent = `${driver.first_name} ${driver.last_name}`;
        driver2Select.appendChild(option2);
    });
}

async function getDriverPositions(driverNumber, meetingKey) {
    return await fetchData(`${API_URL}/position?meeting_key=${meetingKey}&driver_number=${driverNumber}&position<=3`);
}

async function getDriverInfo(driverNumber, sessionKey) {
    return await fetchData(`${API_URL}/drivers?driver_number=${driverNumber}&session_key=${sessionKey}`);
}

function calculateAveragePosition(positions) {
    return positions.reduce((acc, pos) => acc + pos.position, 0) / positions.length;
}

async function compareDrivers() {
    const driver1Number = document.getElementById('driver1').value;
    const driver2Number = document.getElementById('driver2').value;
    const meetingKey = '1217';
    const sessionKey = '9158';

    const [driver1Positions, driver2Positions] = await Promise.all([
        getDriverPositions(driver1Number, meetingKey),
        getDriverPositions(driver2Number, meetingKey)
    ]);

    const [driver1Info, driver2Info] = await Promise.all([
        getDriverInfo(driver1Number, sessionKey),
        getDriverInfo(driver2Number, sessionKey)
    ]);

    if (!driver1Positions.length || !driver2Positions.length) {
        alert('No se encontraron posiciones para los conductores.');
        return;
    }

    const driver1AvgPosition = calculateAveragePosition(driver1Positions);
    const driver2AvgPosition = calculateAveragePosition(driver2Positions);

    const betterDriver = driver1AvgPosition < driver2AvgPosition ? driver1Info[0].full_name : driver2Info[0].full_name;

    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `
        <div>
            <h3>${driver1Info[0].full_name}</h3>
            <p>${driver1Positions.map(pos => `Posición: ${pos.position}, Fecha: ${pos.date}`).join('<br>')}</p>
            <p>Promedio de posiciones: ${driver1AvgPosition.toFixed(2)}</p>
        </div>
        <div>
            <h3>${driver2Info[0].full_name}</h3>
            <p>${driver2Positions.map(pos => `Posición: ${pos.position}, Fecha: ${pos.date}`).join('<br>')}</p>
            <p>Promedio de posiciones: ${driver2AvgPosition.toFixed(2)}</p>
        </div>
    `;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>El mejor conductor estadísticamente es: ${betterDriver}</h2>`;
}

window.onload = loadDrivers;
