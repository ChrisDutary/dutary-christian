const ModuloCandidatos = (function() {
    let candidatos = [];

    function actualizarUI() {
        const seccionCandidatos = document.getElementById('candidates-section');
        const seccionResultados = document.getElementById('results-section');
        
        seccionCandidatos.innerHTML = candidatos.map((candidato, indice) => `
            <div class="candidate-row">
                <div class="candidate-info">
                    <span>${candidato.name}</span>
                    <span class="candidate-color-indicator" style="background-color: ${candidato.color}"></span>
                </div>
                <span class="candidate-votes">${candidato.votes}</span>
                <div>
                    <button onclick="ModuloCandidatos.votar(${indice})">Votar</button>
                    <button onclick="ModuloCandidatos.borrarCandidato(${indice})">Eliminar</button>
                </div>
            </div>
        `).join('');

        const totalVotos = candidatos.reduce((suma, c) => suma + c.votes, 0);

        seccionResultados.innerHTML = `
            <div class="graph-container">
                ${candidatos.map(c => `
                    <div class="graph-bar" style="background-color: ${c.color}; width: ${totalVotos ? (c.votes / totalVotos * 100) : 0}%;">
                        ${totalVotos ? ((c.votes / totalVotos * 100).toFixed(1) + '%') : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    function agregarCandidato() {
        const nombre = document.getElementById('nombre').value;
        const color = document.getElementById('color').value;
        if (nombre && color) {
            candidatos.push({ name: nombre, color: color, votes: 0 });
            document.getElementById('nombre').value = '';
            document.getElementById('color').value = 'red';
            actualizarUI();
        } else {
            alert('Por favor, ingrese tanto el nombre como el color del candidato.');
        }
    }

    function votar(indice) {
        candidatos[indice].votes++;
        actualizarUI();
    }

    function borrarCandidato(indice) {
        candidatos.splice(indice, 1);
        actualizarUI();
    }

    document.getElementById('agregar-btn').addEventListener('click', agregarCandidato);
    actualizarUI();

    return {
        votar: votar,
        borrarCandidato: borrarCandidato
    };
})();
