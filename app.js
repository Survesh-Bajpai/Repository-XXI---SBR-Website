// Application Data
const appData = {
    stocks: [
        {
            symbol: "TCS",
            name: "Tata Consultancy Services",
            price: 3545.60,
            forward_pe: 23.2,
            forward_roe: 44.8,
            qvm: 2.186,
            sharpe: 0.42,
            beta: 0.85,
            sector: "IT Software"
        },
        {
            symbol: "HINDUNILVR",
            name: "Hindustan Unilever Ltd",
            price: 2485.60,
            forward_pe: 52.8,
            forward_roe: 88.5,
            qvm: 2.758,
            sharpe: 0.22,
            beta: 0.65,
            sector: "FMCG"
        },
        {
            symbol: "RELIANCE",
            name: "Reliance Industries Ltd",
            price: 2756.25,
            forward_pe: 26.6,
            forward_roe: 13.8,
            qvm: 0.788,
            sharpe: 0.01,
            beta: 0.68,
            sector: "Refineries"
        },
        {
            symbol: "HDFCBANK",
            name: "HDFC Bank Ltd",
            price: 1995.75,
            forward_pe: 8.4,
            forward_roe: 15.8,
            qvm: 1.165,
            sharpe: 0.16,
            beta: 1.50,
            sector: "Banks"
        },
        {
            symbol: "ICICIBANK",
            name: "ICICI Bank Ltd",
            price: 1456.30,
            forward_pe: 17.8,
            forward_roe: 16.9,
            qvm: 1.248,
            sharpe: 0.28,
            beta: 1.05,
            sector: "Banks"
        },
        {
            symbol: "BHARTIARTL",
            name: "Bharti Airtel Ltd",
            price: 1895.45,
            forward_pe: 32.5,
            forward_roe: 15.8,
            qvm: 1.156,
            sharpe: 0.08,
            beta: 0.78,
            sector: "Telecom Services"
        },
        {
            symbol: "INFY",
            name: "Infosys Ltd",
            price: 1625.80,
            forward_pe: 21.8,
            forward_roe: 29.8,
            qvm: 1.685,
            sharpe: 0.35,
            beta: 0.92,
            sector: "IT Software"
        },
        {
            symbol: "SBIN",
            name: "State Bank of India",
            price: 855.25,
            forward_pe: 13.8,
            forward_roe: 14.9,
            qvm: 1.124,
            sharpe: 0.18,
            beta: 1.25,
            sector: "Banks"
        },
        {
            symbol: "WIPRO",
            name: "Wipro Ltd",
            price: 515.75,
            forward_pe: 16.8,
            forward_roe: 15.8,
            qvm: 1.028,
            sharpe: 0.12,
            beta: 0.88,
            sector: "IT Software"
        },
        {
            symbol: "BAJFINANCE",
            name: "Bajaj Finance Ltd",
            price: 7985.30,
            forward_pe: 25.8,
            forward_roe: 24.5,
            qvm: 1.785,
            sharpe: 0.38,
            beta: 1.32,
            sector: "Financial Services"
        }
    ],
    courses: [
        {
            name: "Quant Expert Trader",
            sessions: 20,
            hours: 60,
            cost: 72000,
            difficulty: 7.5
        },
        {
            name: "Quant Expert Investor",
            sessions: 20,
            hours: 60,
            cost: 72000,
            difficulty: 7.8
        },
        {
            name: "AI Algo Trader",
            sessions: 10,
            hours: 30,
            cost: 36000,
            difficulty: 8.2
        },
        {
            name: "AI Algo Investor",
            sessions: 10,
            hours: 30,
            cost: 36000,
            difficulty: 8.5
        }
    ],
    certifications: [
        {
            name: "CFA Level 3",
            type: "US",
            difficulty: 8.3,
            cost: 100000,
            senior_salary: 100,
            roi_score: 8.1
        },
        {
            name: "NISM Series 15",
            type: "NISM",
            difficulty: 5.9,
            cost: 2000,
            senior_salary: 35,
            roi_score: 282.5
        },
        {
            name: "NISM Series 21B",
            type: "NISM",
            difficulty: 6.9,
            cost: 5000,
            senior_salary: 50,
            roi_score: 112.7
        },
        {
            name: "CMT Level 3",
            type: "US",
            difficulty: 7.3,
            cost: 85000,
            senior_salary: 50,
            roi_score: 6.0
        }
    ]
};

// Application State
let currentTheme = 'light';
let filteredStocks = [...appData.stocks];

// Utility Functions
function showNotification(message, type = 'info') {
    console.log(`Notification [${type}]: ${message}`);

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add to notifications container
    let container = document.getElementById('notifications');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notifications';
        container.className = 'notifications';
        document.body.appendChild(container);
    }

    container.appendChild(notification);

    // Add event listener for close button
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing static application...');

    try {
        initializeTheme();
        initializeNavigation();
        initializeStockGrid();
        initializePortfolioBuilder();
        initializeDCFCalculator();
        initializeROICalculator();
        initializeCareerPath();
        updateMetricCounters();
        initializeTabs();
        renderCourses();

        // Initialize charts after a short delay to ensure DOM is ready
        setTimeout(() => {
            try {
                if (typeof Chart !== 'undefined') {
                    initializeCharts();
                } else {
                    console.warn('Chart.js not loaded, charts will not be displayed');
                }
            } catch (error) {
                console.error('Error initializing charts:', error);
            }
        }, 500);

        console.log('Application initialized successfully');

    } catch (error) {
        console.error('Error during initialization:', error);
        showNotification('Application initialization failed', 'error');
    }
});

// Theme Management
function initializeTheme() {
    try {
        currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);

        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        themeToggle.addEventListener('click', toggleTheme);
        console.log('Theme initialized:', currentTheme);
    } catch (error) {
        console.error('Error initializing theme:', error);
    }
}

function toggleTheme() {
    try {
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
    } catch (error) {
        console.error('Error toggling theme:', error);
    }
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
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        } else {
            section.classList.remove('active');
            section.style.display = 'none';
        }
    });

    // Initialize section-specific functionality
    if (sectionId === 'quant') {
        setTimeout(() => {
            try {
                if (typeof Chart !== 'undefined') {
                    initializeCharts();
                }
                initializeTabs();
            } catch (error) {
                console.error('Error initializing quant section:', error);
            }
        }, 200);
    } else if (sectionId === 'education') {
        setTimeout(() => {
            try {
                initializeTabs();
            } catch (error) {
                console.error('Error initializing education section:', error);
            }
        }, 200);
    }

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Tabs Management
function initializeTabs() {
    console.log('Initializing tabs...');

    const researchTabs = document.querySelectorAll('.research-tabs .tab-btn');
    const educationTabs = document.querySelectorAll('.education-tabs .tab-btn');

    researchTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchResearchTab(tabId);

            // Update active state
            researchTabs.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    educationTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchEducationTab(tabId);

            // Update active state
            educationTabs.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function switchResearchTab(tabId) {
    document.querySelectorAll('#quant .tab-panel').forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });

    const targetPanel = document.getElementById(tabId);
    if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
    }
}

function switchEducationTab(tabId) {
    document.querySelectorAll('#education .tab-panel').forEach(panel => {
        panel.classList.remove('active');
        panel.style.display = 'none';
    });

    const targetPanel = document.getElementById(tabId);
    if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
    }
}

// Charts Initialization
function initializeCharts() {
    console.log('Initializing charts...');

    try {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }

        createHeroChart();
        createSectorBetaChart();
        createRiskReturnChart();
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

function createHeroChart() {
    const ctx = document.getElementById('heroChart');
    if (!ctx) {
        console.log('Hero chart canvas not found');
        return;
    }

    try {
        // Destroy existing chart if it exists
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        const isDark = currentTheme === 'dark';
        const textColor = isDark ? '#f5f5f5' : '#134252';

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
                        labels: {
                            color: textColor,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }
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

    try {
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
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColor,
                            maxRotation: 45
                        },
                        grid: {
                            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
        console.log('Sector beta chart created successfully');
    } catch (error) {
        console.error('Error creating sector beta chart:', error);
    }
}

function createRiskReturnChart() {
    const ctx = document.getElementById('riskReturnChart');
    if (!ctx) return;

    try {
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }

        const isDark = currentTheme === 'dark';
        const textColor = isDark ? '#f5f5f5' : '#134252';

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
                        labels: {
                            color: textColor
                        }
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
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Sharpe Ratio (Return)',
                            color: textColor
                        },
                        ticks: {
                            color: textColor
                        },
                        grid: {
                            color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                        }
                    }
                }
            }
        });
        console.log('Risk return chart created successfully');
    } catch (error) {
        console.error('Error creating risk return chart:', error);
    }
}

function updateChartsForTheme() {
    console.log('Updating charts for theme change');

    try {
        // Destroy existing charts and recreate with new theme
        Chart.getChart('heroChart')?.destroy();
        Chart.getChart('sectorBetaChart')?.destroy();
        Chart.getChart('riskReturnChart')?.destroy();

        setTimeout(initializeCharts, 100);
    } catch (error) {
        console.error('Error updating charts for theme:', error);
    }
}

// Stock Grid Management
function initializeStockGrid() {
    try {
        renderStockGrid();
        initializeFilters();
    } catch (error) {
        console.error('Error initializing stock grid:', error);
    }
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
                    <span class="metric-label">Forward PE</span>
                    <span class="metric-value">${stock.forward_pe}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Forward ROE</span>
                    <span class="metric-value">${stock.forward_roe}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">QVM Score</span>
                    <span class="metric-value qvm-${getQVMClass(stock.qvm)}">${stock.qvm.toFixed(3)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Beta</span>
                    <span class="metric-value">${stock.beta}</span>
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

    if (sectorFilter) {
        sectorFilter.addEventListener('change', applyFilters);
    }

    if (qvmFilter) {
        qvmFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const sectorFilter = document.getElementById('sectorFilter');
    const qvmFilter = document.getElementById('qvmFilter');

    let filtered = [...appData.stocks];

    if (sectorFilter && sectorFilter.value) {
        filtered = filtered.filter(stock => stock.sector === sectorFilter.value);
    }

    if (qvmFilter && qvmFilter.value) {
        const qvmValue = qvmFilter.value;
        if (qvmValue === 'high') {
            filtered = filtered.filter(stock => stock.qvm > 2.0);
        } else if (qvmValue === 'medium') {
            filtered = filtered.filter(stock => stock.qvm >= 1.0 && stock.qvm <= 2.0);
        } else if (qvmValue === 'low') {
            filtered = filtered.filter(stock => stock.qvm < 1.0);
        }
    }

    filteredStocks = filtered;
    renderStockGrid();
}

// Portfolio Builder
function initializePortfolioBuilder() {
    try {
        const peRange = document.getElementById('peRange');
        const roeRange = document.getElementById('roeRange');
        const betaRange = document.getElementById('betaRange');
        const filterBtn = document.getElementById('filterPortfolio');

        if (peRange) {
            peRange.addEventListener('input', updateRangeValue);
        }
        if (roeRange) {
            roeRange.addEventListener('input', updateRangeValue);
        }
        if (betaRange) {
            betaRange.addEventListener('input', updateRangeValue);
        }
        if (filterBtn) {
            filterBtn.addEventListener('click', buildPortfolio);
        }
    } catch (error) {
        console.error('Error initializing portfolio builder:', error);
    }
}

function updateRangeValue(e) {
    const rangeId = e.target.id;
    const valueId = rangeId.replace('Range', 'Value');
    const valueSpan = document.getElementById(valueId);
    if (valueSpan) {
        valueSpan.textContent = e.target.value;
    }
}

function buildPortfolio() {
    try {
        const peThreshold = parseFloat(document.getElementById('peRange').value);
        const roeThreshold = parseFloat(document.getElementById('roeRange').value);
        const betaThreshold = parseFloat(document.getElementById('betaRange').value);

        const portfolio = appData.stocks.filter(stock => 
            stock.forward_pe <= peThreshold && 
            stock.forward_roe >= roeThreshold && 
            stock.beta <= betaThreshold
        );

        renderPortfolio(portfolio);
        showNotification(`Portfolio filtered: ${portfolio.length} stocks found`, 'success');
    } catch (error) {
        console.error('Error building portfolio:', error);
        showNotification('Error building portfolio', 'error');
    }
}

function renderPortfolio(stocks) {
    const container = document.getElementById('portfolioStocks');
    if (!container) return;

    if (stocks.length === 0) {
        container.innerHTML = '<p>No stocks match the current criteria. Try adjusting the filters.</p>';
        return;
    }

    container.innerHTML = stocks.map(stock => `
        <div class="metric">
            <span class="metric-label">${stock.symbol} - ${stock.name}</span>
            <span class="metric-value qvm-${getQVMClass(stock.qvm)}">${stock.qvm.toFixed(3)}</span>
        </div>
    `).join('');
}

// DCF Calculator
function initializeDCFCalculator() {
    const calculateBtn = document.getElementById('calculateDCF');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateDCF);
    }
}

function calculateDCF() {
    try {
        const currentFCF = parseFloat(document.getElementById('currentFCF').value);
        const growthRate = parseFloat(document.getElementById('growthRate').value) / 100;
        const terminalGrowth = parseFloat(document.getElementById('terminalGrowth').value) / 100;
        const discountRate = parseFloat(document.getElementById('discountRate').value) / 100;
        const years = parseInt(document.getElementById('years').value);

        if (!currentFCF || !growthRate || !terminalGrowth || !discountRate || !years) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        let dcfValue = 0;
        let terminalFCF = currentFCF;

        // Calculate present value of projected cash flows
        for (let i = 1; i <= years; i++) {
            terminalFCF *= (1 + growthRate);
            const presentValue = terminalFCF / Math.pow(1 + discountRate, i);
            dcfValue += presentValue;
        }

        // Calculate terminal value
        const terminalValue = (terminalFCF * (1 + terminalGrowth)) / (discountRate - terminalGrowth);
        const presentTerminalValue = terminalValue / Math.pow(1 + discountRate, years);

        const totalValue = dcfValue + presentTerminalValue;

        // Display results
        const resultsDiv = document.getElementById('dcfResults');
        const enterpriseValue = document.getElementById('enterpriseValue');
        const intrinsicValue = document.getElementById('intrinsicValue');

        if (resultsDiv) resultsDiv.classList.remove('hidden');
        if (enterpriseValue) enterpriseValue.textContent = `₹${totalValue.toFixed(2)} Cr`;
        if (intrinsicValue) intrinsicValue.textContent = `₹${(totalValue * 10).toFixed(2)}`;

        showNotification('DCF calculation completed successfully', 'success');

    } catch (error) {
        console.error('Error calculating DCF:', error);
        showNotification('Error calculating DCF value', 'error');
    }
}

// ROI Calculator
function initializeROICalculator() {
    const calculateBtn = document.getElementById('calculateROI');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateROI);
    }
}

function calculateROI() {
    try {
        const currentSalary = parseFloat(document.getElementById('currentSalary').value);
        const targetCert = document.getElementById('targetCert').value;
        const experience = parseFloat(document.getElementById('experience').value);

        if (!currentSalary || !targetCert || !experience) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const cert = appData.certifications.find(c => {
            if (targetCert === 'cfa') return c.name.includes('CFA');
            if (targetCert === 'nism15') return c.name.includes('NISM Series 15');
            if (targetCert === 'nism21b') return c.name.includes('NISM Series 21B');
            if (targetCert === 'cmt') return c.name.includes('CMT');
            return false;
        });

        if (!cert) {
            showNotification('Certification not found', 'error');
            return;
        }

        const salaryIncrease = cert.senior_salary * (1 + experience * 0.1);
        const roiScore = (salaryIncrease - cert.cost / 100000) / (cert.cost / 100000) * 100;

        // Display results
        const resultsDiv = document.getElementById('roiResults');
        const salaryIncreaseSpan = document.getElementById('salaryIncrease');
        const roiScoreSpan = document.getElementById('roiScore');

        if (resultsDiv) resultsDiv.classList.remove('hidden');
        if (salaryIncreaseSpan) salaryIncreaseSpan.textContent = `${salaryIncrease.toFixed(1)}%`;
        if (roiScoreSpan) roiScoreSpan.textContent = `${roiScore.toFixed(1)}%`;

        showNotification('ROI calculation completed successfully', 'success');

    } catch (error) {
        console.error('Error calculating ROI:', error);
        showNotification('Error calculating ROI', 'error');
    }
}

// Career Path
function initializeCareerPath() {
    const pathOptions = document.querySelectorAll('.path-option');
    pathOptions.forEach(option => {
        option.addEventListener('click', () => {
            const path = option.dataset.path;
            showCareerRoadmap(path);
        });
    });
}

function showCareerRoadmap(path) {
    const roadmap = document.getElementById('careerRoadmap');
    const content = document.getElementById('roadmapContent');

    if (!roadmap || !content) return;

    const roadmaps = {
        trading: {
            title: 'Trading Career Path',
            steps: [
                'Start with Technical Analysis fundamentals',
                'Learn Risk Management principles',
                'Practice with paper trading',
                'Develop trading strategies',
                'Start with small capital',
                'Scale up gradually'
            ]
        },
        investment: {
            title: 'Investment Management Path',
            steps: [
                'Master Fundamental Analysis',
                'Learn Portfolio Theory',
                'Study Quantitative Methods',
                'Understand Risk Management',
                'Build investment process',
                'Manage client portfolios'
            ]
        },
        research: {
            title: 'Research Analyst Path',
            steps: [
                'Strong Financial Analysis skills',
                'Industry specialization',
                'Valuation expertise',
                'Report writing skills',
                'Communication abilities',
                'Continuous learning'
            ]
        }
    };

    const selectedRoadmap = roadmaps[path];
    if (selectedRoadmap) {
        content.innerHTML = `
            <h5>${selectedRoadmap.title}</h5>
            <ol>
                ${selectedRoadmap.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
        roadmap.classList.remove('hidden');
    }
}

// Render Courses
function renderCourses() {
    const container = document.getElementById('coursesGrid');
    if (!container) return;

    container.innerHTML = appData.courses.map(course => `
        <div class="course-card">
            <div class="course-header">
                <h3>${course.name}</h3>
                <div class="course-price">₹${course.cost.toLocaleString()}</div>
            </div>
            <div class="course-details">
                <div class="course-meta">
                    <span><i class="fas fa-calendar"></i> ${course.sessions} Sessions</span>
                    <span><i class="fas fa-clock"></i> ${course.hours} Hours</span>
                    <span><i class="fas fa-star"></i> Difficulty: ${course.difficulty}/10</span>
                </div>
                <button class="btn btn--primary btn--full-width">Contact for Enrollment</button>
            </div>
        </div>
    `).join('');
}

// Counter Animation
function updateMetricCounters() {
    const counters = document.querySelectorAll('.metric-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(current);
            }
        }, 50);
    };

    // Use Intersection Observer to start animation when element is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Add notification styles to head if they don't exist
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notifications {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        }

        .notification {
            background: var(--color-surface);
            border-left: 4px solid var(--color-primary);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-md);
            margin-bottom: 10px;
            max-width: 300px;
            animation: slideIn 0.3s ease-out;
        }

        .notification--error {
            border-left-color: var(--color-error);
        }

        .notification--success {
            border-left-color: var(--color-success);
        }

        .notification--warning {
            border-left-color: var(--color-warning);
        }

        .notification-content {
            padding: 12px 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .notification-close {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: var(--color-text-secondary);
            margin-left: 10px;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

console.log('Static app.js loaded successfully - no login/signup functionality');