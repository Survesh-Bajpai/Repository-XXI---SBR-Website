// Application Data
const appData = {
  stocks: [
    { symbol: "TCS", name: "Tata Consultancy Services", price: 3545.60, forward_pe: 23.2, forward_roe: 44.8, qvm: 2.186, sharpe: 0.42, beta: 0.85, sector: "IT Software" },
    { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", price: 2485.60, forward_pe: 52.8, forward_roe: 88.5, qvm: 2.758, sharpe: 0.22, beta: 0.65, sector: "FMCG" },
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2756.25, forward_pe: 26.6, forward_roe: 13.8, qvm: 0.788, sharpe: 0.01, beta: 0.68, sector: "Refineries" },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1995.75, forward_pe: 8.4, forward_roe: 15.8, qvm: 1.165, sharpe: 0.16, beta: 1.50, sector: "Banks" },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 1456.30, forward_pe: 17.8, forward_roe: 16.9, qvm: 1.248, sharpe: 0.28, beta: 1.05, sector: "Banks" },
    { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", price: 1895.45, forward_pe: 32.5, forward_roe: 15.8, qvm: 1.156, sharpe: 0.08, beta: 0.78, sector: "Telecom Services" },
    { symbol: "INFY", name: "Infosys Ltd", price: 1625.80, forward_pe: 21.8, forward_roe: 29.8, qvm: 1.685, sharpe: 0.35, beta: 0.92, sector: "IT Software" },
    { symbol: "SBIN", name: "State Bank of India", price: 855.25, forward_pe: 13.8, forward_roe: 14.9, qvm: 1.124, sharpe: 0.18, beta: 1.25, sector: "Banks" },
    { symbol: "WIPRO", name: "Wipro Ltd", price: 515.75, forward_pe: 16.8, forward_roe: 15.8, qvm: 1.028, sharpe: 0.12, beta: 0.88, sector: "IT Software" },
    { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", price: 7985.30, forward_pe: 25.8, forward_roe: 24.5, qvm: 1.785, sharpe: 0.38, beta: 1.32, sector: "Financial Services" }
  ],
  
  courses: [
    { name: "Quant Expert Trader", sessions: 20, hours: 60, cost: 72000, difficulty: 7.5 },
    { name: "Quant Expert Investor", sessions: 20, hours: 60, cost: 72000, difficulty: 7.8 },
    { name: "AI Algo Trader", sessions: 10, hours: 30, cost: 36000, difficulty: 8.2 },
    { name: "AI Algo Investor", sessions: 10, hours: 30, cost: 36000, difficulty: 8.5 }
  ],
  
  certifications: [
    { name: "CFA Level 3", type: "US", difficulty: 8.3, cost: 100000, senior_salary: 100, roi_score: 8.1 },
    { name: "NISM Series 15", type: "NISM", difficulty: 5.9, cost: 2000, senior_salary: 35, roi_score: 282.5 },
    { name: "NISM Series 21B", type: "NISM", difficulty: 6.9, cost: 5000, senior_salary: 50, roi_score: 112.7 },
    { name: "CMT Level 3", type: "US", difficulty: 7.3, cost: 85000, senior_salary: 50, roi_score: 6.0 }
  ]
};

// Application State
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentTheme = localStorage.getItem('theme') || 'light';
let filteredStocks = [...appData.stocks];
let isAuthMode = 'login';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing application...');
  initializeTheme();
  initializeAuth();
  initializeNavigation();
  initializeStockGrid();
  initializePortfolioBuilder();
  initializeDCFCalculator();
  initializeROICalculator();
  initializeCareerPath();
  initializeAnimations();
  updateMetricCounters();
  
  // Initialize charts after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeCharts();
  }, 500);
});

// Theme Management
function initializeTheme() {
  console.log('Setting theme to:', currentTheme);
  document.documentElement.setAttribute('data-color-scheme', currentTheme);
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('i');
  if (currentTheme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
  
  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  currentTheme = newTheme;
  
  console.log('Toggling theme to:', newTheme);
  document.documentElement.setAttribute('data-color-scheme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
  
  // Update charts for theme change
  setTimeout(updateChartsForTheme, 200);
  showNotification(`Switched to ${newTheme} theme`, 'success');
}

// Authentication
function initializeAuth() {
  const loginBtn = document.getElementById('loginBtn');
  const userMenu = document.getElementById('userMenu');
  const loginModal = document.getElementById('loginModal');
  const modalClose = document.getElementById('modalClose');
  const authForm = document.getElementById('authForm');
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (currentUser) {
    showUserMenu();
  }
  
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showModal('login');
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }
  
  if (authForm) {
    authForm.addEventListener('submit', handleAuth);
  }
  
  if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthMode('signup');
    });
  }
  
  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      switchAuthMode('login');
    });
  }
  
  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (e.target === loginModal) hideModal();
  });
}

function showModal(mode) {
  const modal = document.getElementById('loginModal');
  const title = document.getElementById('modalTitle');
  const submitBtn = document.getElementById('authSubmit');
  const signupElements = document.querySelectorAll('.signup-only');
  
  isAuthMode = mode;
  
  if (mode === 'signup') {
    title.textContent = 'Sign Up';
    submitBtn.textContent = 'Sign Up';
    signupElements.forEach(el => el.classList.remove('hidden'));
  } else {
    title.textContent = 'Login';
    submitBtn.textContent = 'Login';
    signupElements.forEach(el => el.classList.add('hidden'));
  }
  
  modal.classList.remove('hidden');
}

function hideModal() {
  const modal = document.getElementById('loginModal');
  modal.classList.add('hidden');
}

function switchAuthMode(mode) {
  showModal(mode);
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const fullName = document.getElementById('fullName').value;
  
  if (!email || !password) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  showLoadingSpinner();
  
  setTimeout(() => {
    if (isAuthMode === 'signup') {
      const user = { email, fullName: fullName || email.split('@')[0], joinedDate: new Date().toISOString() };
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      showNotification('Account created successfully!', 'success');
    } else {
      const user = { email, fullName: fullName || email.split('@')[0], loginDate: new Date().toISOString() };
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      showNotification('Login successful!', 'success');
    }
    
    hideLoadingSpinner();
    hideModal();
    showUserMenu();
    
    // Clear form
    document.getElementById('authForm').reset();
  }, 1000);
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  document.getElementById('loginBtn').classList.remove('hidden');
  document.getElementById('userMenu').classList.add('hidden');
  showNotification('Logged out successfully!', 'info');
}

function showUserMenu() {
  const username = document.getElementById('username');
  const loginBtn = document.getElementById('loginBtn');
  const userMenu = document.getElementById('userMenu');
  
  if (username && currentUser) {
    username.textContent = currentUser.fullName || currentUser.email.split('@')[0];
  }
  if (loginBtn) loginBtn.classList.add('hidden');
  if (userMenu) userMenu.classList.remove('hidden');
}

// Navigation
function initializeNavigation() {
  console.log('Initializing navigation...');
  const navItems = document.querySelectorAll('.nav-item');
  const heroActions = document.querySelectorAll('.hero-actions .btn');
  
  // Ensure home section is visible by default
  navigateToSection('home');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const section = item.dataset.section;
      console.log('Navigation clicked:', section);
      navigateToSection(section);
    });
  });
  
  heroActions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const section = btn.dataset.section;
      console.log('Hero action clicked:', section);
      if (section) navigateToSection(section);
    });
  });
}

function navigateToSection(sectionId) {
  console.log('Navigating to section:', sectionId);
  
  // Update navigation active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
  
  // Update sections visibility
  document.querySelectorAll('.section').forEach(section => {
    if (section.id === sectionId) {
      section.classList.add('active');
      section.style.display = 'block';
      console.log('Showing section:', sectionId);
    } else {
      section.classList.remove('active');
      section.style.display = 'none';
    }
  });
  
  // Initialize section-specific functionality
  if (sectionId === 'quant') {
    setTimeout(() => {
      initializeCharts();
      initializeTabs();
    }, 200);
  }
  
  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Charts Initialization
function initializeCharts() {
  console.log('Initializing charts...');
  createHeroChart();
  createSectorBetaChart();
  createRiskReturnChart();
}

function createHeroChart() {
  const ctx = document.getElementById('heroChart');
  if (!ctx) {
    console.log('Hero chart canvas not found');
    return;
  }
  
  // Destroy existing chart if it exists
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const isDark = currentTheme === 'dark';
  const textColor = isDark ? '#f5f5f5' : '#134252';
  
  try {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Portfolio Performance (%)',
          data: [100, 105, 103, 110, 115, 118],
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#1FB8CD',
          pointBorderColor: '#1FB8CD',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor, font: { size: 12 } }
          }
        },
        scales: {
          x: {
            ticks: { color: textColor },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          },
          y: {
            ticks: { color: textColor },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          }
        }
      }
    });
    console.log('Hero chart created successfully');
  } catch (error) {
    console.error('Error creating hero chart:', error);
  }
}

function createSectorBetaChart() {
  const ctx = document.getElementById('sectorBetaChart');
  if (!ctx) return;
  
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const sectors = [...new Set(appData.stocks.map(stock => stock.sector))];
  const betaData = sectors.map(sector => {
    const sectorStocks = appData.stocks.filter(stock => stock.sector === sector);
    return sectorStocks.reduce((sum, stock) => sum + stock.beta, 0) / sectorStocks.length;
  });
  
  const isDark = currentTheme === 'dark';
  const textColor = isDark ? '#f5f5f5' : '#134252';
  
  try {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sectors,
        datasets: [{
          label: 'Average Beta',
          data: betaData,
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
          borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor }
          }
        },
        scales: {
          x: {
            ticks: { color: textColor, maxRotation: 45 },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          },
          y: {
            ticks: { color: textColor },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error creating sector beta chart:', error);
  }
}

function createRiskReturnChart() {
  const ctx = document.getElementById('riskReturnChart');
  if (!ctx) return;
  
  const existingChart = Chart.getChart(ctx);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const isDark = currentTheme === 'dark';
  const textColor = isDark ? '#f5f5f5' : '#134252';
  
  try {
    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Stocks',
          data: appData.stocks.map(stock => ({
            x: stock.beta,
            y: stock.sharpe
          })),
          backgroundColor: '#1FB8CD',
          borderColor: '#1FB8CD',
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const stock = appData.stocks[context.dataIndex];
                return `${stock.symbol}: Beta ${stock.beta}, Sharpe ${stock.sharpe}`;
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Beta (Risk)',
              color: textColor
            },
            ticks: { color: textColor },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          },
          y: {
            title: {
              display: true,
              text: 'Sharpe Ratio (Return)',
              color: textColor
            },
            ticks: { color: textColor },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error creating risk return chart:', error);
  }
}

function updateChartsForTheme() {
  console.log('Updating charts for theme change');
  // Destroy existing charts and recreate with new theme
  Chart.getChart('heroChart')?.destroy();
  Chart.getChart('sectorBetaChart')?.destroy();
  Chart.getChart('riskReturnChart')?.destroy();
  
  setTimeout(initializeCharts, 100);
}

// Stock Grid Management
function initializeStockGrid() {
  renderStockGrid();
  initializeFilters();
}

function renderStockGrid() {
  const container = document.getElementById('stocksGrid');
  if (!container) return;
  
  container.innerHTML = filteredStocks.map(stock => `
    <div class="stock-card">
      <div class="stock-header">
        <div>
          <div class="stock-symbol">${stock.symbol}</div>
          <p class="stock-name">${stock.name}</p>
        </div>
        <div class="stock-price">₹${stock.price.toFixed(2)}</div>
      </div>
      <div class="stock-metrics">
        <div class="metric">
          <span class="metric-label">PE Ratio</span>
          <span class="metric-value">${stock.forward_pe}</span>
        </div>
        <div class="metric">
          <span class="metric-label">ROE</span>
          <span class="metric-value">${stock.forward_roe}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">QVM</span>
          <span class="metric-value qvm-${getQVMClass(stock.qvm)}">${stock.qvm.toFixed(3)}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Sharpe</span>
          <span class="metric-value">${stock.sharpe.toFixed(2)}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Beta</span>
          <span class="metric-value">${stock.beta.toFixed(2)}</span>
        </div>
        <div class="metric">
          <span class="metric-label">Sector</span>
          <span class="metric-value">${stock.sector}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function getQVMClass(qvm) {
  if (qvm > 2.0) return 'high';
  if (qvm > 1.0) return 'medium';
  return 'low';
}

function initializeFilters() {
  const sectorFilter = document.getElementById('sectorFilter');
  const qvmFilter = document.getElementById('qvmFilter');
  const searchStock = document.getElementById('searchStock');
  
  if (sectorFilter) {
    sectorFilter.addEventListener('change', applyFilters);
  }
  if (qvmFilter) {
    qvmFilter.addEventListener('change', applyFilters);
  }
  if (searchStock) {
    searchStock.addEventListener('input', applyFilters);
  }
}

function applyFilters() {
  const sectorFilter = document.getElementById('sectorFilter');
  const qvmFilter = document.getElementById('qvmFilter');
  const searchStock = document.getElementById('searchStock');
  
  if (!sectorFilter || !qvmFilter || !searchStock) return;
  
  const sectorValue = sectorFilter.value;
  const qvmValue = qvmFilter.value;
  const searchTerm = searchStock.value.toLowerCase();
  
  filteredStocks = appData.stocks.filter(stock => {
    const matchesSector = !sectorValue || stock.sector === sectorValue;
    const matchesQVM = !qvmValue || 
      (qvmValue === 'high' && stock.qvm > 2.0) ||
      (qvmValue === 'medium' && stock.qvm >= 1.0 && stock.qvm <= 2.0) ||
      (qvmValue === 'low' && stock.qvm < 1.0);
    const matchesSearch = !searchTerm || 
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.name.toLowerCase().includes(searchTerm);
    
    return matchesSector && matchesQVM && matchesSearch;
  });
  
  renderStockGrid();
  showNotification(`Found ${filteredStocks.length} stocks matching filters`, 'info');
}

// Tab Management
function initializeTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const container = btn.closest('.research-tabs, .education-tabs');
      const tabContent = container.nextElementSibling;
      const targetTab = btn.dataset.tab;
      
      // Update buttons
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update panels
      tabContent.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === targetTab);
      });
      
      // Initialize tab-specific functionality
      if (targetTab === 'sectors') {
        setTimeout(() => {
          Chart.getChart('sectorBetaChart')?.destroy();
          Chart.getChart('riskReturnChart')?.destroy();
          createSectorBetaChart();
          createRiskReturnChart();
        }, 100);
      }
    });
  });
}

// Portfolio Builder
function initializePortfolioBuilder() {
  const qvmRange = document.getElementById('qvmRange');
  const sharpeRange = document.getElementById('sharpeRange');
  const betaRange = document.getElementById('betaRange');
  
  if (!qvmRange) return;
  
  [qvmRange, sharpeRange, betaRange].forEach(range => {
    range.addEventListener('input', updatePortfolioFilter);
  });
  
  updatePortfolioFilter();
}

function updatePortfolioFilter() {
  const qvmRange = document.getElementById('qvmRange');
  const sharpeRange = document.getElementById('sharpeRange');
  const betaRange = document.getElementById('betaRange');
  
  if (!qvmRange || !sharpeRange || !betaRange) return;
  
  const qvmMin = parseFloat(qvmRange.value);
  const sharpeMin = parseFloat(sharpeRange.value);
  const betaMax = parseFloat(betaRange.value);
  
  // Update display values
  const qvmValue = document.getElementById('qvmValue');
  const sharpeValue = document.getElementById('sharpeValue');
  const betaValue = document.getElementById('betaValue');
  
  if (qvmValue) qvmValue.textContent = qvmMin.toFixed(1);
  if (sharpeValue) sharpeValue.textContent = sharpeMin.toFixed(2);
  if (betaValue) betaValue.textContent = betaMax.toFixed(2);
  
  // Filter stocks
  const portfolioStocks = appData.stocks.filter(stock => 
    stock.qvm >= qvmMin && stock.sharpe >= sharpeMin && stock.beta <= betaMax
  );
  
  const container = document.getElementById('portfolioStocks');
  if (container) {
    container.innerHTML = portfolioStocks.map(stock => `
      <div class="stock-item">
        <strong>${stock.symbol}</strong> - ${stock.name}
        <span class="stock-metrics">QVM: ${stock.qvm.toFixed(2)} | Sharpe: ${stock.sharpe.toFixed(2)} | Beta: ${stock.beta.toFixed(2)}</span>
      </div>
    `).join('');
  }
}

// DCF Calculator
function initializeDCFCalculator() {
  const calculateBtn = document.getElementById('calculateDCF');
  if (!calculateBtn) return;
  
  calculateBtn.addEventListener('click', calculateDCF);
}

function calculateDCF() {
  const fcfInput = document.getElementById('fcf');
  const growthRateInput = document.getElementById('growthRate');
  const terminalGrowthInput = document.getElementById('terminalGrowth');
  const discountRateInput = document.getElementById('discountRate');
  
  if (!fcfInput || !growthRateInput || !terminalGrowthInput || !discountRateInput) return;
  
  const fcf = parseFloat(fcfInput.value);
  const growthRate = parseFloat(growthRateInput.value) / 100;
  const terminalGrowth = parseFloat(terminalGrowthInput.value) / 100;
  const discountRate = parseFloat(discountRateInput.value) / 100;
  
  if (isNaN(fcf) || isNaN(growthRate) || isNaN(terminalGrowth) || isNaN(discountRate)) {
    showNotification('Please enter valid numbers for all fields', 'error');
    return;
  }
  
  let presentValue = 0;
  let projectedFCF = fcf;
  
  // Calculate 5-year DCF
  for (let year = 1; year <= 5; year++) {
    projectedFCF *= (1 + growthRate);
    presentValue += projectedFCF / Math.pow(1 + discountRate, year);
  }
  
  // Terminal value
  const terminalValue = (projectedFCF * (1 + terminalGrowth)) / (discountRate - terminalGrowth);
  const terminalPV = terminalValue / Math.pow(1 + discountRate, 5);
  
  const totalValue = presentValue + terminalPV;
  
  const resultsContainer = document.getElementById('dcfResults');
  if (resultsContainer) {
    resultsContainer.innerHTML = `
      <h4>DCF Valuation Results</h4>
      <div class="dcf-breakdown">
        <div class="result-item">
          <span>5-Year FCF Present Value:</span>
          <span>₹${presentValue.toFixed(2)} Cr</span>
        </div>
        <div class="result-item">
          <span>Terminal Value Present Value:</span>
          <span>₹${terminalPV.toFixed(2)} Cr</span>
        </div>
        <div class="result-item total">
          <span><strong>Total Enterprise Value:</strong></span>
          <span><strong>₹${totalValue.toFixed(2)} Cr</strong></span>
        </div>
      </div>
    `;
    
    showNotification('DCF calculation completed!', 'success');
  }
}

// ROI Calculator
function initializeROICalculator() {
  const calculateBtn = document.getElementById('calculateROI');
  if (!calculateBtn) return;
  
  calculateBtn.addEventListener('click', calculateROI);
}

function calculateROI() {
  const currentSalaryInput = document.getElementById('currentSalary');
  const certSelectInput = document.getElementById('certSelect');
  const roiYearsInput = document.getElementById('roiYears');
  
  if (!currentSalaryInput || !certSelectInput || !roiYearsInput) return;
  
  const currentSalary = parseFloat(currentSalaryInput.value);
  const certSelect = certSelectInput.value;
  const years = parseInt(roiYearsInput.value);
  
  const cert = appData.certifications.find(c => 
    c.name.toLowerCase().includes(certSelect) || 
    certSelect.includes(c.name.toLowerCase().split(' ')[0])
  );
  
  if (!cert) {
    showNotification('Certification not found', 'error');
    return;
  }
  
  const investmentCost = cert.cost / 100000; // Convert to lakhs
  const targetSalary = cert.senior_salary;
  const salaryIncrease = targetSalary - currentSalary;
  const totalGain = salaryIncrease * years;
  const roi = ((totalGain - investmentCost) / investmentCost) * 100;
  
  // Create ROI chart
  createROIChart(currentSalary, targetSalary, years, investmentCost);
  
  const resultsContainer = document.getElementById('roiResults');
  if (resultsContainer) {
    const summaryHTML = `
      <div class="roi-summary">
        <h4>ROI Analysis for ${cert.name}</h4>
        <div class="roi-metrics">
          <div class="roi-item">
            <span>Investment Cost:</span>
            <span>₹${investmentCost.toFixed(2)}L</span>
          </div>
          <div class="roi-item">
            <span>Salary Increase:</span>
            <span>₹${salaryIncrease.toFixed(1)}L per year</span>
          </div>
          <div class="roi-item">
            <span>Total ${years}-Year Gain:</span>
            <span>₹${totalGain.toFixed(1)}L</span>
          </div>
          <div class="roi-item total">
            <span><strong>ROI:</strong></span>
            <span><strong>${roi.toFixed(1)}%</strong></span>
          </div>
        </div>
      </div>
      <div class="chart-container" style="position: relative; height: 300px;">
        <canvas id="roiChart"></canvas>
      </div>
    `;
    
    resultsContainer.innerHTML = summaryHTML;
    
    // Create chart after DOM update
    setTimeout(() => createROIChart(currentSalary, targetSalary, years, investmentCost), 100);
    showNotification('ROI calculation completed!', 'success');
  }
}

function createROIChart(currentSalary, targetSalary, years, cost) {
  const ctx = document.getElementById('roiChart');
  if (!ctx) return;
  
  Chart.getChart('roiChart')?.destroy();
  
  const labels = Array.from({length: years + 1}, (_, i) => `Year ${i}`);
  const currentSalaryData = Array(years + 1).fill(currentSalary);
  const newSalaryData = [currentSalary - cost, ...Array(years).fill(targetSalary)];
  
  const isDark = currentTheme === 'dark';
  const textColor = isDark ? '#f5f5f5' : '#134252';
  
  try {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Without Certification',
            data: currentSalaryData,
            borderColor: '#B4413C',
            backgroundColor: 'rgba(180, 65, 60, 0.1)',
            tension: 0.1,
            fill: false
          },
          {
            label: 'With Certification',
            data: newSalaryData,
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            tension: 0.1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: textColor }
          }
        },
        scales: {
          x: {
            ticks: { color: textColor },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          },
          y: {
            title: {
              display: true,
              text: 'Salary (₹ Lakhs)',
              color: textColor
            },
            ticks: { color: textColor },
            grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error creating ROI chart:', error);
  }
}

// Career Path Simulator
function initializeCareerPath() {
  const pathOptions = document.querySelectorAll('.path-option');
  
  pathOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      const path = option.dataset.path;
      showCareerRoadmap(path);
      
      // Update selection
      pathOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
    });
  });
}

function showCareerRoadmap(pathType) {
  const container = document.getElementById('careerRoadmap');
  if (!container) return;
  
  const roadmaps = {
    trading: {
      title: 'Trading Career Path',
      steps: [
        { year: 'Year 1-2', role: 'Junior Trader', salary: '₹8-12L', certs: ['NISM Series 8', 'Technical Analysis'] },
        { year: 'Year 3-5', role: 'Trader', salary: '₹15-25L', certs: ['CMT Level 1-2', 'Risk Management'] },
        { year: 'Year 6-8', role: 'Senior Trader', salary: '₹30-50L', certs: ['CMT Level 3', 'Derivatives'] },
        { year: 'Year 9+', role: 'Trading Head', salary: '₹60L+', certs: ['Leadership', 'Portfolio Management'] }
      ]
    },
    investing: {
      title: 'Investment Management Path',
      steps: [
        { year: 'Year 1-2', role: 'Junior Analyst', salary: '₹6-10L', certs: ['NISM Series 15', 'Equity Research'] },
        { year: 'Year 3-5', role: 'Investment Analyst', salary: '₹12-20L', certs: ['CFA Level 1-2', 'Portfolio Theory'] },
        { year: 'Year 6-8', role: 'Portfolio Manager', salary: '₹25-40L', certs: ['CFA Level 3', 'NISM Series 19'] },
        { year: 'Year 9+', role: 'Fund Manager', salary: '₹50L+', certs: ['Investment Strategy', 'Risk Management'] }
      ]
    },
    research: {
      title: 'Research Analyst Path',
      steps: [
        { year: 'Year 1-2', role: 'Research Associate', salary: '₹5-8L', certs: ['NISM Series 15', 'Financial Modeling'] },
        { year: 'Year 3-5', role: 'Research Analyst', salary: '₹10-18L', certs: ['CFA Level 1-2', 'Sector Expertise'] },
        { year: 'Year 6-8', role: 'Senior Analyst', salary: '₹20-35L', certs: ['CFA Level 3', 'Advanced Analytics'] },
        { year: 'Year 9+', role: 'Research Head', salary: '₹40L+', certs: ['Leadership', 'Strategy Development'] }
      ]
    }
  };
  
  const roadmap = roadmaps[pathType];
  if (!roadmap) return;
  
  container.innerHTML = `
    <h3>${roadmap.title}</h3>
    <div class="career-timeline">
      ${roadmap.steps.map((step, index) => `
        <div class="timeline-item">
          <div class="timeline-marker">${index + 1}</div>
          <div class="timeline-content">
            <div class="timeline-year">${step.year}</div>
            <div class="timeline-role">${step.role}</div>
            <div class="timeline-salary">${step.salary}</div>
            <div class="timeline-certs">
              ${step.certs.map(cert => `<span class="cert-tag">${cert}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  showNotification(`Showing ${roadmap.title}`, 'info');
}

// Animations and Effects
function initializeAnimations() {
  // Add intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.feature-card, .metric-card, .course-card').forEach(el => {
    observer.observe(el);
  });
}

function updateMetricCounters() {
  const counters = document.querySelectorAll('.metric-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    if (isNaN(target)) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        counter.classList.add('counting');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Utility Functions
function showLoadingSpinner() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) spinner.classList.remove('hidden');
}

function hideLoadingSpinner() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) spinner.classList.add('hidden');
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };
  return icons[type] || 'info-circle';
}

// Course Enrollment
document.addEventListener('click', (e) => {
  if (e.target.textContent === 'Enroll Now' || e.target.textContent === 'Select Package') {
    e.preventDefault();
    
    if (!currentUser) {
      showModal('login');
      showNotification('Please login to enroll in courses', 'info');
      return;
    }
    
    const courseCard = e.target.closest('.course-card, .combo-card');
    const courseName = courseCard ? courseCard.querySelector('h3, h4').textContent : 'Course';
    
    showNotification(`Successfully enrolled in ${courseName}!`, 'success');
    
    // Store enrollment in localStorage
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push({
      course: courseName,
      date: new Date().toISOString(),
      user: currentUser.email
    });
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }
});

// Add notification styles dynamically
const notificationStyles = `
  .notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-16);
    box-shadow: var(--shadow-lg);
    z-index: 3000;
    opacity: 1;
    transition: opacity 0.3s ease;
    min-width: 300px;
  }
  
  .notification.success { border-left: 4px solid var(--color-success); }
  .notification.error { border-left: 4px solid var(--color-error); }
  .notification.warning { border-left: 4px solid var(--color-warning); }
  .notification.info { border-left: 4px solid var(--color-info); }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: var(--space-12);
  }
  
  .career-timeline {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }
  
  .timeline-item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-20);
  }
  
  .timeline-marker {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-primary);
    color: var(--color-btn-primary-text);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: var(--font-weight-bold);
    flex-shrink: 0;
  }
  
  .timeline-content {
    flex: 1;
    background: var(--color-bg-1);
    padding: var(--space-20);
    border-radius: var(--radius-lg);
  }
  
  .timeline-year {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-4);
  }
  
  .timeline-role {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--space-4);
  }
  
  .timeline-salary {
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
    margin-bottom: var(--space-12);
  }
  
  .timeline-certs {
    display: flex;
    gap: var(--space-8);
    flex-wrap: wrap;
  }
  
  .cert-tag {
    background: var(--color-secondary);
    padding: var(--space-4) var(--space-8);
    border-radius: var(--radius-base);
    font-size: var(--font-size-xs);
  }
  
  .dcf-breakdown {
    display: flex;
    flex-direction: column;
    gap: var(--space-12);
  }
  
  .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-8) 0;
    border-bottom: 1px solid var(--color-card-border-inner);
  }
  
  .result-item.total {
    border-top: 2px solid var(--color-primary);
    border-bottom: none;
    margin-top: var(--space-8);
    padding-top: var(--space-12);
  }
  
  .roi-summary {
    margin-bottom: var(--space-24);
  }
  
  .roi-metrics {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }
  
  .roi-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-8) 0;
    border-bottom: 1px solid var(--color-card-border-inner);
  }
  
  .roi-item.total {
    border-top: 2px solid var(--color-primary);
    border-bottom: none;
    margin-top: var(--space-8);
    padding-top: var(--space-12);
  }
  
  .stock-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding: var(--space-12);
    background: var(--color-bg-2);
    border-radius: var(--radius-base);
  }
  
  .stock-metrics {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
  
  .path-option.active {
    border-color: var(--color-primary);
    background: var(--color-bg-1);
  }
`;

// Add styles to head
if (!document.getElementById('dynamic-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'dynamic-styles';
  styleSheet.textContent = notificationStyles;
  document.head.appendChild(styleSheet);
}