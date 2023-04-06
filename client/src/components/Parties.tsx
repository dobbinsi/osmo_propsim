import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import osmo from "../logos/osmologo.svg";
import axios, { AxiosError, AxiosResponse } from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckToSlot,
  faLink,
  faHandHoldingDollar,
  faCommentsDollar,
  faArrowsSpin,
  faScroll,
  faShieldHalved,
  faUsersRectangle,
  faFireFlameCurved,
  faCode,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import fscube from "../logos/fscubewhite.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface partyViewProps {
  partyView: boolean;
  togglePartyView: () => void;
}

interface DefResponse {
  data: any;
}

interface Party {
  name: string;
  description: string;
  logo: any;
}

const partyList: Party[] = [
  {
    name: "Interop Party",
    description:
      "Validators who consistently vote for proposals that aim to integrate Osmosis with other blockchain ecosystems or projects, such as adding support for new tokens, implementing cross-chain bridges, or collaborating with other DeFi platforms. These validators believe that fostering interoperability and collaboration with other projects is essential for driving adoption and expanding the reach of the Osmosis ecosystem.",
    logo: faLink,
  },
  {
    name: "Community Pool Champions",
    description:
      "Validators who consistently vote in favor of community pool spend proposals, which allocate funds from the community pool for various purposes such as marketing, community events, or ecosystem development. These validators believe that investing in the growth of the community and ecosystem is vital for the long-term success of Osmosis.",
    logo: faHandHoldingDollar,
  },
  {
    name: "Prudent Allocators",
    description:
      "Validators who consistently vote No or No With Veto on community pool spend proposals. These validators prioritize cautious and disciplined spending of community pool resources, emphasizing the importance of financial responsibility and sustainability. They tend to scrutinize community pool spending proposals carefully and may oppose initiatives they deem unnecessary or lacking in clear, long-term benefits for the Osmosis ecosystem.",
    logo: faCommentsDollar,
  },
  {
    name: "Incentive Strategists",
    description:
      "Validators who pay close attention to proposals related to updating pool incentives, such as adjusting the distribution of liquidity provider (LP) rewards, modifying swap fees, or introducing new incentive mechanisms. These validators often vote in favor of proposals that aim to optimize incentives to attract more users and liquidity to the platform.",
    logo: faArrowsSpin,
  },
  {
    name: "Governance Reformers",
    description:
      "Validators who consistently vote for proposals that seek to improve or reform the governance process itself, such as modifying quorum requirements, adjusting proposal deposit amounts, or introducing new voting options. These validators believe that a more efficient and inclusive governance process is crucial for the healthy functioning of the Osmosis ecosystem.",
    logo: faScroll,
  },
  {
    name: "Guardians of Prosperity",
    description:
      "Validators who focus on voting for proposals related to network security and risk mitigation, such as implementing stricter slashing conditions, adjusting validator set size, or introducing new security features. These validators prioritize the security and integrity of the Osmosis network above other considerations and often vote in favor of measures that enhance network resilience.",
    logo: faShieldHalved,
  },
  {
    name: "UX Advocates",
    description:
      "Validators who focus on voting for proposals that improve the user experience of the Osmosis platform, such as enhancements to the wallet interface, the addition of new trading pairs or liquidity pools, or improvements to the overall usability of the platform. These validators believe that a better user experience will drive increased adoption and usage of the Osmosis ecosystem.",
    logo: faUsersRectangle,
  },
  {
    name: "Anti-Inflation Party",
    description:
      "Validators who regularly vote against proposals that could lead to higher token inflation rates or emission schedules. These validators are concerned about token dilution and its impact on the long-term value of OSMO tokens.",
    logo: faFireFlameCurved,
  },
  {
    name: "Builder Advocates",
    description:
      "Validators who consistently vote for proposals that support and empower developers and builders within the Osmosis ecosystem. These validators recognize the importance of fostering a robust developer community and the value that innovative projects bring to the platform. They actively support store code type proposals that enable the deployment of smart contracts or new decentralized applications, as well as initiatives that provide resources, funding, or tooling to help developers create and launch their projects on Osmosis.",
    logo: faCode,
  },
  // Add more parties here with their descriptions and logos
];

const Parties: React.FC<partyViewProps> = ({ partyView, togglePartyView }) => {
  const [selectedParty, setSelectedParty] = useState<Party>(partyList[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handlePartyChange = (party: Party) => {
    setSelectedParty(party);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [defData, setDefData] = React.useState<any>([]);

  const chartLabelsDef = defData.map((item: { [x: string]: any }) => {
    return item["DELEGATE_NAME"];
  });

  const chartData1Def = defData.map((item: { [x: string]: any }) => {
    return item["FORS"];
  });

  const chartData2Def = defData.map((item: { [x: string]: any }) => {
    return item["AGAINSTS"];
  });

  const chartData3Def = defData.map((item: { [x: string]: any }) => {
    return item["ABSTAINS"];
  });

  useEffect(() => {
    axios
      .get<DefResponse>(
        "https://node-api.flipsidecrypto.com/api/v2/queries/affcf9aa-cde0-45e7-9090-a5d90d276f93/data/latest"
      )
      .then((res: AxiosResponse<DefResponse>) => {
        console.log(res.data);
        setDefData(res.data);
      })

      .catch((err: AxiosError) => console.log(err));
  }, []);

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
          },
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
          },
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Total Votes by Proposal Type",
        font: {
          size: 20,
          family: "'Poppins', sans-serif",
        },
        color: "#fff",
      },
    },
  };

  const chartOptions2: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
          },
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
          },
          color: "#fff",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Total Votes by Keyword",
        font: {
          size: 20,
          family: "'Poppins', sans-serif",
        },
        color: "#fff",
      },
    },
  };

  const chartDataDef = {
    labels: chartLabelsDef,
    datasets: [
      {
        label: "Yes",
        data: chartData1Def,
        backgroundColor: "#055dff",
        borderRadius: 10,
        // borderColor: ["#fff"],
        // borderWidth: 1.5,
      },
      {
        label: "No",
        data: chartData2Def,
        backgroundColor: "#d630f7",
        borderRadius: 10,

        // borderColor: ["#fff"],
        // borderWidth: 1.5,
      },
      {
        label: "Abstain",
        data: chartData3Def,
        backgroundColor: "#6161ab",
        borderRadius: 10,

        // borderColor: ["#fff"],
        // borderWidth: 1.5,
      },
    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

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
            <div className="desc-content">
              <div className="desc-desc">
                <h1>
                  {selectedParty.name}
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    color="#ffffff"
                    size="lg"
                    style={{ marginLeft: "1rem", cursor: "pointer" }}
                    onClick={toggleDropdown}
                  />
                </h1>
                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "#ffffff",
                      borderRadius: "5px",
                      padding: "5px",
                      zIndex: 10,
                    }}
                  >
                    {partyList.map((party) => (
                      <div
                        key={party.name}
                        style={{
                          padding: "5px",
                          cursor: "pointer",
                          color:
                            party.name === selectedParty.name
                              ? "blue"
                              : "black",
                        }}
                        onClick={() => handlePartyChange(party)}
                      >
                        {party.name}
                      </div>
                    ))}
                  </div>
                )}
                <div className="desc-border">
                  <h3>{selectedParty.description}</h3>
                </div>
              </div>
              <div className="desc-box">
                <div className="desc-logo">
                  <FontAwesomeIcon
                    icon={selectedParty.logo}
                    color="#ffffff"
                    size="8x"
                    className="party-logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom2">
          <div className="list-house2">
            <h2>Validators</h2>
            <div className="valhouse2">
              <div className="val-container2">
                <div className="logo-box2">
                  <img src={fscube} className="vlogo2" alt="logo" />
                </div>
                <div className="name-box2">
                  <h2>Flipside</h2>
                </div>
              </div>
              <div className="val-container2">
                <div className="logo-box2">
                  <img src={fscube} className="vlogo2" alt="logo" />
                </div>
                <div className="name-box2">
                  <h2>Flipside</h2>
                </div>
              </div>
              <div className="val-container2">
                <div className="logo-box2">
                  <img src={fscube} className="vlogo2" alt="logo" />
                </div>
                <div className="name-box2">
                  <h2>Flipside</h2>
                </div>
              </div>
              <div className="val-container2">
                <div className="logo-box2">
                  <img src={fscube} className="vlogo2" alt="logo" />
                </div>
                <div className="name-box2">
                  <h2>Flipside</h2>
                </div>
              </div>
              <div className="val-container2">
                <div className="logo-box2">
                  <img src={fscube} className="vlogo2" alt="logo" />
                </div>
                <div className="name-box2">
                  <h2>Flipside</h2>
                </div>
              </div>
              <div className="val-container2">
                <div className="logo-box2">
                  <img src={fscube} className="vlogo2" alt="logo" />
                </div>
                <div className="name-box2">
                  <h2>Flipside</h2>
                </div>
              </div>
              <div className="val-container2">
                <div className="logo-box2">
                  <img src={fscube} className="vlogo2" alt="logo" />
                </div>
                <div className="name-box2">
                  <h2>Flipside</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="results2">
          <div className="results-main2">
            <Bar options={chartOptions} data={chartDataDef} />
          </div>
        </div>
        <div className="results2">
          <div className="results-main2">
            <Bar options={chartOptions2} data={chartDataDef} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Parties;
