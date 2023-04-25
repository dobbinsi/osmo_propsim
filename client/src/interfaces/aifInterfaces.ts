export interface AIFResponse {
  data: AifItem[];
}
export interface AifItem {
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
