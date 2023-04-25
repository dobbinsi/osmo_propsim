import "./App.css";
import osmo from "./logos/osmologo.svg";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Analytics } from "@vercel/analytics/react";

import React, { useEffect, useState } from "react";
import { DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  DragOverlay,
  useSensors,
} from "@dnd-kit/core";

import { Draggable } from "./components/Draggable";
import { Droppable } from "./components/Droppable";

import { thumbnails } from "./constants/thumbnails";
import {
  Validatooor,
  ValidatorWithThumbnail,
  ValidatorResponse,
} from "./interfaces/validatorInterfaces";

import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import DoughnutChart from "./components/DoughnutChart";
import Footer from "./components/Footer";
import Parties from "./components/Parties";

function App() {
  const handleInitialZoom = () => {
    (document.body.style as any).zoom = "80%";
  };

  const [bondedTokens, setBondedTokens] = React.useState<number>(0);
  const [vJawns, setVjawns] = React.useState<ValidatorWithThumbnail[]>([]);
  const [sumYes, setSumYes] = React.useState<number>(0);
  const [sumNo, setSumNo] = React.useState<number>(0);
  const [sumNwv, setSumNwv] = React.useState<number>(0);
  const [sumAbs, setSumAbs] = React.useState<number>(0);
  const [totalVotes, setTotalVotes] = React.useState<number>(0);
  const [quorum, setQuorum] = React.useState<number>(0);

  const totalVotesNum = sumYes + sumNo + sumNwv + sumAbs;
  const yesPercentage = (sumYes / totalVotesNum) * 100 || 0.0;
  const noPercentage = (sumNo / totalVotesNum) * 100 || 0.0;
  const nwvPercentage = (sumNwv / totalVotesNum) * 100 || 0.0;
  const absPercentage = (sumAbs / totalVotesNum) * 100 || 0.0;

  const yesYes = (sumYes / (totalVotesNum - sumAbs)) * 100;
  const vetoVeto = (sumNwv / (totalVotesNum - sumAbs)) * 100;
  const turnout = Math.min((totalVotesNum / bondedTokens) * 100, 100) || 0.0;

  const [partyView, setPartyView] = useState(false);

  const partChartData = {
    labels: ["Yes", "No", "No With Veto", "Abstain"],
    datasets: [
      {
        label: "% of Votes",
        data: [yesPercentage, noPercentage, nwvPercentage, absPercentage],
        backgroundColor: ["#482ce1", "#d630f7", "#ff0077", "#6161ab"],
        borderColor: ["#28274f"],
        borderWidth: 1.5,
      },
    ],
  };

  const partChartOptions = {
    responsive: true,
    layout: {
      padding: {
        bottom: 12,
        top: 12,
      },
    },
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

  const headers3 = {
    "Content-Type": "application/json",
    Origin: "https://wallet.keplr.app/",
    Referer: "https://wallet.keplr.app/",
  };

  const headers5 = {
    accept: "application/json",
  };

  interface TokensResponse {
    pool: any;
    data: any;
  }

  useEffect(() => {
    handleInitialZoom();
  }, []);

  useEffect(() => {
    axios
      .get<TokensResponse>(
        "https://lcd-osmosis.imperator.co/cosmos/staking/v1beta1/pool",
        { headers: headers5 }
      )
      .then((res: AxiosResponse<TokensResponse>) => {
        const bondedValue =
          parseFloat(res.data.pool.bonded_tokens) / Math.pow(10, 6);
        setBondedTokens(bondedValue);
        const quorumValue = bondedValue * 0.2;
        setQuorum(quorumValue);
      })
      .catch((err: AxiosError) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get<ValidatorResponse>(
        "https://lcd-osmosis.imperator.co/cosmos/staking/v1beta1/validators?pagination.limit=1000",
        { headers: headers5 }
      )
      .then((res: AxiosResponse<ValidatorResponse>) => {
        console.log(res.data.validators);
        const uniqueIdentities = new Set();

        const uniqueValidators = res.data.validators.filter(
          (validator: Validatooor) => {
            if (uniqueIdentities.has(validator.description.identity)) {
              return false;
            }
            uniqueIdentities.add(validator.description.identity);
            return true;
          }
        );

        const uniqueValidatorsWithParsedTokens = uniqueValidators.map(
          (validator: Validatooor) => {
            return {
              ...validator,
              tokens: parseFloat(validator.tokens),
            };
          }
        );

        const sortedValidators = uniqueValidatorsWithParsedTokens.sort(
          (a: Validatooor, b: Validatooor) => b.tokens - a.tokens
        );
        const top150Validators = sortedValidators.slice(0, 147);
        const combinedArray: ValidatorWithThumbnail[] = top150Validators.map(
          (item: Validatooor) => {
            return {
              ...item,
              tokens: item.tokens,
              thumbnail: thumbnails[item.description.identity],
              containerId: "ROOT",
            };
          }
        );
        setVjawns(combinedArray);
        setDraggables(combinedArray);
      })

      .catch((err: AxiosError) => console.log(err));
  }, []);

  const sensors = useSensors(
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
    useSensor(MouseSensor)
  );
  const [draggables, setDraggables] = React.useState<ValidatorWithThumbnail[]>(
    []
  );
  const [activeItem, setActiveItem] = React.useState<
    ValidatorWithThumbnail | undefined
  >(undefined);

  function handleDragStart(ev: DragStartEvent) {
    const { active } = ev;
    const activeId = active.id;
    const activeDraggable = draggables.find(
      (draggable) => draggable.description.identity === activeId
    );
    setActiveItem(activeDraggable);
  }

  function calculateTotalPower(
    containerId: string,
    draggables: ValidatorWithThumbnail[]
  ): number {
    const filteredDraggables = draggables.filter(
      (draggable) => draggable.containerId === containerId
    );

    if (filteredDraggables.length === 0) {
      return 0;
    }

    const totalPower = filteredDraggables.reduce((sum, draggable) => {
      return sum + draggable.tokens;
    }, 0);

    return totalPower;
  }

  function tallycalc(draggables: ValidatorWithThumbnail[]): void {
    const totalPowerYes = calculateTotalPower("containerYes", draggables);
    const yesVotes = totalPowerYes / Math.pow(10, 6);
    setSumYes(yesVotes);
    const totalPowerNo = calculateTotalPower("containerNo", draggables);
    const noVotes = totalPowerNo / Math.pow(10, 6);
    setSumNo(noVotes);
    const totalPowerNwv = calculateTotalPower("containerNwv", draggables);
    const nwvVotes = totalPowerNwv / Math.pow(10, 6);
    setSumNwv(nwvVotes);
    const totalPowerAbs = calculateTotalPower("containerAbs", draggables);
    const absVotes = totalPowerAbs / Math.pow(10, 6);
    setSumAbs(absVotes);
    const totalVotesNumber =
      totalPowerYes + totalPowerNo + totalPowerNwv + totalPowerAbs;
    const totalVotesNumberClean = totalVotesNumber / Math.pow(10, 6);
    setTotalVotes(totalVotesNumberClean);
  }

  function reload(): any {
    window.location.reload();
  }

  const togglePartyView = () => {
    setPartyView(!partyView);
  };

  function handleDragEnd(ev: DragEndEvent) {
    const { active, over } = ev;
    if (!over) return;
    const activeId = active.id;

    const overId = over.id as string;

    setDraggables((prevDraggables) => {
      const updatedDraggables = prevDraggables.map((draggable) => {
        if (draggable.description.identity === activeId) {
          return {
            ...draggable,
            containerId: overId,
          };
        }
        return draggable;
      });

      tallycalc(updatedDraggables);
      return updatedDraggables;
    });
  }

  function handleTallyButtonClick(): void {
    tallycalc(draggables);
  }

  return partyView ? (
    <Parties partyView={partyView} togglePartyView={togglePartyView} />
  ) : (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      autoScroll={{ enabled: false, layoutShiftCompensation: false }}
    >
      <div className="wrapper">
        <div className="header">
          <img src={osmo} className="logomain" alt="osmo" />
          <div className="title">
            <h2
              className={`tab ${!partyView ? "active" : ""}`}
              onClick={() => setPartyView(false)}
            >
              Prop Simulator
            </h2>
            <span className="tab-divider">|</span>
            <h2
              className={`tab ${partyView ? "active" : ""}`}
              onClick={() => setPartyView(true)}
            >
              Voting Trends
            </h2>
          </div>
        </div>
        <div className="main">
          <div className="top">
            <div className="list-house">
              <h2>Validators</h2>
              <div className="valhouse">
                <Droppable id="ROOT" className="rooty">
                  {draggables
                    .filter((draggable) => draggable.containerId === "ROOT")
                    .map((draggable) => (
                      <Draggable
                        key={draggable.description.identity}
                        id={draggable.description.identity}
                        name={draggable.description.moniker}
                        logo={draggable.thumbnail}
                        power={draggable.tokens}
                        {...draggable}
                      />
                    ))}
                </Droppable>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="bucket">
              <div className="category">
                <h2>Yes</h2>
              </div>
              <div className="yes">
                <Droppable id="containerYes" className="droppable">
                  {draggables
                    .filter(
                      (draggable) => draggable.containerId === "containerYes"
                    )
                    .map((draggable) => (
                      <Draggable
                        key={draggable.description.identity}
                        id={draggable.description.identity}
                        name={draggable.description.moniker}
                        logo={draggable.thumbnail}
                        power={draggable.tokens}
                        {...draggable}
                      />
                    ))}
                </Droppable>
              </div>
            </div>
            <div className="bucket">
              <div className="category">
                <h2>No</h2>
              </div>
              <div className="no">
                <Droppable id="containerNo" className="droppable">
                  {draggables
                    .filter(
                      (draggable) => draggable.containerId === "containerNo"
                    )
                    .map((draggable) => (
                      <Draggable
                        key={draggable.description.identity}
                        id={draggable.description.identity}
                        name={draggable.description.moniker}
                        logo={draggable.thumbnail}
                        power={draggable.tokens}
                        {...draggable}
                      />
                    ))}
                </Droppable>
              </div>
            </div>
            <div className="bucket">
              <div className="category">
                <h2>
                  <span className="no-with">No With</span> Veto
                </h2>
              </div>
              <div className="noveto">
                <Droppable id="containerNwv" className="droppable">
                  {draggables
                    .filter(
                      (draggable) => draggable.containerId === "containerNwv"
                    )
                    .map((draggable) => (
                      <Draggable
                        key={draggable.description.identity}
                        id={draggable.description.identity}
                        name={draggable.description.moniker}
                        logo={draggable.thumbnail}
                        power={draggable.tokens}
                        {...draggable}
                      />
                    ))}
                </Droppable>
              </div>
            </div>
            <div className="bucket">
              <div className="category">
                <h2>Abstain</h2>
              </div>
              <div className="abstain">
                <Droppable id="containerAbs" className="droppable">
                  {draggables
                    .filter(
                      (draggable) => draggable.containerId === "containerAbs"
                    )
                    .map((draggable) => (
                      <Draggable
                        key={draggable.description.identity}
                        id={draggable.description.identity}
                        name={draggable.description.moniker}
                        logo={draggable.thumbnail}
                        power={draggable.tokens}
                        {...draggable}
                      />
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
              <div className="finalresult">
                {totalVotesNum > quorum ? (
                  vetoVeto > 33.4 ? (
                    <h2>REJECTED - VETO</h2>
                  ) : yesYes > 49.999 ? (
                    <h2>PASSED</h2>
                  ) : (
                    <h2>REJECTED</h2>
                  )
                ) : (
                  <h2>REJECTED</h2>
                )}
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
                  <div>
                    {/* <button
                      onClick={handleTallyButtonClick}
                      className="tallybutton"
                    >
                      Tally Votes
                    </button> */}
                    <button onClick={reload} className="resetbutton">
                      Reset Votes
                    </button>
                  </div>
                  <h2>Turnout: {turnout.toFixed(2)}%</h2>
                  <span className="no-with">
                    <h3>
                      Quorum:{" "}
                      {quorum.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      OSMO (20% of total stake){" "}
                      <span className="no-with"></span>
                    </h3>
                  </span>
                </div>
                <div className="tallies">
                  <div className="tallyjawn">
                    <h3 className="yescolor">
                      YES: {yesPercentage.toFixed(2)}%
                    </h3>
                    <div className="tttt">
                      <h4>
                        {sumYes.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h4>
                      <h4>OSMO</h4>
                    </div>
                  </div>
                  <div className="tallyjawn">
                    <h3 className="nocolor">NO: {noPercentage.toFixed(2)}%</h3>
                    <div className="tttt">
                      <h4>
                        {sumNo.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h4>
                      <h4>OSMO</h4>
                    </div>
                  </div>
                  <div className="tallyjawn">
                    <h3 className="nwvcolor">
                      NWV: {nwvPercentage.toFixed(2)}%
                    </h3>
                    <div className="tttt">
                      <h4>
                        {sumNwv.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h4>
                      <h4>OSMO</h4>
                    </div>
                  </div>
                  <div className="tallyjawn">
                    <h3 className="abscolor">
                      ABSTAIN: {absPercentage.toFixed(2)}%
                    </h3>
                    <div className="tttt">
                      <h4>
                        {sumAbs.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </h4>
                      <h4>OSMO</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <DragOverlay>
        {activeItem && (
          <Draggable
            key={activeItem.description.identity}
            id={activeItem.description.identity}
            name={activeItem.description.moniker}
            logo={activeItem.thumbnail}
            power={activeItem.tokens}
            draggingColor="#025dff"
            {...activeItem}
          />
        )}
      </DragOverlay>
      <Analytics />
    </DndContext>
  );
}

export default App;
