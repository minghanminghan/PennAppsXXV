'use client'

import Image from "next/image";
import localFont from "next/font/local";
import React from "react";
import {useState} from "react";
import axios from "axios";
import CanvasJSReact from '@canvasjs/react-charts';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// actual render
const Home = () => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const [line, setLine] = useState(<CanvasJSChart options={{
    title: {text: "Line Chart"},
    data: [{
      type: "column",
      dataPoints: [
        // { label: "label_1", y: float_1 }, { label: "label_2", y: float_2 }, etc.
      ]
    }]
  }}/>);
  const [chart, nextChart] = useState([line]);

  // declaring states
  const response = axios('http://127.0.0.1:5000/data')
    .then((res) => { // 
      const data = res.data;
      
      return res; // setting global response const
    })


  return (
    <div>
      <button/>
      {chart[0]}
    </div>
  );
}

export default Home;