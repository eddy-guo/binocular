import axios from "axios";
import Web3 from "web3";

export default async (req, res) => {
  const { my_address, address_filter, min_value, max_value, min_gas, max_gas } = req.body;

  try {
    const response = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: "account",
        action: "txlist",
        address: my_address.toLowerCase(),
        startblock: 0,
        sort: "desc",
        apikey: process.env.ETHERSCAN_KEY,
      },
    });

    const transactions = response.data.result;

    const filteredTransactions = transactions.filter((tx) => {
      const addressMatch = address_filter
        ? address_filter.includes(tx.to.toLowerCase()) ||
          address_filter.includes(tx.from.toLowerCase())
        : true;

      const minValueMatch = min_value ? BigInt(tx.value) >= Web3.utils.toWei(min_value, 'ether') : true;

      const maxValueMatch = max_value ? BigInt(tx.value) <= Web3.utils.toWei(max_value, 'ether') : true;

      const minGasMatch = min_gas ? BigInt(tx.gasPrice) * BigInt(tx.gasUsed) >= Web3.utils.toWei(min_gas, 'ether'): true;

      const maxGasMatch = max_gas ? BigInt(tx.gasPrice) * BigInt(tx.gasUsed) <= Web3.utils.toWei(max_gas, 'ether'): true;

      return addressMatch && minValueMatch && maxValueMatch && minGasMatch && maxGasMatch;
    });

    res.status(200).json({ count: filteredTransactions.length, filteredTransactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};
