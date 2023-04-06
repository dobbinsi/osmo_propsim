import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import osmo from "../logos/osmologo.svg";
import axios, { AxiosError, AxiosResponse } from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckToSlot,
  faCircleNodes,
} from "@fortawesome/free-solid-svg-icons";

interface partyViewProps {
  partyView: boolean;
  togglePartyView: () => void;
}

const Parties: React.FC<partyViewProps> = ({ partyView, togglePartyView }) => {
  return (
    <div className="wrapper">
      <div className="header">
        <img src={osmo} className="logomain" alt="osmo" />
        <div className="title">
          <h1 className="psim">Voting Trends | </h1>
          <FontAwesomeIcon
            icon={faCheckToSlot}
            color="#ffffff"
            size="3x"
            className="icon-mode"
            onClick={togglePartyView}
          />
        </div>
      </div>
      <div className="main">
        <div className="top">
          <div className="party-desc">
            <h1>Interop Party</h1>
            <div className="desc-content">
              <div className="desc-desc">
                <h3>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                  ea voluptates voluptatum deserunt laboriosam quidem omnis quo,
                  quam sed error quia vitae, laudantium animi. Temporibus
                  laborum expedita quia ducimus dolorem! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo odit expedita dolorum corporis deserunt tenetur dolorem nisi aut eligendi doloribus porro velit sint non culpa, ducimus vel exercitationem facere numquam.
                </h3>
              </div>
              <div className="desc-box">
                <div className="desc-logo">
                  <FontAwesomeIcon
                    icon={faCircleNodes}
                    color="#ffffff"
                    size="6x"
                    className="icon-mode"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1>This is the alternative view</h1>
        </div>
        <div className="results">
          <h1>This is the alternative view</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Parties;
