'use client'

import Image from "next/image";
import localFont from "next/font/local";
import React from "react";
import {useState} from "react";
import axios from "axios";
// import CanvasJSReact from '@canvasjs/react-charts';
import Head from 'next/head'; // Correct import for head
import { withAuthInfo, useLogoutFunction, useRedirectFunctions} from "@propelauth/react";


const SpendWise = ({ isLoggedIn, user }) => {
const { redirectToLoginPage, redirectToAccountPage, redirectToSignupPage } = useRedirectFunctions();
const logoutFn = useLogoutFunction();

  const handleLoginClick = () => {
    if (isLoggedIn) {
      window.location.href = '/dashboard';
    } else {
      redirectToLoginPage();
    }
  };

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SpendWisely - Personal Finance Tracker</title>
        <link rel="stylesheet" href="../style.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </Head>

      {/* Add horizontal spacing for all elements */}
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
              <span className="fs-4">SpendWisely</span>
            </a>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" style={{ color: 'black', fontSize: '20px' }} className="nav-link px-2 size">
                Home
              </a>
            </li>
            <li>
              <a href="#" style={{ color: 'black', fontSize: '20px' }} className="nav-link px-2">
                About
              </a>
            </li>
          </ul>

          <div className="col-md-3 text-end">
          <button type="button" onClick={handleLoginClick} className="btn btn-custom px-2">Login</button>
          <button type="button" onClick={() => redirectToSignupPage()} className="btn btn-custom px-2">Sign Up</button>
          </div>
        </header>

        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="./moneypro_mac_calendar.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="500"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-2 fw-bold text-body-emphasis lh-1 mb-5">Budget Everything!</h1>
            <p className="lead mt-3" style={{ color: '#347928' }}>
              BudgetWise is a simple-to-use web personal finance and budgeting application for users that would like to
              keep track of their daily finances on the go or while in front on their computer. The app helps with your
              day-to-day finances, savings goals, history and trends and more.
            </p>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: "url('https://myrepublica.nagariknetwork.com/uploads/media/1_20200105143841.jpg')",
                backgroundPosition: 'right',
                backgroundSize: '650px',
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style={{ color: 'black' }}>
                  Easily track your budget and spending habits.
                </h2>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: "url('https://usccu.org/wp-content/uploads/2024/05/The-Right-Age-to-Start-a-Savings-Account-for-Your-Child.png')",
                backgroundPosition: 'right',
                backgroundSize: '750px',
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style={{ color: 'white' }}>
                  Powerful reports to help you keep on top of your spending.
                </h3>
              </div>
            </div>
          </div>

          <div className="col">
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: "url('https://fortune.com/img-assets/wp-content/uploads/2024/07/GettyImages-467560629.jpg')",
                backgroundPosition: 'right',
                backgroundSize: '650px',
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h3 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" style={{ color: 'black' }}>
                  Better align your budget by gaining insights about areas where you overspend.
                </h3>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3"></ul>
          <p className="text-center text-body-secondary" style={{ color: '#32a873' }}>
            © 2024 SpendWise
          </p>
        </footer>
      </div>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default SpendWise;
