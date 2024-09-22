'use client';
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import { sankey as d3Sankey, sankeyLinkHorizontal } from 'd3-sankey';
import Head from 'next/head';
import dayjs from 'dayjs'; 
import { useRedirectFunctions } from '@propelauth/react';

const FinanceDashboard = ({accessToken}) => {
    const [savingsGoal, setSavingsGoal] = useState(1000);
    const [savingsSaved, setSavingsSaved] = useState(750);
    const [budgetTotal, setBudgetTotal] = useState(2000);
    const [budgetSpent, setBudgetSpent] = useState(1500);
    const [financialNews, setFinancialNews] = useState([]);
    const [csvData, setCsvData] = useState([]); // State variable to store CSV data
    const sankeyRef = useRef(null);
    const [grade, setGrade] = useState(''); // Initial value
    const [score, setScore] = useState(0); // Initial value
    const [categoryStats, setCategoryStats] = useState({
        max: {},
        mean: {},
        median: {},
        mode: {},
        stdev: {},
      });
    const { redirectToLoginPage, redirectToAccountPage, redirectToSignupPage } = useRedirectFunctions();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [activeChart, setActiveChart] = useState('pie');
    
    // Create refs to store chart instances
    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);

    const [currentMonth, setCurrentMonth] = useState(dayjs());

    const handlePrevMonth = () => {
        setCurrentMonth(currentMonth.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentMonth(currentMonth.add(1, 'month'));
    };

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
      ];

      useEffect(() => {
        if (csvData.length > 0) {
            initializeSankeyDiagram(); // Initialize the Sankey diagram when CSV data is fetched
            
        }
    }, [csvData]);
  
      useEffect(() => {
        fetchFinancialNews();
        initializeCharts();
        fetchFinancialWelnessCsvData(selectedMonth);
        fetchParsedCsvData(selectedMonth);
        
      
        // Cleanup on unmount or re-render
        return () => {
          if (lineChartRef.current) lineChartRef.current.destroy();
          if (pieChartRef.current) pieChartRef.current.destroy();
        };
      }, [selectedMonth]);

      useEffect(() => {
        fetchParsedCsvData(currentMonth);
        fetchFinancialWelnessCsvData(currentMonth);
    }, [currentMonth]); // Re-fetch data when the month changes

      useEffect(() => {
        if (csvData.length > 0) {
            initializeCharts(); // Recreate charts when csvData changes
        }
    }, [csvData]);
    
  
    const fetchFinancialNews = async () => {
      const apiKey = '39b6227d22d1412aba53a23609de21f9'; // Replace with your NewsAPI key
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=finance&sortBy=publishedAt&apiKey=${apiKey}`
        );
        const data = await response.json();
        setFinancialNews(data.articles.slice(0, 8)); // Get up to 8 articles for carousel
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    const fetchParsedCsvData = async (month) => {
        try {
          const monthString = month.format('MMMM').toLowerCase(); // E.g., "january", "february"
          const response = await fetch('/api/parsed-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "month": monthString }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          setCsvData(data);
        } catch (error) {
          console.error('Error fetching parsed CSV data:', error);
        }
    };

    const fetchFinancialWelnessCsvData = async (month) => {
        try {
            
          const monthString = month.format('MMMM').toLowerCase(); // E.g., "january", "february"
          const response = await fetch('/api/financial-welness-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "month": monthString }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

            const data = await response.json();
            console.log(data)
            setGrade(data.grade);
            setScore(data.score);
            setCategoryStats({
                max: data.max,
                mean: data.mean,
                median: data.median,
                mode: data.mode,
                stdev: data.stdev,
            });
        } catch (error) {
          console.error('Error fetching parsed CSV data:', error);
        }
    };

    const initializeSankeyDiagram = () => {
        if (csvData.length === 0) return;
    
        // Step 1: Separate Income and Expenses
        const income = csvData.filter(item => item.Category === 'Income');
        const expenses = csvData.filter(item => item.Amount < 0); // Negative amounts indicate expenses
    
        // Step 2: Group expenses by category and sum their amounts
        const expenseCategories = [...new Set(expenses.map(item => item.Category))];
        
        // Aggregate the amounts by category
        const categoryTotals = expenses.reduce((acc, item) => {
            if (!acc[item.Category]) {
                acc[item.Category] = 0;
            }
            acc[item.Category] += Math.abs(item.Amount); // Convert to positive for visualization
            return acc;
        }, {});
    
        // Step 3: Create nodes and links for Sankey
        const nodes = [{ name: 'Income' }, ...expenseCategories.map(category => ({ name: category }))];
        const links = Object.entries(categoryTotals).map(([category, total]) => ({
            source: 0, // "Income" is always the source (index 0)
            target: expenseCategories.indexOf(category) + 1, // Target is the corresponding category
            value: total // The total amount spent in that category
        }));
    
        const sankeyData = { nodes, links };
    
        // Step 4: Set up the Sankey diagram
        const width = 200;
        const height = 200;
    
        const sankey = d3Sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 5]]);
    
        const { nodes: sankeyNodes, links: sankeyLinks } = sankey(sankeyData);
    
        const svg = d3.select(sankeyRef.current)
            .attr('width', width)
            .attr('height', height);
    
        svg.selectAll('*').remove(); // Clear previous elements
    
        // Append nodes
        svg.append('g')
            .selectAll('rect')
            .data(sankeyNodes)
            .enter()
            .append('rect')
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('height', d => d.y1 - d.y0)
            .attr('width', sankey.nodeWidth())
            .attr('fill', '#a9a9a9')
            .attr('stroke', '#000');
    
        // Append links
        svg.append('g')
            .selectAll('path')
            .data(sankeyLinks)
            .enter()
            .append('path')
            .attr('d', sankeyLinkHorizontal())
            .attr('stroke-width', d => Math.max(1, d.width))
            .attr('fill', 'none')
            .attr('stroke', '#a9a9a9')
            .attr('opacity', 0.5);
    
        // Add labels to the nodes
        svg.append('g')
            .selectAll('text')
            .data(sankeyNodes)
            .enter()
            .append('text')
            .attr('x', d => d.x0 - 6)
            .attr('y', d => (d.y1 + d.y0) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .text(d => d.name)
            .attr('fill', '#000');
    };
  
    const initializeCharts = () => {
         // Get the canvas elements
    const lineChartElement = document.getElementById('myChart');
    const pieChartElement = document.getElementById('expensePieChart');

    // Check if the canvas elements exist before proceeding
    if (!lineChartElement || !pieChartElement) {
        console.warn('One or more chart elements are not available in the DOM.');
        return; // If one or both charts don't exist, exit the function to avoid crashing
    }

    const lineChartCtx = lineChartElement.getContext('2d');
    const pieChartCtx = pieChartElement.getContext('2d');
    
        // Destroy previous chart instances if they exist
        if (lineChartRef.current) lineChartRef.current.destroy();
        if (pieChartRef.current) pieChartRef.current.destroy();
    
        // Create new chart instances and store them in the refs
        lineChartRef.current = new Chart(lineChartCtx, {
          type: 'line',
          data: {
            labels: csvData.map(item => item.Date), // Use Date field for labels
            datasets: [
              {
                label: 'Amount Over Time',
                data: csvData.map(item => item.Amount), // Use Amount field for data
                borderColor: '#28a745',
                fill: false,
                tension: 0.1,
              },
            ],
          },
        });

    // Filter out "Income" transactions
    const filteredData = csvData.filter(item => item.Category !== 'Income');

    // Aggregate data for the pie chart
    const categoryData = filteredData.reduce((acc, item) => {
        if (!acc[item.Category]) {
        acc[item.Category] = 0;
        }
        acc[item.Category] += item.Amount;
        return acc;
    }, {});

    pieChartRef.current = new Chart(pieChartCtx, {
        type: 'pie',
        data: {
        labels: Object.keys(categoryData), // Use Category field for labels
        datasets: [
            {
            data: Object.values(categoryData), // Use aggregated Amount for data
            backgroundColor: ['#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6c757d'],
            },
        ],
        },
    });
    };


  
    const handleSavingsSubmit = (e) => {
        e.preventDefault();
        const percentage = Math.min((savingsSaved / savingsGoal) * 100, 100).toFixed(2);
        document.getElementById('progressBarGoal').style.width = `${percentage}%`;
        document.getElementById('goalPercentage').textContent = `${percentage}% of your goal reached`;
      };
    
      const handleBudgetSubmit = (e) => {
        e.preventDefault();
        const percentage = Math.min((budgetSpent / budgetTotal) * 100, 100).toFixed(2);
        document.getElementById('progressBarBudget').style.width = `${percentage}%`;
        document.getElementById('budgetPercentage').textContent = `${percentage}% of your budget used`;
      };

      
      useEffect(() => {
    if (activeChart === 'sankey') {
      initializeSankeyDiagram();
    }
  }, [activeChart]);
    return (
    <div>
        <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dashboard - Personal Finance Tracker</title>
        <link rel="stylesheet" href="../style.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Head>
      {/* Navbar */}
      <header className="navbar sticky-top flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" style={{ color: '#347928' }} href="#">
          SpendWisely
        </a>
      </header>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" style={{ color: '#347928' }} href="#">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ color: '#347928' }} href="https://5085896.propelauthtest.com/account">
                    Settings
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ color: '#347928' }} href="/logout">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary" style={{ backgroundColor: '#347928', color: 'white' }}>
                    Share
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary" style={{ backgroundColor: '#347928', color: 'white' }}>
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Month Selector with Left/Right Arrows */}
            <div className="d-flex align-items-center">
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handlePrevMonth}
                  >
                    &larr;
                  </button>
                  <span className="mx-2">
                    {currentMonth.format('MMMM YYYY')}
                  </span>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handleNextMonth}
                  >
                    &rarr;
                  </button>
                </div>



            {/* News Cards Section
            <div id="newsCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
              <div className="carousel-inner" id="news-section">
                {financialNews.map((article, index) => (
                  <div key={index} className={`carousel-item news-card ${index === 0 ? 'active' : ''}`}>
                    <div className="card">
                      <img src={article.urlToImage} alt={article.title} />
                      <div className="card-body">
                        <h5 className="card-title">{article.title.slice(0, 50)}...</h5>
                        <p className="card-text">{article.description.slice(0, 100)}...</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: '#347928', color: 'white' }}>
                          Read Article
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#newsCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#newsCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div> */}

            {/* Line and Pie Charts Section */}
            <div className="row charts-section">
              <div className="col-md-8 chart-container">
                <div className="card card-custom p-3 mb-4">
                  <h5 className="card-title">Weekly Overview</h5>
                  <canvas id="myChart" width="600" height="300"></canvas>
                </div>
              </div>

              <div className="col-md-4 pie-container">
                <div className="card card-custom p-3 mb-4">
                  <h5 className="card-title">Expense Breakdown</h5>
                  <div className="btn-group mb-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveChart('pie')}>
                      Pie Chart
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setActiveChart('sankey')}>
                      Sankey Diagram
                    </button>
                  </div>
                  {activeChart === 'pie' && <canvas id="expensePieChart" width="300" height="300"></canvas>}
                  {activeChart === 'sankey' && <svg ref={sankeyRef} width="300" height="300"></svg>}
                </div>
              </div>
            </div>

            {/* Financial Wellness Grade and Report Section */}
            <div className="card card-custom p-3 mb-4">
                        <h5 className="card-title">Financial Wellness Report</h5>

                        {/* Display grade with dynamic colors */}
                        <p>
                            <strong style={{
                                fontSize: '24px',
                                color: (grade === 'A+' || grade === 'A' || grade === 'A-') ? 'green' :
                                    (grade === 'B+' || grade === 'B' || grade === 'B-') ? 'orange' :
                                    (grade === 'C+' || grade === 'C' || grade === 'C-') ? 'darkorange' :
                                    (grade === 'D+' || grade === 'D') ? 'red' : 'darkred'
                            }}>
                                Grade: {grade}
                            </strong>
                        </p>

                        {/* Display category statistics */}
                        <h6>Category Statistics:</h6>
                        <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Max</th>
                                            <th>Mean</th>
                                            <th>Median</th>
                                            <th>Mode</th>
                                            <th>Standard Deviation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {['Food', 'Housing', 'Miscellaneous', 'Transportation'].map((category) => (
                                            <tr key={category}>
                                                <td>{category}</td>
                                                <td>${categoryStats.max[category]}</td>
                                                <td>${categoryStats.mean[category]}</td>
                                                <td>${categoryStats.median[category]}</td>
                                                <td>${categoryStats.mode[category]}</td>
                                                <td>{categoryStats.stdev[category] !== null ? `$${categoryStats.stdev[category]}` : 'NaN'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                        <h6>Overall Financial Score:</h6>
                        <p><strong>Score: </strong>{score}</p>
                    </div>

            {/* CSV Data Table */}
            <div className="table-responsive">
        <table className="table table-striped">
            <thead>
            <tr>
                {csvData.length > 0 && Object.keys(csvData[0]).map((key) => (
                <th key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {csvData.map((row, index) => (
                <tr key={index}>
                {Object.values(row).map((value, i) => {
                    const roundedValue = typeof value === 'number' ? value.toFixed(2) : value;
                    return <td key={i}>{roundedValue}</td>;
                })}
                </tr>
            ))}
            </tbody>
        </table>
        </div>

            {/* Savings Goal and Budget Overview */}
            <div className="row mt-4">
              <div className="col-md-6">
                <SavingsGoalForm
                  savingsGoal={savingsGoal}
                  savingsSaved={savingsSaved}
                  setSavingsGoal={setSavingsGoal}
                  setSavingsSaved={setSavingsSaved}
                  onSubmit={handleSavingsSubmit}
                />
              </div>

              <div className="col-md-6">
                <BudgetForm
                  budgetTotal={budgetTotal}
                  budgetSpent={budgetSpent}
                  setBudgetTotal={setBudgetTotal}
                  setBudgetSpent={setBudgetSpent}
                  onSubmit={handleBudgetSubmit}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const SavingsGoalForm = ({ savingsGoal, savingsSaved, setSavingsGoal, setSavingsSaved, onSubmit }) => (
  <div className="card card-custom p-3 mb-4">
    <h5 className="card-title">Savings Goal</h5>
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label htmlFor="savingsGoal" className="form-label">
          Enter Goal:
        </label>
        <input type="number" id="savingsGoal" className="form-control" value={savingsGoal} onChange={(e) => setSavingsGoal(parseFloat(e.target.value))} />
      </div>
      <div className="mb-2">
        <label htmlFor="savingsSaved" className="form-label">
          Amount Saved:
        </label>
        <input type="number" id="savingsSaved" className="form-control" value={savingsSaved} onChange={(e) => setSavingsSaved(parseFloat(e.target.value))} />
      </div>
      <button type="submit" className="btn btn-submit">
        Update
      </button>
    </form>
    <div className="mt-2">
      <p className="card-text">Goal: <span id="displayGoal">${savingsGoal}</span></p>
      <p className="card-text">Saved: <span id="displaySaved">${savingsSaved}</span></p>
      <div className="progress mb-2">
        <div id="progressBarGoal" className="progress-bar" style={{ width: `${(savingsSaved / savingsGoal) * 100}%`, backgroundColor: '#347928' }} role="progressbar" aria-label="Savings Goal Progress"></div>
      </div>
      <p className="text-muted" id="goalPercentage">{Math.min((savingsSaved / savingsGoal) * 100, 100).toFixed(2)}% of your goal reached</p>
    </div>
  </div>
);

const BudgetForm = ({ budgetTotal, budgetSpent, setBudgetTotal, setBudgetSpent, onSubmit }) => (
  <div className="card card-custom p-3 mb-4">
    <h5 className="card-title">Budget Overview</h5>
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label htmlFor="budgetTotal" className="form-label">
          Enter Budget:
        </label>
        <input type="number" id="budgetTotal" className="form-control" value={budgetTotal} onChange={(e) => setBudgetTotal(parseFloat(e.target.value))} />
      </div>
      <div className="mb-2">
        <label htmlFor="budgetSpent" className="form-label">
          Amount Spent:
        </label>
        <input type="number" id="budgetSpent" className="form-control" value={budgetSpent} onChange={(e) => setBudgetSpent(parseFloat(e.target.value))} />
      </div>
      <button type="submit" className="btn btn-submit">
        Update
      </button>
    </form>
    <div className="mt-2">
      <p className="card-text">Budget: <span id="displayBudget">${budgetTotal}</span></p>
      <p className="card-text">Spent: <span id="displaySpent">${budgetSpent}</span></p>
      <div className="progress mb-2">
        <div id="progressBarBudget" className="progress-bar" style={{ width: `${(budgetSpent / budgetTotal) * 100}%`, backgroundColor: '#dc3545' }} role="progressbar" aria-label="Budget Progress"></div>
      </div>
      <p className="text-muted" id="budgetPercentage">{Math.min((budgetSpent / budgetTotal) * 100, 100).toFixed(2)}% of your budget used</p>
    </div>
  </div>
);

export default FinanceDashboard;