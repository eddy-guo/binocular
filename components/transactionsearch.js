"use client";

import { useState } from "react";
import axios from "axios";

const TransactionSearch = () => {
  const [myAddress, setMyAddress] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [minValue, setMinValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResult();
    try {
      const response = await axios.post("/api/searchtransactions", {
        my_address: myAddress,
        address_filter: addressFilter,
        min_value: minValue,
      });
      setResult(response.data);
    } catch (error) {
      setResult({ error: "Invalid input" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your address"
        value={myAddress}
        onChange={(e) => setMyAddress(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter address filter"
        value={addressFilter}
        onChange={(e) => setAddressFilter(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter min txn value"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />
      <br />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}

      <div>{result && <pre>{JSON.stringify(result, null, 2)}</pre>}</div>
    </div>
  );
};

export default TransactionSearch;