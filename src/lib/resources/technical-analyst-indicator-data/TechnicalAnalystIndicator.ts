import EnvUtils from "../../Utils/EnvUtils.js";
import { logger } from "../../../logger.js";
import { config } from "dotenv";
import { FileUtils } from "../../Utils/FileUtils.js";
import path from "path";

const dotenvFilePath = path.join(
  FileUtils.getDirName(import.meta.url),
  "../../../../",
  ".env"
);
config({
  path: dotenvFilePath,
});

type Exchage = "binance";
type TimeInterval =
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "2h"
  | "4h"
  | "12h"
  | "1d"
  | "1w";

type ISymbol = "BTC/USDT" | "ETH/USDT" | "XRP/USDT" | "LTC/USDT"; // Free plan symbols

type Indicator =
  | "bbands"
  | "candle"
  | "cci"
  | "cmf"
  | "dmi"
  | "doji"
  | "ema"
  | "fibonacciretracement"
  | "hma"
  | "ichimoku"
  | "ma"
  | "macd"
  | "mfi"
  | "mom"
  | "pivotpoints"
  | "psar"
  | "roc"
  | "rsi"
  | "stalledpattern"
  | "stddev"
  | "stoch"
  | "stochrsi"
  | "supertrend"
  | "tdsequential"
  | "tr"
  | "trix"
  | "typprice"
  | "ultosc";

export interface IndicatorQueryParams {
  indicator: Indicator;
  symbol: ISymbol;
  interval: TimeInterval;
  exchange: Exchage;
}

export class TechnicalAnalystIndicator {
  constructor(
    public url: string = EnvUtils.getEnv("TAAPI_URL"),
    public apiKey: string = EnvUtils.getEnv("TAAPI_KEY")
  ) {}

  async getIndicator({
    exchange,
    symbol,
    interval,
    indicator,
  }: IndicatorQueryParams): Promise<any> {
    const res = this.fetchData(
      `/${indicator}?exchange=${exchange}&symbol=${symbol}&interval=${interval}&secret=${this.apiKey}`
    );
    return res;
  }

  private async fetchData(urlPath: string): Promise<any> {
    const url = `${this.url}${urlPath}`;
    logger.log(`👉 Fetching data from: ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": this.apiKey,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  }
}
