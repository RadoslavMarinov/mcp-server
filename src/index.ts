/**
npx tsx src/main.ts 
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { config } from "dotenv";

const dotenvFilePath = path.join(
  FileUtils.getDirName(import.meta.url),
  "../",
  ".env"
);
config({
  path: dotenvFilePath,
});

import {
  IndicatorSchema,
  TechnicalAnalystIndicator,
  ISymbolSchema,
} from "./lib/resources/TechnicalAnalystIndicator/TechnicalAnalystIndicator.js";
import { logger } from "./logger.js";
import { FileUtils } from "./lib/Utils/FileUtils.js";
import path from "path";
import { CryptoCurrency } from "./lib/resources/CryptoPrice/CryptoCurrency.js";

const server = new McpServer({
  name: "os-info-mcp-server",
  version: "1.0.0",
});

const tai = new TechnicalAnalystIndicator();
const criptoDataApi = new CryptoCurrency();
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

    const data = (await criptoDataApi.getListing(symbol, name)) || "";
    logger.log(`🎉 Crypto currency data: ${JSON.stringify(data, null, 2)}`);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
