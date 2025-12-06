document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/dashboard')
        .then(response => response.json())
        .then(data => {
            const dashboardData = data;
            populateKPIs(dashboardData.kpis);
            populateHeader(dashboardData.site_name, dashboardData.date);
            populateOpenTicketsByDepartment(dashboardData.open_tickets_by_department);
            populateFuelInfo(dashboardData.fuel);
            renderMttrHistoryChart(dashboardData.mttr_history);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function populateHeader(siteName, date) {
    document.getElementById('site-name').textContent = siteName;
    document.getElementById('date').textContent = new Date(date).toLocaleDateString();
}

function populateKPIs(kpis) {
    document.getElementById('total-tickets').textContent = kpis.total_tickets;
    document.getElementById('open-tickets').textContent = kpis.open_tickets;
    document.getElementById('avg-resolution-time').textContent = kpis.avg_resolution_time_hours + 'h';
    document.getElementById('mttr').textContent = kpis.mttr_hours + 'h';
    document.getElementById('uptime').textContent = kpis.uptime_percent + '%';
}

function populateOpenTicketsByDepartment(departments) {
    const list = document.getElementById('open-tickets-by-department');
    list.innerHTML = '';
    departments.forEach(dep => {
        const item = document.createElement('li');
        item.innerHTML = `<span>${dep.department}</span><span>${dep.count}</span>`;
        list.appendChild(item);
    });
}

function populateFuelInfo(fuel) {
    document.getElementById('fuel-consumed').textContent = fuel.fuel_consumed_liters;
    document.getElementById('fuel-capacity').textContent = fuel.fuel_capacity_liters;
    document.getElementById('fuel-prediction').textContent = fuel.fuel_prediction_next_30_days_liters;
}

function renderMttrHistoryChart(mttrHistory) {
    const ctx = document.getElementById('mttr-history-chart').getContext('2d');
    const labels = mttrHistory.map(item => new Date(item.date).toLocaleDateString());
    const data = mttrHistory.map(item => item.mttr);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'MTTR',
                data: data,
                borderColor: 'rgba(42, 207, 55, 1)',
                backgroundColor: 'rgba(221, 101, 32, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
