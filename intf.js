        const regions = [
            { name: 'América del Norte', temp: 28, x: 20, y: 30 },
            { name: 'América del Sur', temp: 38, x: 30, y: 60 },
            { name: 'Europa', temp: 22, x: 50, y: 25 },
            { name: 'África', temp: 42, x: 52, y: 50 },
            { name: 'Asia', temp: 35, x: 70, y: 35 },
            { name: 'Oceanía', temp: 31, x: 80, y: 65 },
            { name: 'Medio Oriente', temp: 45, x: 60, y: 40 },
            { name: 'Siberia', temp: 18, x: 75, y: 20 }
        ];

        function getRiskClass(temp) {
            if (temp >= 35) return 'risk-high';
            if (temp >= 25) return 'risk-medium';
            return 'risk-low';
        }

        function initMap() {
            const mapContainer = document.getElementById('worldMap');
            
            regions.forEach(region => {
                const regionDiv = document.createElement('div');
                regionDiv.className = `region ${getRiskClass(region.temp)}`;
                regionDiv.style.left = `${region.x}%`;
                regionDiv.style.top = `${region.y}%`;
                regionDiv.innerHTML = `
                    <div class="temp-display">
                        <div class="temp-value">${region.temp}°C</div>
                        <div class="temp-label">${region.name}</div>
                    </div>
                `;
                
                regionDiv.addEventListener('click', () => {
                    alert(`${region.name}\nTemperatura: ${region.temp}°C\nNivel de Riesgo: ${region.temp >= 35 ? 'Alto' : region.temp >= 25 ? 'Medio' : 'Bajo'}`);
                });
                
                mapContainer.appendChild(regionDiv);
            });

            updateStats();
        }

        function updateStats() {
            const temps = regions.map(r => r.temp);
            const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
            const highRiskCount = temps.filter(t => t >= 35).length;

            document.getElementById('avgTemp').textContent = `${avgTemp}°C`;
            document.getElementById('highRisk').textContent = highRiskCount;
        }

        function updateTemperatures() {
            regions.forEach(region => {
                region.temp = Math.max(15, Math.min(50, region.temp + (Math.random() - 0.5) * 3));
            });

            const mapContainer = document.getElementById('worldMap');
            mapContainer.innerHTML = '';
            initMap();
        }

        setInterval(updateTemperatures, 5000);

        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
            e.target.reset();
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        initMap();