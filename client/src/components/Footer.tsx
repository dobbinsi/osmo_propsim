import React from "react";
import flipjawn from "../logos/flipsidewhite.png";
import keplr from "../logos/keplr.svg";
import imperator from "../logos/Imperator.svg";

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <h2>
        <a
          href="https://twitter.com/web3_analyst"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links"
        >
          Jess the Analyst{" "}
        </a>
        &{" "}
        <a
          href="https://twitter.com/dawbyinz"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links"
        >
          d0bby
        </a>
      </h2>
      <div className="logo-footer">
        <h2 className="footer-bigtxt">Powered by</h2>
        <a
          href="https://flipsidecrypto.xyz/d0bby/osmosis-political-parties-validators-ZJKQBH"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links"
        >
          {" "}
          <img src={flipjawn} className="flipside-logo" alt="flipside" />{" "}
        </a>
        <a
          href="https://imperator.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-links"
        >
          {" "}
          <img src={imperator} className="imp-logo" alt="imperator" />{" "}
        </a>
      </div>
    </div>
  );
};

export default Footer;
