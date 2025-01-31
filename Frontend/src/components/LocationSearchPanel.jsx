import React from "react";

const LocationSearchPanel = (props) => {
  // sample array of locations

  const locations = [
    "plot 462 niti khand-2 indirapuram",
    "Garg bartan & kitchen centre Ghaziabadwale",
    "Sharda University KP-3 UP",
    "Tanish ka ghar Shahadara",
  ];

  return (
    <div className="flex flex-col">
      {/* Sample Data */}

      {locations.map((location) => {
        return (
          <div key={location} onClick={()=>{
            props.setVehiclePanel(true) // this will open vehicle panel
            props.setPanelOpen(false); // this will close the panel containing pickup and dest
          }} className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start">
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
