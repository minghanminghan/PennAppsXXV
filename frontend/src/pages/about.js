'use client';

import React from "react";
import Head from 'next/head'; // Correct import for head

const About = () => {

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

        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
          <div className="container flex justify-center mx-auto pt-12">
            <div>
              <h1 className="xl:text-4xl text-3xl text-center text-black dark:text-white font-semibold pb-6 sm:w-4/6 w-5/6 mx-auto">
                The Talent Behind SpendWisely
              </h1>
            </div>
          </div>

          <div className="w-full px-10 pt-10">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-center items-center">
                {/* Team Member 1 */}
                <div className="xl:w-1/4 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                  <div className="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
                    <div className="absolute -mt-12 w-full flex justify-center">
                     
                    </div>
                    <div className="px-6 py-10 text-center">
                      <div className="font-bold text-2xl text-gray-900 dark:text-white pb-1">
                        Ali Ural
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Drexel University
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-base pt-3">
                        Computer Science
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 2 */}
                <div className="xl:w-1/4 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                  <div className="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
                    <div className="absolute -mt-12 w-full flex justify-center">
                      
                    </div>
                    <div className="px-6 py-10 text-center">
                      <div className="font-bold text-2xl text-gray-900 dark:text-white pb-1">
                        Andrew Jiang
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        NYU
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-base pt-3">
                        Computer Science
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Member 3 */}
                <div className="xl:w-1/4 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5">
                  <div className="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
                    <div className="absolute -mt-12 w-full flex justify-center">
                   
                    </div>
                    <div className="px-6 py-10 text-center">
                      <div className="font-bold text-2xl text-gray-900 dark:text-white pb-1">
                        Ishan Vaish
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        UCSD
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-base pt-3">
                        Computer Science
                      </p>
                    </div>
                  </div>
                </div>

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

export default About;