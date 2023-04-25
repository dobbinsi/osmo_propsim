export interface Validatooor {
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
  tokens: any;
  unbonding_height: string;
  unbonding_time: string;
}

export interface ValidatorWithThumbnail extends Validatooor {
  thumbnail?: string;
  containerId: string;
  combinedKey: string;
}

export interface ValidatorResponse {
  validators: any;
  data: any;
}
