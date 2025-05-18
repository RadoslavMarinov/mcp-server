/**
npx tsx src/main.ts 
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const coinMarketCapApiKey = "f655223f-0c4b-41d5-ab85-bd25350b0d28"; // process.env.COIN_MARKET_CAP_API_KEY;
const coinMarketCapUrl = "https://pro-api.coinmarketcap.com/v1"; // process.env.COIN_MARKET_CAP_URL;
import "dotenv/config";
import {
  IndicatorQueryParams,
  IndicatorSchema,
  TechnicalAnalystIndicator,
  ISymbolSchema,
} from "./lib/resources/technical-analyst-indicator-data/TechnicalAnalystIndicator.js";
import { logger } from "./logger.js";
import { CryptoCurrency } from "./lib/resources/CoinMarketCap/CoinMarketCap.js";
const tai = new TechnicalAnalystIndicator();

const server = new McpServer({
  name: "os-info-mcp-server",
  version: "1.0.0",
});

// ... set up server resources, tools, and prompts ...

server.tool(
  "getCrypotoCurrencyAnalytics",
  "Fetches popular Technical Analysis (TA) Indicator Data on US stocks and cryptocurrencies",
  { symbol: ISymbolSchema, indicator: IndicatorSchema },
  async ({ symbol, indicator }) => {
    logger.log(`🚀 getCrypotoCurrencyAnalytics called with symbol: ${symbol}`);
    const data = await tai.getIndicator({
      exchange: "binance",
      symbol: symbol,
      interval: "1h",
      indicator: indicator,
    });

    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
    };
  }
);

server.tool(
  "getLatestCryptoCurrency",
  "Fetches the latest cryptocurrency prices",
  { symbol: z.string(), name: z.string() },
  async ({ symbol, name }) => {
    logger.log(
      `🚀 getLatestCryptoCurrency called with symbol: ${symbol} name ${name} `
    );

    const data = await fetch(
      `${coinMarketCapUrl}/cryptocurrency/listings/latest`,
      {
        method: "GET",
        headers: {
          "X-CMC_PRO_API_KEY": coinMarketCapApiKey || "",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((jsonData: any) => {
        return (jsonData.data as unknown as CryptoCurrency[]).find(
          (item) =>
            item.symbol === symbol ||
            item.name.toLowerCase() === name.toLowerCase()
        );
      })
      .catch((err) => {
        logger.log(`Error fetching cryptocurrency data: ${err}`);
      });

    logger.log(`🎉 Crypto currency data: ${JSON.stringify(data, null, 2)}`);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data || [], null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
