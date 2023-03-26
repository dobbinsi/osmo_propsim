import "./App.css";
import osmo from "./logos/osmologo.svg";
import flipjawn from "./logos/flipsidewhite.png";
import axios, { AxiosError, AxiosResponse } from "axios";

import React, { useEffect, useRef, useState } from "react";
import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  DragOverlay,
  useSensors,
} from "@dnd-kit/core";

import { Draggable } from "./components/Draggable";
import { Droppable } from "./components/Droppable";

import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import DoughnutChart from "./components/DoughnutChart";

function App() {
  // const [validators, setValidators] = useState([
  //   {
  //     id: "1",
  //     name: "flipside",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "2",
  //     name: "imperator",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/d85f442f668abaac037203356ee6d905_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "3",
  //     name: "danku",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/42a43c92fd7896697eaf8157dad39505_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "4",
  //     name: "frens",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/77f05c9f4479b689156a691b2640f305_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "5",
  //     name: "mango",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/1c6f791ce6df2b7b14ea1d0447ab1c05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "6",
  //     name: "marinade",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/d006ff2692078b96b7d54ebfd6c84205_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "7",
  //     name: "expressake",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/53b008f12f37e3ffa0dec3676d375a05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "8",
  //     name: "stakewithme",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/8c54cca4a597dd5dfdd9665d7ebdda05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "9",
  //     name: "lockandkey",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "10",
  //     name: "bullish stake",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "11",
  //     name: "bearish stake",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "12",
  //     name: "frenemies",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "13",
  //     name: "gorilla stqke",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "14",
  //     name: "sake stake",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "15",
  //     name: "birbman stakes",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "16",
  //     name: "osmongton",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "17",
  //     name: "radicle stake",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "18",
  //     name: "starfish",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "19",
  //     name: "posthumane",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  //   {
  //     id: "20",
  //     name: "emperorstakes",
  //     logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
  //     power: "2.25%",
  //     containerId: "ROOT",
  //   },
  // ]);

  const [vjawns, setVjawns] = React.useState([]);

  const partChartData = {
    labels: ["Yes", "No", "No With Veto", "Abstain"],
    datasets: [
      {
        label: "# of Wallets",
        data: [70, 10, 10, 10],
        backgroundColor: ["#482ce1", "#5e19a0", "#da41c2", "#6161ab"],
        // borderColor: ["#4b423f"],
        // borderWidth: 1.5,
      },
    ],
  };

  const partChartOptions = {
    responsive: true,
    // layout: {
    //   padding: {
    //     bottom: 20,
    //   },
    // },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        align: "start",
        labels: {
          font: {
            size: 11,
            family: "'Poppins', sans-serif",
          },
        },
      },
      title: {
        display: false,
      },
    },
  };

  ChartJS.register(ArcElement, Title, Tooltip, Legend);

  type Validator = {
    id: string;
    name: string;
    logo: string;
    power: string;
    containerId: string;
  };

  type Validators = Validator[];

  const validators: Validators = [
    {
      id: "1",
      name: "flipside",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "2",
      name: "imperator",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/d85f442f668abaac037203356ee6d905_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "3",
      name: "danku",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/42a43c92fd7896697eaf8157dad39505_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "4",
      name: "frens",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/77f05c9f4479b689156a691b2640f305_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "5",
      name: "mango",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/1c6f791ce6df2b7b14ea1d0447ab1c05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "6",
      name: "marinade",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/d006ff2692078b96b7d54ebfd6c84205_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "7",
      name: "expressake",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/53b008f12f37e3ffa0dec3676d375a05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "8",
      name: "stakewithme",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/8c54cca4a597dd5dfdd9665d7ebdda05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "9",
      name: "lockandkey",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "10",
      name: "bullish stake",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "11",
      name: "bearish stake",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "12",
      name: "frenemies",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "13",
      name: "gorilla stqke",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "14",
      name: "sake stake",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "15",
      name: "birbman stakes",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
    {
      id: "16",
      name: "osmongton",
      logo: "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
      power: "2.25%",
      containerId: "ROOT",
    },
  ];

  const headers3 = {
    "Content-Type": "application/json",
    Origin: "https://wallet.keplr.app/",
    Referer: "https://wallet.keplr.app/",
  };

  interface ValidatorResponse {
    // Define the response structure here, for example:
    data: any;
  }

  interface TokensResponse {
    // Define the response structure here, for example:
    data: any;
  }

  // useEffect(() => {
  //   axios
  //     .get<TokensResponse>(
  //       "https://lcd-osmosis.keplr.app/cosmos/staking/v1beta1/pool",
  //       { headers: headers3 }
  //     )
  //     .then((res: AxiosResponse<TokensResponse>) => {
  //       console.log(res.data);
  //     })
  //     .catch((err: AxiosError) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get<ValidatorResponse>(
  //       "https://lcd-osmosis.keplr.app/cosmos/staking/v1beta1/validators?pagination.limit=1000",
  //       { headers: headers3 }
  //     )
  //     .then((res: AxiosResponse<ValidatorResponse>) => {
  //       console.log(res.data);
  //     })
  //     .catch((err: AxiosError) => console.log(err));
  // }, []);

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  const [draggables, setDraggables] = React.useState([...validators]);
  const [activeItem, setActiveItem] = React.useState<Validator | undefined>(
    undefined
  );

  function handleDragStart(ev: DragStartEvent) {
    const { active } = ev;
    const activeId = active.id;
    const activeDraggable = draggables.find(
      (draggable) => draggable.id === activeId
    );
    console.log("drag start");
    setActiveItem(activeDraggable);
    console.log(activeItem);
  }

  function handleDragOver(ev: DragOverEvent) {
    const { active, over } = ev;
    if (!over) return;
    //the id of the active draggable
    const activeId = active.id;

    //The id of the continaer a draggable is dragged over
    //in our example the overId can either be ROOT, A or B
    const overId = over.id as string;
    console.log(overId);

    setDraggables((draggables) => {
      return draggables.map((draggable) => {
        //if we are dragging a draggable over a container
        if (draggable.id === activeId) {
          return {
            ...draggable,
            //update its containerId to match the overId
            containerId: overId,
          };
        }
        return draggable;
      });
    });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div className="wrapper">
        <div className="header">
          <img src={osmo} className="logomain" alt="osmo" />
          <h1>Proposal Simulator</h1>
        </div>
        <div className="main">
          <div className="top">
            <div className="list-house">
              <h2>Validators</h2>
              <div className="valhouse">
                <Droppable id="ROOT" className="rooty">
                  {draggables
                    //only render draggables with have a containerId of ROOT
                    .filter((draggable) => draggable.containerId === "ROOT")
                    .map((draggable) => (
                      <Draggable key={draggable.id} {...draggable} />
                    ))}
                </Droppable>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div>
              <div className="category">
                <h2>Yes</h2>
              </div>
              <div className="yes">
                <Droppable id="containerYes" className="droppable">
                  {draggables
                    //only render draggables with have a containerId of ROOT
                    .filter(
                      (draggable) => draggable.containerId === "containerYes"
                    )
                    .map((draggable) => (
                      <Draggable key={draggable.id} {...draggable} />
                    ))}
                </Droppable>
              </div>
            </div>
            <div>
              <div className="category">
                <h2>No</h2>
              </div>
              <div className="no">
                <Droppable id="containerNo" className="droppable">
                  {draggables
                    //only render draggables with have a containerId of ROOT
                    .filter(
                      (draggable) => draggable.containerId === "containerNo"
                    )
                    .map((draggable) => (
                      <Draggable key={draggable.id} {...draggable} />
                    ))}
                </Droppable>
              </div>
            </div>
            <div>
              <div className="category">
                <h2>No With Veto</h2>
              </div>
              <div className="noveto">
                <Droppable id="containerNwv" className="droppable">
                  {draggables
                    //only render draggables with have a containerId of ROOT
                    .filter(
                      (draggable) => draggable.containerId === "containerNwv"
                    )
                    .map((draggable) => (
                      <Draggable key={draggable.id} {...draggable} />
                    ))}
                </Droppable>
              </div>
            </div>
            <div>
              <div className="category">
                <h2>Abstain</h2>
              </div>
              <div className="abstain">
                <Droppable id="containerAbs" className="droppable">
                  {draggables
                    //only render draggables with have a containerId of ROOT
                    .filter(
                      (draggable) => draggable.containerId === "containerAbs"
                    )
                    .map((draggable) => (
                      <Draggable key={draggable.id} {...draggable} />
                    ))}
                </Droppable>
              </div>
            </div>
          </div>
          <div className="results">
            <div className="res-header">
              <div>
                <h2>Results</h2>
              </div>
              <div>
                <h2>PASSED</h2>
              </div>
            </div>
            <div className="results-main">
              <div className="results-left">
                <div className="dough">
                  <DoughnutChart
                    data={partChartData}
                    options={partChartOptions}
                  />
                </div>
              </div>
              <div className="results-right">
                <div className="turnout">
                  <h2>Turnout: "............"</h2>
                  <h3>Quorum: "............" OSMO (20% of total stake)</h3>
                </div>
                <div className="tallies">
                  <div className="tallyjawn">
                    <h2>YES: ".........."</h2>
                    <h3>104,669,699 OSMO</h3>
                  </div>
                  <div className="tallyjawn">
                    <h2>NO: ".........."</h2>
                    <h3>104,669,699 OSMO</h3>
                  </div>
                  <div className="tallyjawn">
                    <h2>NWV: ".........."</h2>
                    <h3>104,669,699 OSMO</h3>
                  </div>
                  <div className="tallyjawn">
                    <h2>ABSTAIN: ".........."</h2>
                    <h3>104,669,699 OSMO</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-footer">
          <h2 className="footer-bigtxt">Powered by</h2>
          <a
            href="https://flipsidecrypto.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-links"
          >
            {" "}
            <img src={flipjawn} className="flipside-logo" alt="flipside" />{" "}
          </a>
        </div>
      </div>
      <DragOverlay>
        {activeItem && (
          //Render a drag overlay when using multiple containers
          // check here https://docs.dndkit.com/api-documentation/draggable/drag-overlay for more info
          <div className="draggable draggable-overlay">
            <div className="val-container">
              <div className="logo-box">
                <img src={activeItem.logo} className="vlogo" alt="logo" />
                <h2>{activeItem.name}</h2>
              </div>
              <div className="vinfo">
                <div className="vinfo-power">
                  <h2>{activeItem.power}</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
