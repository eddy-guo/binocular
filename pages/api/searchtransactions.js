import axios from "axios";

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

      const minValueMatch = min_value ? BigInt(tx.value) >= BigInt(min_value) : true;

      const maxValueMatch = max_value ? BigInt(tx.value) <= BigInt(max_value): true;

      const minGasMatch = min_gas ? BigInt(tx.gasPrice) * BigInt(tx.gasUsed) >= min_gas: true;

      const maxGasMatch = max_gas ? BigInt(tx.gasPrice) * BigInt(tx.gasUsed) <= max_gas: true;

      return addressMatch && minValueMatch && maxValueMatch && minGasMatch && maxGasMatch;
    });

    res.status(200).json({ filteredTransactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};
