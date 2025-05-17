const loginCtx = document.getElementById('loginChart').getContext('2d');
const vulnCtx = document.getElementById('vulnChart').getContext('2d');
const scanBtn = document.getElementById('scanBtn');
const scanStatus = document.getElementById('scanStatus');

const loginData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Login Attempts',
    data: [12, 19, 7, 14, 23, 10, 17],
    backgroundColor: 'rgba(255, 111, 97, 0.7)',
    borderColor: 'rgba(255, 111, 97, 1)',
    borderWidth: 1,
    fill: true,
    tension: 0.4,
  }]
};


const vulnData = {
  labels: ['SQL Injection', 'XSS', 'CSRF', 'Open Redirect', 'Other'],
  datasets: [{
    label: 'Vulnerabilities',
    data: [5, 7, 3, 2, 4],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF'
    ],
    hoverOffset: 30
  }]
};


const loginChart = new Chart(loginCtx, {
  type: 'line',
  data: loginData,
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});


const vulnChart = new Chart(vulnCtx, {
  type: 'pie',
  data: vulnData,
  options: {
    responsive: true,
  }
});


scanBtn.addEventListener('click', () => {
  scanBtn.disabled = true;
  scanStatus.textContent = 'Scanning...';

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    scanStatus.textContent = `Scanning... ${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      scanStatus.textContent = 'Scan Complete. No threats found.';
      scanBtn.disabled = false;

     
    }
  }, 300);
});
const alertsList = document.getElementById('alertsList');
const activeThreats = document.getElementById('activeThreats');


const fakeAlerts = [
  { message: 'Multiple failed login attempts detected', time: '2 min ago' },
  { message: 'Vulnerability CVE-2023-12345 patched', time: '10 min ago' },
  { message: 'New suspicious IP blocked', time: '30 min ago' },
  { message: 'Potential phishing email detected', time: '1 hour ago' },
  { message: 'Open port detected on server', time: '3 hours ago' },
];


function renderAlerts() {
  alertsList.innerHTML = '';
  fakeAlerts.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = `${alert.message} — ${alert.time}`;
    alertsList.appendChild(li);
  });
}


renderAlerts();


function updateActiveThreats() {
  activeThreats.textContent = Math.floor(Math.random() * 11);
}

updateActiveThreats();


const scanCard = scanBtn.parentElement;
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
const progressFill = document.createElement('div');
progressFill.classList.add('progress-fill');
progressBar.appendChild(progressFill);
scanCard.appendChild(progressBar);


scanBtn.addEventListener('click', () => {
  scanBtn.disabled = true;
  scanStatus.textContent = 'Scanning...';
  progressFill.style.width = '0%';

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    scanStatus.textContent = `Scanning... ${progress}%`;
    progressFill.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      scanStatus.textContent = 'Scan Complete. No threats found.';
      scanBtn.disabled = false;

     
      updateChartsData();

      
      updateActiveThreats();
      shuffleAlerts();
      renderAlerts();
    }
  }, 300);
});


function updateChartsData() {
  
  loginData.datasets[0].data = loginData.datasets[0].data.map(() => Math.floor(Math.random() * 30));
  loginChart.update();

  vulnData.datasets[0].data = vulnData.datasets[0].data.map(() => Math.floor(Math.random() * 10));
  vulnChart.update();
}


function shuffleAlerts() {
  for (let i = fakeAlerts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fakeAlerts[i], fakeAlerts[j]] = [fakeAlerts[j], fakeAlerts[i]];
  }
}
