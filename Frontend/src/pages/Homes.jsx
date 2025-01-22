import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";


const Homes = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(function(){
    gsap.to
  })

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map-temmp"
        />
      </div>

      <div className="flex flex-col justify-end absolute h-screen top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[43%] left-10 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-red-500"></div>
      </div>
    </div>
  );
};

export default Homes;
