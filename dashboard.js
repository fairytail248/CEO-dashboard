// Data
const data = {
    yearly: {
        labels: ['2023', '2024', '2025', '2026'],
        revenue: [800000, 1200000, 1600000, 2000000],
        profit: [200000, 400000, 600000, 800000]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        revenue: [120000, 115000, 125000, 118000, 122000, 116000],
        profit: [25000, 22000, 28000, 23000, 24000, 21000]
    },
    weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        revenue: [28000, 25000, 22000, 20000],
        profit: [-5000, -8000, -12000, -15000]
    }
};

// Initialize charts
let trendChart;
let expenseChart;

// Update KPI values based on timeframe
function updateKPIValues(timeframe) {
    const kpiData = {
        yearly: {
            revenue: '$2.0M',
            profit: '$800K',
            trend: '+40%',
            profitTrend: '+35%'
        },
        monthly: {
            revenue: '$116K',
            profit: '$21K',
            trend: '+5%',
            profitTrend: '+3%'
        },
        weekly: {
            revenue: '$20K',
            profit: '-$15K',
            trend: '-15%',
            profitTrend: '-25%'
        }
    };

    // Update KPI values
    document.querySelector('.kpi-card:nth-child(1) .kpi-value').textContent = kpiData[timeframe].revenue;
    document.querySelector('.kpi-card:nth-child(1) .kpi-trend span').textContent = kpiData[timeframe].trend;
    document.querySelector('.kpi-card:nth-child(2) .kpi-value').textContent = kpiData[timeframe].profit;
    document.querySelector('.kpi-card:nth-child(2) .kpi-trend span').textContent = kpiData[timeframe].profitTrend;

    // Update trend classes
    const revenueTrend = document.querySelector('.kpi-card:nth-child(1) .kpi-trend');
    const profitTrend = document.querySelector('.kpi-card:nth-child(2) .kpi-trend');

    if (timeframe === 'weekly') {
        revenueTrend.className = 'kpi-trend trend-down';
        profitTrend.className = 'kpi-trend trend-down';
    } else {
        revenueTrend.className = 'kpi-trend trend-up';
        profitTrend.className = 'kpi-trend trend-up';
    }
}

// Create trend chart
function createTrendChart(timeframe) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    if (trendChart) {
        trendChart.destroy();
    }

    // Update chart colors based on timeframe
    const colors = {
        yearly: {
            revenue: 'rgb(34, 197, 94)',
            profit: 'rgb(59, 130, 246)'
        },
        monthly: {
            revenue: 'rgb(234, 179, 8)',
            profit: 'rgb(168, 162, 158)'
        },
        weekly: {
            revenue: 'rgb(239, 68, 68)',
            profit: 'rgb(185, 28, 28)'
        }
    };

    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data[timeframe].labels,
            datasets: [
                {
                    label: 'Revenue',
                    data: data[timeframe].revenue,
                    borderColor: colors[timeframe].revenue,
                    tension: 0.1,
                    fill: false
                },
                {
                    label: 'Profit',
                    data: data[timeframe].profit,
                    borderColor: colors[timeframe].profit,
                    tension: 0.1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: timeframe.charAt(0).toUpperCase() + timeframe.slice(1) + ' Performance'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '$' + (Math.abs(value) / 1000).toLocaleString() + 'K'
                    }
                }
            },
            animations: {
                tension: {
                    duration: 1000,
                    easing: 'linear'
                }
            }
        }
    });
}

// Create expense chart
function createExpenseChart(timeframe) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    if (expenseChart) {
        expenseChart.destroy();
    }

    const expenseData = {
        yearly: [30, 25, 28, 17],
        monthly: [35, 20, 25, 20],
        weekly: [40, 15, 20, 25]
    };

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Operations', 'Marketing', 'Development', 'Admin'],
            datasets: [{
                data: expenseData[timeframe],
                backgroundColor: [
                    'rgb(239, 68, 68)',
                    'rgb(59, 130, 246)',
                    'rgb(34, 197, 94)',
                    'rgb(168, 162, 158)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: timeframe.charAt(0).toUpperCase() + timeframe.slice(1) + ' Expense Distribution'
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
}

// Initialize charts
document.addEventListener('DOMContentLoaded', () => {
    const timeframeSelect = document.getElementById('timeframeSelect');
    
    // Initial render
    createTrendChart('yearly');
    createExpenseChart('yearly');
    updateKPIValues('yearly');

    // Add event listener for timeframe selector
    timeframeSelect.addEventListener('change', (e) => {
        const timeframe = e.target.value;
        createTrendChart(timeframe);
        createExpenseChart(timeframe);
        updateKPIValues(timeframe);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    const timeframe = document.getElementById('timeframeSelect').value;
    if (trendChart) {
        trendChart.resize();
    }
    if (expenseChart) {
        expenseChart.resize();
    }
});