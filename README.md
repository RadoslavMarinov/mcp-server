

## Add  enviroment files
  - Create a new `.env` file based on the example file `.env.example`

    ```sh
    cp .env.example .env
    ```

  - Enter your values values for the two APIs __COIN_MARKET_CAP_API_KEY__ and __TA_API_KEY__

## Build the Docker image:

  ```sh
  docker build -t mcp-server .
  ```

## Integration with Claude

  - open Claude desktop
  - open Settings -> Developer -> Edit Config
  - add the following entry into the `mcpServers`

    ```json
      "market-tools": {
        "command": "docker",
        "args": ["run", "-i", "--rm", "--init", "--env-file", "<path_to_env_file>", "mcp-server"]
      }
    ```

    The configuration file should look similar to this:
    ![](./docs/claude/config-server.png) 
  - restart Claude load the configuration and utilize the new tool




## Examples

  - ### Accept requests to check the prices of specific crypto assets.
    __Input__:
    > What is the price of Ethereum?

  - ### Determine whether the price of a given crypto asset is in a trending or ranging regime on the 1-hour chart, using both price data and technical analysis (TA) indicators
    __Input__:
      > Tell me if Bitcoin is currently ranging or trending using BTC/USDT symbol


## Notes:

  - 👉 Due to the limitations imposed upon by free plan of the APIs used, some results might not be satisfactory or of high value. Some endpoint might refuse to return data for certain _symbols_ or _indicators_ as they might not be part of the free plan. Another common issue with free plan usage is throttling. That is consequent requests are being rejected until the quota is freed up.

[Coin Market Cap API](https://coinmarketcap.com/api/documentation/v1/#)
[Technical Analysis Indicators API](https://taapi.io/indicators)

https://github.com/modelcontextprotocol/typescript-sdk
