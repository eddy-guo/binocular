import axios from "axios";

export default async (req, res) => {
  const { my_address, address_filter, min_value } = req.body;

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

      const minValueMatch = min_value ? tx.value >= min_value : true;

      return addressMatch && minValueMatch;
    });

    res.status(200).json({ filteredTransactions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};
