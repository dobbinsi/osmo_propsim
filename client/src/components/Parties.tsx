import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import osmo from "../logos/osmologo.svg";
import valFallback from "../logos/validator_fallback.svg";
import axios, { AxiosError, AxiosResponse } from "axios";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faHandHoldingDollar,
  faCommentsDollar,
  faArrowsSpin,
  faScroll,
  faShieldHalved,
  faUsersRectangle,
  faCode,
  faCaretDown,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { thumbnails } from "../constants/thumbnails";

import { AIFResponse, AifItem } from "../interfaces/aifInterfaces";
import { AAResponse, AaItem } from "../interfaces/aaInterfaces";
import { BAResponse, BaItem } from "../interfaces/baInterfaces";
import { CPCResponse, CpcItem } from "../interfaces/cpcInterfaces";
import { GRResponse, GrItem } from "../interfaces/grInterfaces";
import { GOPResponse, GopItem } from "../interfaces/gopInterfaces";
import { ISResponse, IsItem } from "../interfaces/isInterfaces";
import { IOPResponse, IopItem } from "../interfaces/iopInterfaces";
import { UXAResponse, UxaItem } from "../interfaces/uxaInterfaces";

import {
  Validatooor,
  ValidatorWithThumbnail,
  ValidatorResponse,
} from "../interfaces/validatorInterfaces";
import { Party } from "../interfaces/Party";
import { BarChartData } from "../interfaces/BarChartData";

interface partyViewProps {
  partyView: boolean;
  togglePartyView: () => void;
}

const headers5 = {
  accept: "application/json",
};

const partyList: Party[] = [
  {
    name: "Astute Allocators",
    description:
      "Validators who regularly vote 'No' or 'No With Veto' on Community Pool Spend proposals. These validators prioritize cautious and disciplined spending of community pool resources, emphasizing the importance of financial responsibility and sustainability. They tend to scrutinize community pool spending proposals carefully and may oppose initiatives they deem unnecessary or lacking in clear, long-term benefits for the Osmosis ecosystem.",
    method1: "Keywords: Community Pool Spend, Funding, Grant, Loan, Token Swap",
    criteria1: "20% NO or NWV",
    method2: "Participation Hurdle",
    criteria2: "10%",
    logo: faCommentsDollar,
  },
  {
    name: "Builder Advocates",
    description:
      "Validators who consistently vote for proposals that support and empower developers and builders within the Osmosis ecosystem. These validators recognize the importance of fostering a robust developer community and the value that innovative projects bring to the platform. They actively support Store Code proposals that enable the deployment of smart contracts or new decentralized applications as well as initiatives that provide resources or tooling to help developers launch their projects on Osmosis.",
    method1:
      "Keywords: Composability, Instantiate Contract, Integration, Software Upgrade, Store Code",
    criteria1: "90% YES",
    method2: "Participation Hurdle",
    criteria2: "25%",
    logo: faCode,
  },
  {
    name: "Community Pool Champions",
    description:
      "Validators who consistently vote in favor of Community Pool Spend proposals, which allocate funds from the community pool for various purposes such as marketing, community events, or ecosystem development. Based on voting history, these validators believe that investing in the growth of the community and ecosystem is vital for the long-term success of Osmosis.",
    method1: "Keywords: Community Pool Spend, Funding, Grant, Loan, Token Swap",
    criteria1: "85% YES",
    method2: "Participation Hurdle",
    criteria2: "50%",
    logo: faHandHoldingDollar,
  },
  {
    name: "Governance Reformers",
    description:
      "Validators who consistently vote for proposals that seek to improve or reform the governance process itself, such as modifying quorum requirements, adjusting proposal deposit amounts, or introducing new voting options. These validators believe that a more efficient and inclusive governance process is crucial for the healthy functioning of the Osmosis ecosystem.",
    method1: "Keywords: Deposit, Governance, Standards, Voting Period",
    criteria1: "70% YES",
    method2: "Participation Hurdle",
    criteria2: "60%",
    logo: faScroll,
  },
  {
    name: "Guardians of Prosperity",
    description:
      "Validators who regularly vote 'No' or 'No With Veto' on Store Code proposals or other proposals that would allow certain addresses to upload contracts to Osmosis without seeking approval from governance. Based on voting history, these validators prioritize the security and integrity of the network above other considerations.",
    method1: "Keywords: Instantiate Contract, Store Code, Whitelist",
    criteria1: "25% NO or NWV",
    method2: "Participation Hurdle",
    criteria2: "20%",
    logo: faShieldHalved,
  },
  {
    name: "Incentive Strategists",
    description:
      "Validators who pay close attention to proposals related to updating pool incentives, such as adjusting the distribution of liquidity provider (LP) rewards, modifying swap fees, or introducing new incentive mechanisms. These validators often vote in favor of proposals that aim to optimize incentives to attract more users and liquidity to the platform.",
    method1:
      "Keywords: Adjustment, Bootstrap, Incentives, Remove Superfluid Assets, Update Pool Incentives",
    criteria1: "90% YES",
    method2: "Participation Hurdle",
    criteria2: "50%",
    logo: faArrowsSpin,
  },
  {
    name: "Interop Party",
    description:
      "Validators who consistently vote for proposals that aim to integrate Osmosis with other blockchain ecosystems or projects, such as adding support for new tokens, implementing cross-chain bridges, or collaborating with other DeFi platforms. These validators believe that fostering interoperability and collaboration with other projects is essential for driving adoption and expanding the reach of the Osmosis ecosystem.",
    method1:
      "Keywords: Bootstrap, Client Update, Composability, Integration, Match, Set Superfluid Assets, Store Code",
    criteria1: "85% YES",
    method2: "Participation Hurdle",
    criteria2: "50%",
    logo: faLink,
  },
  {
    name: "Sustainable Sowers",
    description:
      "Validators who regularly vote against proposals that seek to match external incentives for a given liquidity pool. Based on voting history, they believe that a more measured approach to yield farming incentives is essential for the long-term stability and growth of the Osmosis ecosystem and that directing OSMO incentives toward more strategically important pools will lead to better outcomes.",
    method1: "Keywords: Match",
    criteria1: "25% NO or NWV",
    method2: "Participation Hurdle",
    criteria2: "10%",
    logo: faWheatAwn,
  },
  {
    name: "UX Alliance",
    description:
      "Validators who tend to vote in favor of proposals that improve the user experience or accessibility of the Osmosis platform. They support enhancements to the user interface, the addition of new fee tokens, or removing unnecessary LP fees. Based on voting history, these validators believe that a better user experience will drive increased adoption and usage of the Osmosis ecosystem.",
    method1:
      "Keywords: Client Update, Decrease, Exit Fee, Software Upgrade, Update Fee Token",
    criteria1: "95% YES",
    method2: "Participation Hurdle",
    criteria2: "75%",
    logo: faUsersRectangle,
  },
];

const Parties: React.FC<partyViewProps> = ({ partyView, togglePartyView }) => {
  const [selectedParty, setSelectedParty] = useState<Party>(() => {
    const storedSelectedParty = localStorage.getItem("selectedParty");

    if (storedSelectedParty) {
      return JSON.parse(storedSelectedParty) as Party;
    } else {
      return partyList[0];
    }
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const arrowIconRef = useRef<HTMLSpanElement | null>(null);

  const handlePartyChange = (party: Party) => {
    setSelectedParty(party);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      arrowIconRef.current &&
      !arrowIconRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const [vJawns, setVjawns] = React.useState<ValidatorWithThumbnail[]>([]);
  const [aifData, setAifData] = React.useState<AifItem[]>([]);
  const [aaData, setAaData] = React.useState<AaItem[]>([]);
  const [baData, setBaData] = React.useState<BaItem[]>([]);
  const [cpcData, setCpcData] = React.useState<CpcItem[]>([]);
  const [grData, setGrData] = React.useState<GrItem[]>([]);
  const [gopData, setGopData] = React.useState<GopItem[]>([]);
  const [isData, setIsData] = React.useState<IsItem[]>([]);
  const [iopData, setIopData] = React.useState<IopItem[]>([]);
  const [uxaData, setUxaData] = React.useState<UxaItem[]>([]);

  const chartLabels1 = aifData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData1 = aifData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE_MATCH"];
  });

  const chartData1Anti = aifData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE_MATCH"];
  });

  const chartLabels2 = aaData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData2 = aaData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE"];
  });

  const chartData2Anti = aaData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE"];
  });

  const chartLabels3 = baData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData3 = baData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE"];
  });

  const chartData3Anti = baData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE"];
  });

  const chartLabels4 = cpcData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData4 = cpcData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE"];
  });

  const chartData4Anti = cpcData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE"];
  });

  const chartLabels5 = grData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData5 = grData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE"];
  });

  const chartData5Anti = grData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE"];
  });

  const chartLabels6 = gopData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData6 = gopData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE_WHITELIST"];
  });

  const chartData6Anti = gopData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE_WHITELIST"];
  });

  const chartLabels7 = isData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData7 = isData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE"];
  });

  const chartData7Anti = isData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE"];
  });

  const chartLabels8 = iopData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData8 = iopData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE"];
  });

  const chartData8Anti = iopData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE"];
  });

  const chartLabels9 = uxaData.map((item: { [x: string]: any }) => {
    return truncateName(item["VALIDATOR_NAME"], 10);
  });

  const chartData9 = uxaData.map((item: { [x: string]: any }) => {
    return item["VAL_PERCENTAGE"];
  });

  const chartData9Anti = uxaData.map((item: { [x: string]: any }) => {
    return item["VAL_ANTI_PERCENTAGE"];
  });

  useEffect(() => {
    axios
      .get<ValidatorResponse>(
        "https://lcd-osmosis.imperator.co/cosmos/staking/v1beta1/validators?pagination.limit=500",
        { headers: headers5 }
      )
      .then((res: AxiosResponse<ValidatorResponse>) => {
        const uniqueOperatorAddressIdentities = new Set();

        const uniqueValidators = res.data.validators.filter(
          (validator: Validatooor) => {
            const combinedKey =
              validator.operator_address + validator.description.identity;
            if (uniqueOperatorAddressIdentities.has(combinedKey)) {
              return false;
            }
            uniqueOperatorAddressIdentities.add(combinedKey);
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
        const top150Validators = sortedValidators.slice(0, 300);
        const combinedArray: ValidatorWithThumbnail[] = top150Validators.map(
          (item: Validatooor) => {
            const identity = item.description.identity || item.operator_address;
            return {
              ...item,
              tokens: item.tokens,
              thumbnail: thumbnails[identity],
              containerId: "ROOT",
              combinedKey: item.operator_address + item.description.identity,
            };
          }
        );
        setVjawns(combinedArray);
      })

      .catch((err: AxiosError) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get<AIFResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/fa39b7fd-db6d-4f87-9f9e-449c05bbf438/data/latest"
      )
      .then((res: AxiosResponse<AIFResponse>) => {
        if (Array.isArray(res.data)) {
          const aifDataWithThumbnails = res.data.map((aifItem: AifItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === aifItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...aifItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return aifItem;
          });
          setAifData(aifDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<AAResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/64a72300-c19d-49e8-88fa-d6e95f9c26ba/data/latest"
      )
      .then((res: AxiosResponse<AAResponse>) => {
        if (Array.isArray(res.data)) {
          const aaDataWithThumbnails = res.data.map((aaItem: AaItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === aaItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...aaItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return aaItem;
          });
          setAaData(aaDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<BAResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/17f92331-68a4-490b-ad73-4e624ee3e425/data/latest"
      )
      .then((res: AxiosResponse<BAResponse>) => {
        if (Array.isArray(res.data)) {
          const baDataWithThumbnails = res.data.map((baItem: BaItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === baItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...baItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return baItem;
          });
          setBaData(baDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<CPCResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/41d87923-6e37-4dbc-b4d5-35340aa27946/data/latest"
      )
      .then((res: AxiosResponse<CPCResponse>) => {
        if (Array.isArray(res.data)) {
          const cpcDataWithThumbnails = res.data.map((cpcItem: CpcItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === cpcItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...cpcItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return cpcItem;
          });
          setCpcData(cpcDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<GRResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/2bd6ba64-1b2a-45f0-bf6f-e13426600598/data/latest"
      )
      .then((res: AxiosResponse<GRResponse>) => {
        if (Array.isArray(res.data)) {
          const grDataWithThumbnails = res.data.map((grItem: GrItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === grItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...grItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return grItem;
          });
          setGrData(grDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<GOPResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/afd2ff66-afec-442a-b708-ddb0cc74dd51/data/latest"
      )
      .then((res: AxiosResponse<GOPResponse>) => {
        if (Array.isArray(res.data)) {
          const gopDataWithThumbnails = res.data.map((gopItem: GopItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === gopItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...gopItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return gopItem;
          });
          setGopData(gopDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<ISResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/c5aea0ca-aee4-4d3e-b028-020a29840898/data/latest"
      )
      .then((res: AxiosResponse<ISResponse>) => {
        if (Array.isArray(res.data)) {
          const isDataWithThumbnails = res.data.map((isItem: IsItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === isItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...isItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return isItem;
          });
          setIsData(isDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<IOPResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/b2db6fa2-6d7e-4c5a-b3f5-da1042e275e4/data/latest"
      )
      .then((res: AxiosResponse<IOPResponse>) => {
        if (Array.isArray(res.data)) {
          const iopDataWithThumbnails = res.data.map((iopItem: IopItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === iopItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...iopItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return iopItem;
          });
          setIopData(iopDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    axios
      .get<UXAResponse>(
        "https://api.flipsidecrypto.com/api/v2/queries/a8a073ed-5874-4cf8-a8a1-c591b9c5dddb/data/latest"
      )
      .then((res: AxiosResponse<UXAResponse>) => {
        if (Array.isArray(res.data)) {
          const uxaDataWithThumbnails = res.data.map((uxaItem: UxaItem) => {
            const correspondingVJawn = vJawns.find(
              (vJawn) => vJawn.operator_address === uxaItem.ADDRESS
            );
            if (correspondingVJawn) {
              return { ...uxaItem, thumbnail: correspondingVJawn.thumbnail };
            }
            return uxaItem;
          });
          setUxaData(uxaDataWithThumbnails);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err: AxiosError) => console.log(err));
  }, [vJawns]);

  useEffect(() => {
    const storedSelectedParty = localStorage.getItem("selectedParty");

    if (storedSelectedParty) {
      const parsedParty = JSON.parse(storedSelectedParty) as Party;
      setSelectedParty(parsedParty);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedParty", JSON.stringify(selectedParty));
  }, [selectedParty]);

  const chartOptions: ChartOptions<"bar"> = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
        },
      },
      title: {
        display: true,
        text: "Signal Strength (% Votes)",
        font: {
          size: 20,
          family: "'Poppins', sans-serif",
        },
        color: "#fff",
        padding: {
          top: 20,
          bottom: 50,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 100,
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
  };

  const partyChartData = [
    {
      name: "Sustainable Sowers",
      data: aifData,
      chartData: generateChartData(chartLabels1, chartData1, chartData1Anti),
    },
    {
      name: "Astute Allocators",
      data: aaData,
      chartData: generateChartData(chartLabels2, chartData2, chartData2Anti),
    },
    {
      name: "Builder Advocates",
      data: baData,
      chartData: generateChartData(chartLabels3, chartData3, chartData3Anti),
    },
    {
      name: "Community Pool Champions",
      data: cpcData,
      chartData: generateChartData(chartLabels4, chartData4, chartData4Anti),
    },
    {
      name: "Governance Reformers",
      data: grData,
      chartData: generateChartData(chartLabels5, chartData5, chartData5Anti),
    },
    {
      name: "Guardians of Prosperity",
      data: gopData,
      chartData: generateChartData(chartLabels6, chartData6, chartData6Anti),
    },
    {
      name: "Incentive Strategists",
      data: isData,
      chartData: generateChartData(chartLabels7, chartData7, chartData7Anti),
    },
    {
      name: "Interop Party",
      data: iopData,
      chartData: generateChartData(chartLabels8, chartData8, chartData8Anti),
    },
    {
      name: "UX Alliance",
      data: uxaData,
      chartData: generateChartData(chartLabels9, chartData9, chartData9Anti),
    },
  ];

  function generateChartData(
    labels: string[],
    alignedData: number[],
    notAlignedData: number[]
  ): BarChartData {
    return {
      labels,
      datasets: [
        {
          label: "Aligned with Party",
          data: alignedData,
          backgroundColor: "#055dff",
          borderRadius: 8,
        },
        {
          label: "Not Aligned with Party",
          data: notAlignedData,
          backgroundColor: "#d630f7",
          borderRadius: 8,
        },
      ],
    };
  }

  const getPartyData = (partyName: string) => {
    const party = partyChartData.find((party) => party.name === partyName);
    if (party) {
      return { data: party.data, chartData: party.chartData };
    } else {
      return { data: [], chartData: { labels: [], datasets: [] } };
    }
  };

  const { data, chartData } = getPartyData(selectedParty.name);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  function truncateName(name: string, maxLength: number): string {
    return name.length > maxLength ? name.slice(0, maxLength) : name;
  }

  return (
    <div className="wrapper">
      <div className="header">
        <img src={osmo} className="logomain" alt="osmo" />
        <div className="title">
          <h2
            className={`tab ${!partyView ? "active" : ""}`}
            onClick={() => togglePartyView()}
          >
            Prop Simulator
          </h2>
          <span className="tab-divider">|</span>
          <h2
            className={`tab ${partyView ? "active" : ""}`}
            onClick={() => togglePartyView()}
          >
            Voting Trends
          </h2>
        </div>
      </div>
      <div className="main">
        <div className="top">
          <div className="party-desc">
            <div className="desc-content">
              <div className="desc-desc">
                <span className="pname">
                  <h1>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={toggleDropdown}
                    >
                      {selectedParty.name}
                    </span>
                    <span ref={arrowIconRef}>
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        color="#ffffff"
                        size="sm"
                        style={{ marginLeft: "1rem", cursor: "pointer" }}
                        onClick={toggleDropdown}
                      />
                    </span>
                  </h1>
                </span>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
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
                  <h3 className="party-text">{selectedParty.description}</h3>
                  <h3>{selectedParty.method1}</h3>
                  <h3>
                    Threshold:{" "}
                    <span className="threshold">{selectedParty.criteria1}</span>
                  </h3>
                  <h3>
                    Participation Hurdle:{" "}
                    <span className="threshold">{selectedParty.criteria2}</span>
                  </h3>
                </div>
              </div>
              <div className="desc-box">
                <div className="desc-logo">
                  <FontAwesomeIcon
                    icon={selectedParty.logo}
                    color="#ffffff"
                    size="10x"
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
              {data.map((item) => (
                <div className="val-container2">
                  <div className="logo-box2">
                    <a
                      href={"https://www.mintscan.io/osmosis/validators/".concat(
                        item.ADDRESS
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={item.thumbnail || valFallback}
                        className="vlogo2"
                        alt="logo"
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <div className="name-box2">
                    <h3>
                      <a
                        href={"https://www.mintscan.io/osmosis/validators/".concat(
                          item.ADDRESS
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="val-links"
                      >
                        {truncateName(item.VALIDATOR_NAME, 20)}
                      </a>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="results2">
          <div className="chart-area">
            <Bar
              options={chartOptions}
              data={chartData}
              style={{ position: "relative" }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Parties;
