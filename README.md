# SpendWisely

## PennAppsXXV

## Members:
Ali Ural: asu25@drexel.edu
Andrew Jiang: amj7925@nyu.edu
Ishan Vaish: vaish.ishan20@gmail.com

## Description
SpendWisely is a personal finance advisor that increases financial literacy and enables better decision-making for the individual. By ingesting users' financial transaction history, we present detailed statistical breakdowns and convert high-volume data into something that's simple and concise. We also offer personalized, AI-driven insight that combines macro-economic trends with user data and goals to empower their decision-making. Spend Wisely with us!

## Built With
- [PropelAuth](https://www.propelauth.com/): For user authentication and enhanced data privacy.
- [Defang](https://defang.io/): For seamless deployment and DevOps integration.
- [Next.js](https://nextjs.org/): React framework for building the user interface.
- [Flask](https://flask.palletsprojects.com/): Python web framework for the backend API.
- [Bootstrap](https://getbootstrap.com/): For responsive design and layout.
- [D3.js](https://d3js.org/): For creating interactive data visualizations, including the Sankey diagram.
- [Chart.js](https://www.chartjs.org/): For generating financial data charts.
- [NewsAPI](https://newsapi.org/): To fetch the latest financial news.

## Inspiration
In today's fast-paced world, managing finances effectively has become crucial for achieving financial security and independence. We were inspired to create SpendWisely after realizing how overwhelming it can be for individuals to track expenses, manage savings, and stay on top of their financial goals in one place. Our aim is to provide a user-friendly, customizable dashboard that not only displays essential financial information but also helps users make informed decisions by offering financial news and data in a simple, yet powerful interface.

## What it does
SpendWisely is a personal finance dashboard that helps users manage their budgets, track expenses, set savings goals, and monitor their overall financial health. 

## Key features:
- Account Balance Overview: Displays the current status of checking and savings accounts.
- Expense Breakdown: Engaging data visualizations that categorize user expenses like groceries, rent, utilities, entertainment, and more.
- Financial Wellness Report: Judges a user's transaction history based on our statistical algorithm and provides a score and a letter grade.
- Financial News: Provides up-to-date, scrollable news cards displaying the latest trends and developments in finance.
- Recent Transactions: Displays a quick list of recent financial transactions.
- Budget Overview: Monitors user budgets and expenses, offering a quick snapshot of how much is spent vs. the allocated budget.
- Savings Goal Tracker: Allows users to set and track their savings goals, showing progress with a dynamic progress bar.

## How we built it
We built SpendWisely using a combination of frontend technologies:
- Defang: Deployed project to cloud using Defang for seamless DevOps integration
- PropelAuth: Powered authorization and enhanced data privacy
- HTML/CSS: Structured and styled the user interface to make it clean and intuitive.
- Bootstrap: Used Bootstrap components to create a responsive layout with a modern, polished look, including the carousel for financial news and cards for budget/goal tracking.
- JavaScript: Implemented interactivity, including fetching and displaying financial news from the NewsAPI.
- Chart.js: Used to visualize user data through dynamic charts (line and pie charts) for expenses and budgeting.
- d3: Created Sankey diagram to visualize spending and user's financial flow.
- NewsAPI: Integrated the API to provide users with relevant and updated financial news.

## Challenges we ran into
We encountered several challenges along the way:
- UI Proportions: Ensuring the charts, cards, and other elements were proportionate and visually balanced on different screen sizes was tricky. The pie chart and line chart needed resizing and positioning to ensure they were both visually appealing and functional.
- News Carousel: Initially, the carousel displayed only one news card at a time. We had to modify the structure to display 4 cards at once and allow users to scroll between them while maintaining a responsive design.
- API Integration: Fetching and correctly displaying dynamic news data from the NewsAPI required troubleshooting, particularly when ensuring images and text aligned properly in the news cards.

## Accomplishments that we're proud of
We are proud of creating an interactive, visually appealing financial dashboard that is highly functional and user-centric. Key accomplishments include:
- Successfully integrating dynamic news content via NewsAPI.
- Building a fully responsive design that adapts seamlessly to different screen sizes.
- Implementing visual tools like charts to enhance user understanding of their finances.
- Providing users with a simplified yet robust way to track savings goals and expenses.

## What we learned
Throughout this project, we learned:
- The importance of responsive design and how to use CSS and Bootstrap efficiently to maintain consistency across devices.
- How to integrate third-party APIs (like NewsAPI) to provide real-time data and enhance the user experience.
- How to work with Chart.js to dynamically visualize data and give users a clearer view of their spending habits and financial goals.
- The value of user-centered design in financial applications, ensuring both functionality and ease of use.

## What's next for SpendWisely
We have many exciting ideas for the future of SpendWisely:
- User Authentication: Implement user accounts to allow for personalized dashboards and data persistence.
- Advanced Analytics: Add features like trend analysis and spending predictions based on historical data.
- Mobile App: Expand SpendWisely into a mobile app to allow users to manage their finances on the go.
- More Integrations: Integrate with banking APIs to automatically update transactions and balances in real-time.
- Goal Recommendation System: Suggest personalized financial goals based on user habits and spending history.

We’re excited to continue developing SpendWisely into a comprehensive financial management tool.

