import axios from "axios";
import Web3 from "web3";

export default async (req, res) => {
  const {
    my_address,
    min_gas,
    max_gas,
    token_id,
    token_name,
    token_symbol,
    contract_address,
  } = req.body;

  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "token1155tx",
        address: my_address.toLowerCase(),
        startblock: 0,
        sort: "desc",
        apikey: process.env.ETHERSCAN_KEY,
      },
    });

    const transactions = response.data.result;

    const filteredTransactions = transactions.filter((tx) => {
      const minGasMatch = min_gas
        ? BigInt(tx.gasPrice) * BigInt(tx.gasUsed) >=
          Web3.utils.toWei(min_gas, "ether")
        : true;

      const maxGasMatch = max_gas
        ? BigInt(tx.gasPrice) * BigInt(tx.gasUsed) <=
          Web3.utils.toWei(max_gas, "ether")
        : true;

      const tokenIdMatch = token_id ? tx.tokenID == token_id : true;

      const tokenNameMatch = token_name ? tx.tokenName == token_name : true;

      const tokenSymbolMatch = token_symbol
        ? tx.tokenSymbol == token_symbol
        : true;

      const contractAddressMatch = contract_address
        ? tx.contractAddress == contract_address
        : true;

      return (
        minGasMatch &&
        maxGasMatch &&
        tokenIdMatch &&
        tokenNameMatch &&
        tokenSymbolMatch &&
        contractAddressMatch
      );
    });

    res
      .status(200)
      .json({ count: filteredTransactions.length, filteredTransactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};
