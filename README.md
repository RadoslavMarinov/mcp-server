

## 🔧 Add environment files
  - Create a new `.env` file based on the example file `.env.example`

    ```sh
    cp .env.example .env
    ```

  - Enter your values values for the two APIs __COIN_MARKET_CAP_API_KEY__ and __TA_API_KEY__

## 🐳 Build the Docker image:

  ```sh
  docker build -t mcp-server .
  ```

## 🧠 Integration with Claude

  - Open Claude desktop
  - Go to __Settings → Developer → Edit Config__
  - Add the following entry to the `mcpServers`

    ```json
      "market-tools": {
        "command": "docker",
        "args": ["run", "-i", "--rm", "--init", "--env-file", "<path_to_env_file>", "mcp-server"]
      }
    ```

    The configuration file should look similar to this:

    ![](./docs/claude/config-server.png) 
  - restart Claude to load the configuration and utilize the new tool




## ✏️ Examples

  - ### ✅ Check the price of specific crypto assets.
    __Example__:
    > What is the price of Ethereum?

  - ### 📈 Determine if a crypto asset is trending or ranging on the 1-hour chart using TA indicators.
    __Example__:
      > Tell me if Bitcoin is currently ranging or trending using BTC/USDT symbol

## 🔗 External resources
  -  [Coin Market Cap API](https://coinmarketcap.com/api/documentation/v1/#)

  - [Technical Analysis Indicators API](https://taapi.io/indicators)


## 🗒 Notes:

  - 👉 Due to limitations imposed by the free plans of the APIs used, some results might be inaccurate or unavailable. Some endpoints may refuse to return data for certain symbols or indicators if they are not part of the free tier. Another common issue with free plans is throttling, where consecutive requests are rejected until the quota is refreshed.
    
    ❌ Example error:
    > Error fetching data: Too Many Requests

