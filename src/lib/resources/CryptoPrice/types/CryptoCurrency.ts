export interface ICryptoCurrencyResponse {
  data: ICryptoCurrency[];
  status: Record<string, unknown>;
}

export interface ICryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags?: string[] | null;
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform?: null;
  cmc_rank: number;
  self_reported_circulating_supply?: null;
  self_reported_market_cap?: null;
  tvl_ratio?: null;
  last_updated: string;
  quote: Quote;
}
interface Quote {
  [key: string]: Currency;
}
interface Currency {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl?: null;
  last_updated: string;
}

// export const CryptoSymbolSchema = z.string();
// export const CryptoCurrencyNameSchema = z.string();

// export type CryptoSymbol = z.infer<typeof CryptoSymbolSchema>;
// export type CryptoCurrencyName = z.infer<typeof CryptoCurrencyNameSchema>;
