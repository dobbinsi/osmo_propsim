export interface UXAResponse {
  data: UxaItem[];
}
export interface UxaItem {
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
