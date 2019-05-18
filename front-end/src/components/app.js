import React from "react";
import { ToastContainer } from "react-toastify";
import PetSimulator from "./pet_simulator.js";

import "react-toastify/dist/ReactToastify.min.css";

export default function App() {
  return (
    <div>
      <PetSimulator />
      <ToastContainer hideProgressBar="true" />
    </div>
  );
}
