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
  faFireFlameCurved,
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

interface partyViewProps {
  partyView: boolean;
  togglePartyView: () => void;
}

interface AIFResponse {
  data: AifItem[];
}
interface AifItem {
  ADDRESS: string;
  ANTI_PERCENTAGE_MATCH: number;
  ANTI_PERCENTAGE_REDUCTION: number;
  NUM_PROPS_MATCH: number;
  NUM_PROPS_REDUCTION: number;
  NUM_PROPS_VAL_MATCH: number;
  NUM_PROPS_VAL_REDUCTION: number;
  NUM_VOTES_MATCH: number;
  NUM_VOTES_REDUCTION: number;
  PERCENTAGE_MATCH: number;
  PERCENTAGE_REDUCTION: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE_MATCH: number;
  VAL_ANTI_PERCENTAGE_REDUCTION: number;
  VAL_PERCENTAGE_MATCH: number;
  VAL_PERCENTAGE_REDUCTION: number;
  VOTER: string;
  thumbnail?: string;
}

interface AAResponse {
  data: AaItem[];
}
interface AaItem {
  ADDRESS: string;
  ANTI_PERCENTAGE: number;
  NUM_PROPS: number;
  NUM_PROPS_VAL: number;
  NUM_VOTES: number;
  PERCENTAGE: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE: number;
  VAL_PERCENTAGE: number;
  VOTER: string;
  thumbnail?: string;
}

interface BAResponse {
  data: BaItem[];
}
interface BaItem {
  ADDRESS: string;
  ANTI_PERCENTAGE: number;
  NUM_PROPS: number;
  NUM_PROPS_VAL: number;
  NUM_VOTES: number;
  PERCENTAGE: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE: number;
  VAL_PERCENTAGE: number;
  VOTER: string;
  thumbnail?: string;
}

interface CPCResponse {
  data: CpcItem[];
}
interface CpcItem {
  ADDRESS: string;
  ANTI_PERCENTAGE: number;
  NUM_PROPS: number;
  NUM_PROPS_VAL: number;
  NUM_VOTES: number;
  PERCENTAGE: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE: number;
  VAL_PERCENTAGE: number;
  VOTER: string;
  thumbnail?: string;
}

interface GRResponse {
  data: GrItem[];
}
interface GrItem {
  ADDRESS: string;
  ANTI_PERCENTAGE: number;
  NUM_PROPS: number;
  NUM_PROPS_VAL: number;
  NUM_VOTES: number;
  PERCENTAGE: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE: number;
  VAL_PERCENTAGE: number;
  VOTER: string;
  thumbnail?: string;
}

interface GOPResponse {
  data: GopItem[];
}
interface GopItem {
  ADDRESS: string;
  ANTI_PERCENTAGE_WHITELIST: number;
  ANTI_PERCENTAGE_VALIDATOR: number;
  NUM_PROPS_WHITELIST: number;
  NUM_PROPS_VALIDATOR: number;
  NUM_PROPS_VAL_WHITELIST: number;
  NUM_PROPS_VAL_VALIDATOR: number;
  NUM_VOTES_WHITELIST: number;
  NUM_VOTES_VALIDATOR: number;
  PERCENTAGE_WHITELIST: number;
  PERCENTAGE_VALIDATOR: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE_WHITELIST: number;
  VAL_ANTI_PERCENTAGE_VALIDATOR: number;
  VAL_PERCENTAGE_WHITELIST: number;
  VAL_PERCENTAGE_VALIDATOR: number;
  VOTER: string;
  thumbnail?: string;
}

interface ISResponse {
  data: IsItem[];
}
interface IsItem {
  ADDRESS: string;
  ANTI_PERCENTAGE: number;
  NUM_PROPS: number;
  NUM_PROPS_VAL: number;
  NUM_VOTES: number;
  PERCENTAGE: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE: number;
  VAL_PERCENTAGE: number;
  VOTER: string;
  thumbnail?: string;
}

interface IOPResponse {
  data: IopItem[];
}
interface IopItem {
  ADDRESS: string;
  ANTI_PERCENTAGE: number;
  NUM_PROPS: number;
  NUM_PROPS_VAL: number;
  NUM_VOTES: number;
  PERCENTAGE: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE: number;
  VAL_PERCENTAGE: number;
  VOTER: string;
  thumbnail?: string;
}

interface UXAResponse {
  data: UxaItem[];
}
interface UxaItem {
  ADDRESS: string;
  ANTI_PERCENTAGE: number;
  NUM_PROPS: number;
  NUM_PROPS_VAL: number;
  NUM_VOTES: number;
  PERCENTAGE: number;
  VALIDATOR_NAME: string;
  VAL_ANTI_PERCENTAGE: number;
  VAL_PERCENTAGE: number;
  VOTER: string;
  thumbnail?: string;
}

interface ValidatorResponse {
  validators: any;
  data: any;
}

const headers3 = {
  "Content-Type": "application/json",
  Origin: "https://wallet.keplr.app/",
  Referer: "https://wallet.keplr.app/",
};

interface Validatooor {
  commission: {
    commission_rates: Record<string, unknown>;
    update_time: string;
  };
  consensus_pubkey: {
    "@type": string;
    key: string;
  };
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
  jailed: boolean;
  min_self_delegation: string;
  operator_address: string;
  status: string;
  tokens: string;
  unbonding_height: string;
  unbonding_time: string;
}

interface ValidatorWithThumbnail extends Validatooor {
  thumbnail?: string;
  containerId: string;
}

interface Party {
  name: string;
  description: string;
  method1: string;
  criteria1: string;
  method2: string;
  criteria2: string;
  logo: any;
}

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
  }[];
}

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

  const thumbnails: { [identity: string]: string } = {
    E5F274B870BDA01D:
      "https://s3.amazonaws.com/keybase_processed_uploads/bd5fb87f241bd78a9c4bceaaa849ca05_360_360.jpg",
    AE4C403A6E7AA1AC:
      "https://s3.amazonaws.com/keybase_processed_uploads/909034c1d36c1d1f3e9191f668007805_360_360.jpeg",
    "00B79D689B7DC1CE":
      "https://s3.amazonaws.com/keybase_processed_uploads/3a844f583b686ec5285403694b738a05_360_360.jpg",
    "975D494265B1AC25":
      "https://s3.amazonaws.com/keybase_processed_uploads/e7eb89ea1c41eb10fbaa66a6e5b60b05_360_360.jpg",
    "3A7D5C9B0B88BEA1":
      "https://s3.amazonaws.com/keybase_processed_uploads/92cd665c2158b7380de6ed499d95ba05_360_360.jpg",
    "48608633F99D1B60":
      "https://s3.amazonaws.com/keybase_processed_uploads/cd2a41a8df34c773128fa394f2acda05_360_360.jpg",
    "045D374A62F15B56":
      "https://s3.amazonaws.com/keybase_processed_uploads/7b1f41f3d8c9fc1f6f5094da6dc25f05_360_360.jpg",
    "3804A3D13B6CB379":
      "https://s3.amazonaws.com/keybase_processed_uploads/b92befb344f4a12a7d75b00cf7d09905_360_360.jpg",
    CA9AC67C3BF42517:
      "https://s3.amazonaws.com/keybase_processed_uploads/5b3f8006bfc195759c7ba64651ce2705_360_360.jpg",
    "90B597A673FC950E":
      "https://s3.amazonaws.com/keybase_processed_uploads/e1378cd4d5203ded716906687ad53905_360_360.jpg",
    "7C88A757E65A5445":
      "https://s3.amazonaws.com/keybase_processed_uploads/3289a1771f20b736abb38f15653f7d05_360_360.jpg",
    EBB03EB4BB4CFCA7:
      "https://s3.amazonaws.com/keybase_processed_uploads/2826e38259411adafb416505fb948c05_360_360.jpg",
    "7BDD4C2E94392626":
      "https://s3.amazonaws.com/keybase_processed_uploads/82c0a77a4fa7eadcc7c19db426535e05_360_360.jpg",
    "0878BA6BE556C132":
      "https://s3.amazonaws.com/keybase_processed_uploads/1855362ac6629cbc7158012eb363e405_360_360.jpg",
    C47845226662AF47:
      "https://s3.amazonaws.com/keybase_processed_uploads/41a14755f6dcc57604ebfe75e3e4ed05_360_360.jpg",
    "3EB2AEED134D7138":
      "https://s3.amazonaws.com/keybase_processed_uploads/e5adbbd46f16053bc6b5adce029e9005_360_360.jpg",
    D0D8B80F1C5C70B5:
      "https://s3.amazonaws.com/keybase_processed_uploads/90c0c3d64fccc193617615091cff3b05_360_360.jpg",
    "209E3458ADC6CAF5":
      "https://s3.amazonaws.com/keybase_processed_uploads/5ab389f2634e08eab59d0829a3c9a405_360_360.jpg",
    "0BC47B3228CBF46C":
      "https://s3.amazonaws.com/keybase_processed_uploads/85f8e8fa2c6a700d21e35711d2c71105_360_360.jpg",
    D16E26E5C8154E17:
      "https://s3.amazonaws.com/keybase_processed_uploads/d8d03bfdc35339c30a502b73b9ab6d05_360_360.jpg",
    "06E24C7678282B53":
      "https://s3.amazonaws.com/keybase_processed_uploads/b19f88c597a7bb169d486e9e03ff7f05_360_360.jpg",
    "3E38E52A12F94561":
      "https://s3.amazonaws.com/keybase_processed_uploads/0c58779792b331d87c7a7ecbfd7ef805_360_360.jpg",
    "28DC4101DA38C22C":
      "https://s3.amazonaws.com/keybase_processed_uploads/4cb8ffca762335930b55f99df0608b05_360_360.jpg",
    "535BF8D68742ACED":
      "https://s3.amazonaws.com/keybase_processed_uploads/67de65c69c21ff8f4bdd59cbae42a705_360_360.jpg",
    "67A577430DBBCEE0":
      "https://s3.amazonaws.com/keybase_processed_uploads/c96cf0ee2dc8f102b6c3eaf1fbdf4c05_360_360.jpg",
    "6408AA029ADBE364":
      "https://s3.amazonaws.com/keybase_processed_uploads/3a6087c347a6ee0d02f82b4fe2081f05_360_360.jpg",
    "26FE476C84A3C760":
      "https://s3.amazonaws.com/keybase_processed_uploads/8ed8b90d716c17eae1380f59b0b85405_360_360.jpg",
    CC434B6FE536F51B:
      "https://s3.amazonaws.com/keybase_processed_uploads/8349f3ab6852a8419c1987ad9096c605_360_360.jpg",
    "8957C5091FBF4192":
      "https://s3.amazonaws.com/keybase_processed_uploads/3d5a3bd02e0c30db7949a371bbc4d705_360_360.jpg",
    "2861F5EE06627224":
      "https://s3.amazonaws.com/keybase_processed_uploads/f5b0771af36b2e3d6a196a29751e1f05_360_360.jpeg",
    "268AE2FE71E9E7C4":
      "https://s3.amazonaws.com/keybase_processed_uploads/846a159d07bf007bcca2c35416d46705_360_360.jpg",
    DCB176E79AE7D51F:
      "https://s3.amazonaws.com/keybase_processed_uploads/5dacfc1ad84eecdb4a01fd893d479805_360_360.jpeg",
    "8A9FC930E1A980D6":
      "https://s3.amazonaws.com/keybase_processed_uploads/a36cb442d15672ecd180b29c698a2505_360_360.jpg",
    "436039F82528A43A":
      "https://s3.amazonaws.com/keybase_processed_uploads/6cfad5c62a803390a8fc93fdfc9c2605_360_360.jpg",
    F12B081334CBE0C6:
      "https://s3.amazonaws.com/keybase_processed_uploads/63585765d299338807f158d6aadd2e05_360_360.jpg",
    DE810BE47E3B73B3:
      "https://s3.amazonaws.com/keybase_processed_uploads/aa8593e2c57af8cc2725d9270f5ea905_360_360.jpg",
    CD80FCB702D70807:
      "https://s3.amazonaws.com/keybase_processed_uploads/26fb1a95bd986007a0de27d718218f05_360_360.jpg",
    A57DAB9B09C7215D:
      "https://s3.amazonaws.com/keybase_processed_uploads/6ab87291cc2506fb6f1ef6a657e62005_360_360.jpg",
    CF0852DD298E2B0D:
      "https://s3.amazonaws.com/keybase_processed_uploads/964085f0b9d19d53554ec37bddda9005_360_360.jpg",
    "5736C325251A8046":
      "https://s3.amazonaws.com/keybase_processed_uploads/39002ba27b7a8267410a2fedd5528305_360_360.jpg",
    "4801FCDCD4F93E9B":
      "https://s3.amazonaws.com/keybase_processed_uploads/e2158c45b766c4204ec1c90977cb0105_360_360.jpg",
    "47434737FEC2418A":
      "https://s3.amazonaws.com/keybase_processed_uploads/5c3d7bac0929f250929ac178a8d19405_360_360.jpg",
    "5992A6D423A406D6":
      "https://s3.amazonaws.com/keybase_processed_uploads/9d337c16fa39ef101c37131dbec2cf05_360_360.jpg",
    E2A5772A111FD119:
      "https://s3.amazonaws.com/keybase_processed_uploads/a1413845d3aa5e3fec212768c3a87c05_360_360.jpg",
    "8E92184569CD8E2D":
      "https://s3.amazonaws.com/keybase_processed_uploads/eaaad4b2c4e30990a58320de74695d05_360_360.jpg",
    "0A6AF02D1557E5B4":
      "https://s3.amazonaws.com/keybase_processed_uploads/d56ce0bdda17f73d4aa895d1626e2505_360_360.jpg",
    "9AE70F9E3EDA8956":
      "https://s3.amazonaws.com/keybase_processed_uploads/a88e5e584409d84bca5d8fedcbf84b05_360_360.jpg",
    "5F1D6AC7EA588676":
      "https://s3.amazonaws.com/keybase_processed_uploads/febce068a5aebf84e640079467e88e05_360_360.jpg",
    "6386E8C1B6217AC2":
      "https://s3.amazonaws.com/keybase_processed_uploads/1dbbcb3590eb95b16521c13a42921605_360_360.jpg",
    "35892AC552B8A0A8":
      "https://s3.amazonaws.com/keybase_processed_uploads/0295f24a5694e2af5e51cb391705ed05_360_360.jpg",
    "165F85FC0194320D":
      "https://s3.amazonaws.com/keybase_processed_uploads/e7aca2c60e1b658db8cc8f175ce9aa05_360_360.jpg",
    "3999DA33020A4DBC":
      "https://s3.amazonaws.com/keybase_processed_uploads/c1bfe4c1d4f6c8f8d66baa152d50e805_360_360.jpg",
    "6783E9F948541962":
      "https://s3.amazonaws.com/keybase_processed_uploads/51d3573458db9c383c8a2f730af84105_360_360.jpg",
    FA260EE7A0113432:
      "https://s3.amazonaws.com/keybase_processed_uploads/af106005e2439232a6f19bcb75c52605_360_360.jpg",
    AD3CDBC91802F94A:
      "https://s3.amazonaws.com/keybase_processed_uploads/5bea053297f0462b29a7bc84fbb00905_360_360.jpg",
    F87ADDB700C0CC94:
      "https://s3.amazonaws.com/keybase_processed_uploads/4c94c8374d204c54f437ad9d42f43d05_360_360.jpg",
    "1ECD13F96C55C0CD":
      "https://s3.amazonaws.com/keybase_processed_uploads/a779c9e7185eb63ccbaec307c9cf1f05_360_360.jpg",
    "679281030DD1209A":
      "https://s3.amazonaws.com/keybase_processed_uploads/edaa56528c25783aac7044e54bf7d805_360_360.jpg",
    D75509198CE782A6:
      "https://s3.amazonaws.com/keybase_processed_uploads/c5b1dfddf88bb3a757a8a9c66651e105_360_360.jpg",
    "29A97D4100A83471":
      "https://s3.amazonaws.com/keybase_processed_uploads/ed2db5629853790d5b26ea12fb576405_360_360.jpg",
    "8687EB49D3AC9208":
      "https://s3.amazonaws.com/keybase_processed_uploads/3c47b62f3d28ecfd821536f69be82905_360_360.jpg",
    ADBDB0178E4441BE:
      "https://s3.amazonaws.com/keybase_processed_uploads/331ef65a8c486e2eb1f1846986509d05_360_360.jpg",
    DD06F013A474ACA3:
      "https://s3.amazonaws.com/keybase_processed_uploads/2d924fd3a739f81b89e55343c40f9b05_360_360.jpg",
    "1C32EF4035953E8B":
      "https://s3.amazonaws.com/keybase_processed_uploads/a9c3a52a07f0c9d7ec2ef0714eda1305_360_360.jpg",
    DA08751C2062AB36:
      "https://s3.amazonaws.com/keybase_processed_uploads/aa00b591b6e2d9386932c24e89662a05_360_360.jpg",
    C7449E61C271EAA8:
      "https://s3.amazonaws.com/keybase_processed_uploads/b30ff45dd938ae77c602393299869605_360_360.jpg",
    C92C6965D89F07A3:
      "https://s3.amazonaws.com/keybase_processed_uploads/b16bcadbedcfc61763187a5b2657c205_360_360.jpg",
    "4062E136FF6C8968":
      "https://s3.amazonaws.com/keybase_processed_uploads/1b8734001b87673cb18080a048a90105_360_360.jpg",
    "0B5217ACAE18F4C9":
      "https://s3.amazonaws.com/keybase_processed_uploads/d56a8afc0d99e63498f82e7b89d89b05_360_360.jpg",
    "103DCE407C9F1D13":
      "https://s3.amazonaws.com/keybase_processed_uploads/836ea91be7df31a3a865e43541e97c05_360_360.jpg",
    D372724899D1EDC8:
      "https://s3.amazonaws.com/keybase_processed_uploads/298543a07bc5ab8a0a72405ecb6bfc05_360_360.jpg",
    "9C7571030BEF5157":
      "https://s3.amazonaws.com/keybase_processed_uploads/fd488355ab385fc78fa6c0cee76c3205_360_360.jpg",
    "2ABCBF8F9F31AF0E":
      "https://s3.amazonaws.com/keybase_processed_uploads/89c86f490e46970b9ffdcf10ab120505_360_360.jpg",
    "51468B615127273A":
      "https://s3.amazonaws.com/keybase_processed_uploads/4c37bcb94523674a84d57cab554c5c05_360_360.jpg",
    "4D3303E20A4D2C32":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2F051cdbd6d051d3cafcdb45377c6b5c05_360_360.jpg&w=128&q=75",
    "913CE38447233C01":
      "https://s3.amazonaws.com/keybase_processed_uploads/61d84fdd3a5969a1f8d832ca8f536a05_360_360.jpg",
    "5A8AB49CF5CAAF3C":
      "https://s3.amazonaws.com/keybase_processed_uploads/a0696b953ceca5ca4fa36f3b00e91705_360_360.jpg",
    "609F83752053AD57":
      "https://s3.amazonaws.com/keybase_processed_uploads/3074ffa8484e5d89597d53356bf9d905_360_360.jpg",
    FD3702E722561505:
      "https://s3.amazonaws.com/keybase_processed_uploads/3e76421e42ca09d2d4e9a5c2bdee5905_360_360.jpg",
    CC806AFFDB2EE85A:
      "https://s3.amazonaws.com/keybase_processed_uploads/a4e90eb76d45735341e07f5314766105_360_360.jpg",
    "216E0EE1BA80B5F8":
      "https://s3.amazonaws.com/keybase_processed_uploads/c6f6faf5d7039892c4140877189ade05_360_360.jpg",
    "87D9921253A2A9EB":
      "https://www.a41.io/_next/image?url=https%3A%2F%2Fa41-web-static.s3.ap-northeast-2.amazonaws.com%2Fpublic%2Fimgs%2Fa41_logo_steel.png&w=1920&q=75",
    FEF740F1760E1B56:
      "https://s3.amazonaws.com/keybase_processed_uploads/085d09c506dceeb931a504f249736705_360_360.jpg",
    "9203983F91296B66":
      "https://s3.amazonaws.com/keybase_processed_uploads/1c4591dc0094cd6711bc1f5d18d9a405_360_360.jpg",
    A2EA7DE76AD57E1A:
      "https://s3.amazonaws.com/keybase_processed_uploads/fee9b2d6de139c06ca94d6c59f055c05_360_360.jpg",
    C46C8329BB5F48D8:
      "https://s3.amazonaws.com/keybase_processed_uploads/0df6d91e7e57b42a7e17b2cc62541905_360_360.jpg",
    "9A516A1CD4116BBF":
      "https://s3.amazonaws.com/keybase_processed_uploads/3fcc4caebb2c8e949829a7b090be3805_360_360.jpg",
    "7F82E4F0CAA26298":
      "https://s3.amazonaws.com/keybase_processed_uploads/26b948e192f3c31a9032c4e1ef89a405_360_360.jpg",
    "5CCA4F526B9F85DA":
      "https://s3.amazonaws.com/keybase_processed_uploads/a8b06c066e7fb928abef3e4508adf205_360_360.jpg",
    "06B033BAC39DA21C":
      "https://s3.amazonaws.com/keybase_processed_uploads/6dc14362803c12b4f06ebc58e9958705_360_360.jpg",
    "94FEC9A766EF8D04":
      "https://s3.amazonaws.com/keybase_processed_uploads/a740e37f4adeebc0706acd71f5a41205_360_360.jpg",
    A2879F08F59FB0AF:
      "https://s3.amazonaws.com/keybase_processed_uploads/5575ed509a4d4d395987000cf36a5b05_360_360.jpg",
    "63575EE3F0F9FAFC":
      "https://s3.amazonaws.com/keybase_processed_uploads/f41a124017811be653748cece3560205_360_360.jpg",
    "55387C0472199D52":
      "https://s3.amazonaws.com/keybase_processed_uploads/96a587e698a795f91ba12618ab6f0105_360_360.jpg",
    "55A5F88B4ED52D3E":
      "https://s3.amazonaws.com/keybase_processed_uploads/4c88923608ce72dd4d6ebb8b93e5d005_360_360.jpg",
    C5C28A947096C28A:
      "https://s3.amazonaws.com/keybase_processed_uploads/245cc914fddb8f5957e635cff782ab05_360_360.jpg",
    F74595D6D5D568A2:
      "https://s3.amazonaws.com/keybase_processed_uploads/832fd8e95710fb345f084afb8aeace05_360_360.jpg",
    B4750D7ECB3F0409:
      "https://s3.amazonaws.com/keybase_processed_uploads/53059456b623614fa46be05b2cde5405_360_360.jpg",
    "55B2C411EE64C03A":
      "https://s3.amazonaws.com/keybase_processed_uploads/b3a42d54dc983ddf8fc7a63e2df1bd05_360_360.jpg",
    B41FCF161C4B971B:
      "https://s3.amazonaws.com/keybase_processed_uploads/9788639bbc2f4d70a3bf1ce557913005_360_360.jpg",
    DA413860B22A8E07:
      "https://s3.amazonaws.com/keybase_processed_uploads/fbacc8ad6054ffb6a0ae559c81c25205_360_360.jpg",
    F2E67996F3D5EB16:
      "https://s3.amazonaws.com/keybase_processed_uploads/474e46094121ca6b1a76168b3efe7e05_360_360.jpg",
    "909A480D5643CCC5":
      "https://s3.amazonaws.com/keybase_processed_uploads/3b72c1a2f1efd5f7fed0bacd6a787e05_360_360.jpg",
    "11A2797A6DD3873D":
      "https://s3.amazonaws.com/keybase_processed_uploads/e1f0a5408b34916e30fab52f5455d605_360_360.jpg",
    F10E3CDCBC4EA7AA:
      "https://s3.amazonaws.com/keybase_processed_uploads/7422803e583735db284898cafd8e8605_360_360.jpg",
    E73AFD8985423B14:
      "https://s3.amazonaws.com/keybase_processed_uploads/128efcca8fffd52fed0cae7aa9f25d05_360_360.jpg",
    D41C757E7F05563FC04351B41E09665F32FE7217:
      "https://s3.amazonaws.com/keybase_processed_uploads/69f83d1adfdfcc061bad5e018d600905_360_360.jpg",
    "6696D60A73064DFE":
      "https://s3.amazonaws.com/keybase_processed_uploads/1c6f791ce6df2b7b14ea1d0447ab1c05_360_360.jpg",
    "125E6FE219457130":
      "https://s3.amazonaws.com/keybase_processed_uploads/967fccb20f83489ea9ae1b803e235d05_360_360.jpg",
    "805F39B20E881861":
      "https://s3.amazonaws.com/keybase_processed_uploads/d48739023a250815c4ac564c9870ec05_360_360.jpg",
    F422F328C14AFBFA:
      "https://s3.amazonaws.com/keybase_processed_uploads/6f8216af8c5805a9bde9098316e5e405_360_360.jpg",
    "2E3A8285E6B547B2":
      "https://s3.amazonaws.com/keybase_processed_uploads/3476fe9f5565f97c1169474fd0b6f505_360_360.jpg",
    "536585A71903C50F":
      "https://s3.amazonaws.com/keybase_processed_uploads/3f9db55d73c7509bc05181b655997405_360_360.jpg",
    "44937E3DA9AA699A":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2F9ee1518187b9d4350b3212dd5292fe05_360_360.jpg&w=64&q=75",
    "70C162B0473634FD":
      "https://s3.amazonaws.com/keybase_processed_uploads/7457583aa6c1316335719ec6cd1ba905_360_360.jpg",
    "1326A75B9148A214":
      "https://s3.amazonaws.com/keybase_processed_uploads/d635534def81aba879cb5379edbe0f05_360_360.jpg",
    "8D6FC89A2E9A7FC7":
      "https://s3.amazonaws.com/keybase_processed_uploads/cf5c4280c5934629bd598e736ad4c705_360_360.jpg",
    D540D0234B3AE1B8:
      "https://s3.amazonaws.com/keybase_processed_uploads/63706c19c6fcf72a5314acd2ed335505_360_360.jpg",
    "0CE19EE3E4BA48E5":
      "https://s3.amazonaws.com/keybase_processed_uploads/9ad31731b3dfa00c77508b5427ee9005_360_360.jpg",
    "1441B829AD71D8F4":
      "https://s3.amazonaws.com/keybase_processed_uploads/cd7521be90327c83415410782295c105_360_360.jpg",
    DF1CDD6E03CCF372:
      "https://s3.amazonaws.com/keybase_processed_uploads/8888513d9793e14936de315195d18d05_360_360.jpg",
    E308F774D80FF40B:
      "https://s3.amazonaws.com/keybase_processed_uploads/1be50ea4c1a26ff72b068a3ab0590205_360_360.jpg",
    "8BD21C9C536D6CBF":
      "https://s3.amazonaws.com/keybase_processed_uploads/672aefe29d7601557a8a4e27680d6d05_360_360.jpg",
    "146F545F37D34202":
      "https://s3.amazonaws.com/keybase_processed_uploads/09fb0ccfd7c3819ea1ecfd7ead33df05_360_360.jpg",
    A0C8B5A2BDDCA82B:
      "https://s3.amazonaws.com/keybase_processed_uploads/946d1d67195714b80ea47077c8927f05_360_360.jpg",
    "5F406D7064437F89":
      "https://s3.amazonaws.com/keybase_processed_uploads/1ad8339052870fb172a22c566d03f005_360_360.jpg",
    "86A0F841E24F3C34":
      "https://s3.amazonaws.com/keybase_processed_uploads/592dc594eb5c43f5e53c63fcaf765405_360_360.jpg",
    "5505D3E11EF42968":
      "https://s3.amazonaws.com/keybase_processed_uploads/2668127cdab5c1c73acd1a6a7f907705_360_360.jpg",
    DEF3590B1DCD96A4:
      "https://s3.amazonaws.com/keybase_processed_uploads/22719e70a0bf62d953ee027e7595d005_360_360.jpg",
    FD161E9548A427C9:
      "https://s3.amazonaws.com/keybase_processed_uploads/94036970019a31e86d83f8781e283205_360_360.jpg",
    "2CC4D67B2136C051":
      "https://s3.amazonaws.com/keybase_processed_uploads/81013bebd3eb4c403a55488012c67e05_360_360.jpg",
    "3F5BD795E6AB49AC":
      "https://s3.amazonaws.com/keybase_processed_uploads/fefadd02959e67386708ed6e0baf5005_360_360.jpg",
    "1510797E867F484E":
      "https://s3.amazonaws.com/keybase_processed_uploads/6ebcaa02df0e4c457c7aa5dc4b54bc05_360_360.jpg",
    "833F4BCC70748155":
      "https://s3.amazonaws.com/keybase_processed_uploads/0f1cdcc05e771e267cb1415327216c05_360_360.jpg",
    "355613DDE80039C8":
      "https://s3.amazonaws.com/keybase_processed_uploads/27f1664463f26fd64cb549eba3567405_360_360.jpg",
    "7ACD3320CCADD897":
      "https://s3.amazonaws.com/keybase_processed_uploads/bc255fca6c64687aa53d62500f9f3605_360_360.jpg",
    "4E0CE8E709527EE0":
      "https://s3.amazonaws.com/keybase_processed_uploads/f8e675a87c4ceaee210dd59a09332c05_360_360.jpg",
    C8992BB62C009B9F:
      "https://s3.amazonaws.com/keybase_processed_uploads/0ef4ba226a2717dca5f367e657e2d405_360_360.jpg",
    D0D9D1C2AEB79C5B:
      "https://s3.amazonaws.com/keybase_processed_uploads/c0d8c8d028e391b8ac5ea4c88a866b05_360_360.jpg",
    DFEAAB98E8D0975B:
      "https://s3.amazonaws.com/keybase_processed_uploads/00c1e1d42b5f6673011939ffbc753105_360_360.jpg",
    "74D3AF53635231D9":
      "https://s3.amazonaws.com/keybase_processed_uploads/3b4fcc88223b68911846a884ee63ab05_360_360.jpg",
    "6257A55EA42BA680":
      "https://s3.amazonaws.com/keybase_processed_uploads/42a43c92fd7896697eaf8157dad39505_360_360.jpg",
    E0A6A3980E464A66:
      "https://s3.amazonaws.com/keybase_processed_uploads/cb19889f449c505310929100874bb505_360_360.jpg",
    "70D77FD98E48B033":
      "https://s3.amazonaws.com/keybase_processed_uploads/e29c8d812b7515729b9a16e466295705_360_360.jpg",
    C7D6DBE2CB576363:
      "https://s3.amazonaws.com/keybase_processed_uploads/802332fc652f99a333844817aaddc105_360_360.jpg",
    EB3470949B3E89E2:
      "https://s3.amazonaws.com/keybase_processed_uploads/a084e1a96ecc3f24bd57dfec517a9205_360_360.jpg",
    "85130F5D06D9DC5E":
      "https://s3.amazonaws.com/keybase_processed_uploads/9a1eded7b114bb964a180406d515e805_360_360.jpg",
    A3431CED2751636A:
      "https://s3.amazonaws.com/keybase_processed_uploads/ec8e247e65ad9e156adf385a5106ea05_360_360.jpg",
    "3C91979AF36E303E":
      "https://s3.amazonaws.com/keybase_processed_uploads/68f2d676f48d880c67977fa15fda3905_360_360.jpg",
    "3912AE47B45446D7":
      "https://s3.amazonaws.com/keybase_processed_uploads/47efbd252439bbe957894b8c9a737205_360_360.jpg",
    "059BCF656623D0BE":
      "https://s3.amazonaws.com/keybase_processed_uploads/352ea94dd42598f2bd722b8aec5e2f05_360_360.jpg",
    "94F50BA69A2BEFEA":
      "https://s3.amazonaws.com/keybase_processed_uploads/dfbff60aaba51d8db0d1f31419a3d305_360_360.jpg",
    BA341405E1973689:
      "https://s3.amazonaws.com/keybase_processed_uploads/8103fbe299362603f6607f5b5db3c305_360_360.jpg",
    AB99C8D824487B05:
      "https://s3.amazonaws.com/keybase_processed_uploads/12b6eb10810ebcc4ee98443d8bf89d05_360_360.jpg",
    "7AAAA066B64C3034":
      "https://s3.amazonaws.com/keybase_processed_uploads/30d4ee1451e4206d3e654a81b04ba805_360_360.jpg",
    "4700D12228CC5EB5":
      "https://s3.amazonaws.com/keybase_processed_uploads/b91782b3a5e9c53d71e16b61d8be0405_360_360.jpg",
    "0EE0E1ADCAEC1633":
      "https://s3.amazonaws.com/keybase_processed_uploads/b5ef82839ef79ba26e8a4f58c0e81f05_360_360.jpg",
    "38172502B043D302":
      "https://s3.amazonaws.com/keybase_processed_uploads/dc696d875cbf0c5b745080101d914605_360_360.jpg",
    FF4B91B50B71CEDA:
      "https://s3.amazonaws.com/keybase_processed_uploads/77f05c9f4479b689156a691b2640f305_360_360.jpg",
    "26FA2B24F46A98EF":
      "https://s3.amazonaws.com/keybase_processed_uploads/101cd6ba9f2b4c46d56b4caaca764205_360_360.jpg",
    "3D7812E90AFB1548":
      "https://s3.amazonaws.com/keybase_processed_uploads/a1b0b98f51cbdc1ca319017576fb4c05_360_360.jpg",
    "8265DEAF50B61DF7":
      "https://s3.amazonaws.com/keybase_processed_uploads/b3273b5e67fbb587d207293e478aab05_360_360.jpg",
    EC771B7A05CDF1D4:
      "https://s3.amazonaws.com/keybase_processed_uploads/22d564bd8287141afbf59961df853205_360_360.jpg",
    "834d3ed959fe610fa2154c34ecdd85340e88a1ae":
      "https://s3.amazonaws.com/keybase_processed_uploads/472fe8ea959e6aa2443ac61c96004805_360_360.jpg",
    "716F93BF335CF0B0":
      "https://s3.amazonaws.com/keybase_processed_uploads/c7693c519da9ad61020eec267902cd05_360_360.jpg",
    EC3443CC6E038CFA:
      "https://s3.amazonaws.com/keybase_processed_uploads/5c7e3688032b14325ea89b42af319205_360_360.jpg",
    F8FCC108B0120E16:
      "https://s3.amazonaws.com/keybase_processed_uploads/d85f442f668abaac037203356ee6d905_360_360.jpg",
    "562B310A60D8A06D":
      "https://s3.amazonaws.com/keybase_processed_uploads/ce67dbce205b0b64379ac32636615605_360_360.jpg",
    "69A46F39FB01F4D4":
      "https://s3.amazonaws.com/keybase_processed_uploads/11b3dd78058506ef2e45cde098008d05_360_360.jpg",
    "2CB281A714F6133B":
      "https://s3.amazonaws.com/keybase_processed_uploads/53b008f12f37e3ffa0dec3676d375a05_360_360.jpg",
    BEAC09B6FE7F908B:
      "https://s3.amazonaws.com/keybase_processed_uploads/bec2c55ae55d417f928a323fd8815105_360_360.jpg",
    "3D6E2861B47F2F9F":
      "https://s3.amazonaws.com/keybase_processed_uploads/b10c191914fa49558addc492955c8a05_360_360.jpg",
    "6CE4A2AB30E12FB6":
      "https://s3.amazonaws.com/keybase_processed_uploads/40074803b431974d29cf2693562bba05_360_360.jpg",
    AD6C05DA12E42B70:
      "https://s3.amazonaws.com/keybase_processed_uploads/7757c06ab563563da07d5423d7675705_360_360.jpg",
    "48CE867E6AB5ED72":
      "https://s3.amazonaws.com/keybase_processed_uploads/a4252044b74200386ac1473bfca95c05_360_360.jpg",
    A15273DFFD11E62E:
      "https://s3.amazonaws.com/keybase_processed_uploads/6765b2fa9b5a3168efb48eeb04093605_360_360.jpg",
    EDEA30F3AD071CD2:
      "https://s3.amazonaws.com/keybase_processed_uploads/ed8fd11c2a19472bf4871d4dc66c8405_360_360.jpg",
    "654899A548A41038":
      "https://s3.amazonaws.com/keybase_processed_uploads/d006ff2692078b96b7d54ebfd6c84205_360_360.jpg",
    "3EB183235B56FFFD":
      "https://s3.amazonaws.com/keybase_processed_uploads/7f9829a56a441dc172bf30580e7c4d05_360_360.jpg",
    "2C12B61930DF3586":
      "https://s3.amazonaws.com/keybase_processed_uploads/c2fdefa03db4d6ef1872239955449e05_360_360.jpg",
    "0E480E2B83B23D80":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2F6ce44a0b3bbd2a99933ccb10a4a46305_360_360.jpg&w=128&q=75",
    "09A303A2C724C59":
      "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/osmosis/moniker/osmovaloper102ruvpv2srmunfffxavttxnhezln6fncrdjd27.png",
    "2B1788BD8D14A3AF":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2F1db7b1f4f2030c71264fb76507a09a05_360_360.jpg&w=128&q=75",
    "357F80896B3311B4":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2F627921d6ba4c1f941d0a12b015a2bc05_360_360.jpg&w=128&q=75",
    "84D5F4CF21FBF123":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2Fd2b22684de5f464da40742f84b737905_360_360.jpg&w=64&q=75",
    "3820B9E30B3BD99E":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2Ff0238d018c8256e54e8109406786e505_360_360.jpg&w=64&q=75",
    "9E31CFA37DA22B31":
      "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/osmosis/moniker/osmovaloper1knn0dpjfukmq97yz09uqt80896gwg0rfv6jtvp.png",
    "9B2EB22C7DAC8684":
      "https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/osmosis/moniker/osmovaloper183psjr4y05kwtpfew073q6hm84xdhp9tcn8ne7.png",
    "44771D06A00DD695":
      "https://wallet.keplr.app/_next/image?url=https%3A%2F%2Fs3.amazonaws.com%2Fkeybase_processed_uploads%2F173328839c66214bd12fc8100bd04105_360_360.jpg&w=64&q=75",
  };

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
        "https://lcd-osmosis.keplr.app/cosmos/staking/v1beta1/validators?pagination.limit=1000",
        { headers: headers3 }
      )
      .then((res: AxiosResponse<ValidatorResponse>) => {
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

        const sortedValidators = uniqueValidators.sort(
          (a: Validatooor, b: Validatooor) =>
            parseInt(b.tokens) - parseInt(a.tokens)
        );
        const top150Validators = sortedValidators.slice(0, 300);
        const combinedArray: ValidatorWithThumbnail[] = top150Validators.map(
          (item: Validatooor) => {
            return {
              ...item,
              thumbnail: thumbnails[item.description.identity],
              containerId: "ROOT",
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

  const chartDataParty1: BarChartData = {
    labels: chartLabels1,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData1,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData1Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty2: BarChartData = {
    labels: chartLabels2,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData2,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData2Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty3: BarChartData = {
    labels: chartLabels3,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData3,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData3Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty4: BarChartData = {
    labels: chartLabels4,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData4,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData4Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty5: BarChartData = {
    labels: chartLabels5,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData5,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData5Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty6: BarChartData = {
    labels: chartLabels6,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData6,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData6Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty7: BarChartData = {
    labels: chartLabels7,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData7,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData7Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty8: BarChartData = {
    labels: chartLabels8,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData8,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData8Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const chartDataParty9: BarChartData = {
    labels: chartLabels9,
    datasets: [
      {
        label: "Aligned with Party",
        data: chartData9,
        backgroundColor: "#055dff",
        borderRadius: 8,
      },
      {
        label: "Not Aligned with Party",
        data: chartData9Anti,
        backgroundColor: "#d630f7",
        borderRadius: 8,
      },
    ],
  };

  const getPartyData = (partyName: string) => {
    switch (partyName) {
      case "Sustainable Sowers":
        return { data: aifData, chartData: chartDataParty1 };
      case "Astute Allocators":
        return { data: aaData, chartData: chartDataParty2 };
      case "Builder Advocates":
        return { data: baData, chartData: chartDataParty3 };
      case "Community Pool Champions":
        return { data: cpcData, chartData: chartDataParty4 };
      case "Governance Reformers":
        return { data: grData, chartData: chartDataParty5 };
      case "Guardians of Prosperity":
        return { data: gopData, chartData: chartDataParty6 };
      case "Incentive Strategists":
        return { data: isData, chartData: chartDataParty7 };
      case "Interop Party":
        return { data: iopData, chartData: chartDataParty8 };
      case "UX Alliance":
        return { data: uxaData, chartData: chartDataParty9 };
      default:
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
