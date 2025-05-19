import { logger } from "../../../logger.js";
import EnvUtils from "../../Utils/EnvUtils.js";
import {
  ICryptoCurrency,
  ICryptoCurrencyResponse,
} from "./types/CryptoCurrency.js";

export class CryptoCurrency {
  constructor(
    private baseUrl: string = EnvUtils.getEnv("COIN_MARKET_CAP_URL"),
    private apiApiKey: string = EnvUtils.getEnv("COIN_MARKET_CAP_API_KEY")
  ) {}

  /**
   *
   * @param symbol example BTC
   * @param name example Bitcoin
   */
  async getListing(
    symbol: string,
    name: string
  ): Promise<ICryptoCurrency | undefined> {
    const res = await this.fetchData<ICryptoCurrencyResponse>(
      "/v1/cryptocurrency/listings/latest"
    );

    // Filtering out data here (as a workaround) since the Free version of Claude has a limit in the chat
    const data = res.data.find(
      (item) =>
        item.symbol === symbol || item.name.toLowerCase() === name.toLowerCase()
    );
    return data;
  }

  private async fetchData<T extends Record<keyof T, unknown>>(
    urlPath: string
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${urlPath}`;
      logger.log(`👉 CryptoPrice: Fetching data from: ${url}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": this.apiApiKey,
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as T;
      return data;
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          `Error fetching data from CoinMarketCap API: ${error.message}`
        );
      }

      throw error;
    }
  }
}
