export interface GOPResponse {
  data: GopItem[];
}
export interface GopItem {
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
