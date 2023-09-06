"use client";

import { useState } from "react";
import axios from "axios";

const TransactionSearch = () => {
  const [myAddress, setMyAddress] = useState("");
  const [addressFilter, setAddressFilter] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [minGas, setMinGas] = useState("");
  const [maxGas, setMaxGas] = useState("");
  const [txnStatus, setTxnStatus] = useState("");
  const [contractCreation, setContractCreation] = useState("");

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
        max_value: maxValue,
        min_gas: minGas,
        max_gas: maxGas,
        status: txnStatus,
        contract_creation: contractCreation,
      });
      setResult(response.data);
    } catch (error) {
      console.log(error);
      setResult({ error: "Invalid input" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Your Address"
        value={myAddress}
        onChange={(e) => setMyAddress(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Address Filter"
        value={addressFilter}
        onChange={(e) => setAddressFilter(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Min Value"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Max Value"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Min Gas"
        value={minGas}
        onChange={(e) => setMinGas(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Max Gas"
        value={maxGas}
        onChange={(e) => setMaxGas(e.target.value)}
      />
      <br />
      <select value={txnStatus} onChange={(e) => setTxnStatus(e.target.value)}>
        <option value="" disabled>Filter by Status</option>
        <option value="both">Any</option>
        <option value="0">Successful</option>
        <option value="1">Failed</option>
      </select>
      <br />
      <select value={contractCreation} onChange={(e) => setContractCreation(e.target.value)}>
        <option value="" disabled>Filter by Contract Creation</option>
        <option value="both">Any</option>
        <option value="true">Contract Created</option>
        <option value="false">No Contract Created</option>
      </select>
      <br />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}

      <div>{result && <pre>{JSON.stringify(result, null, 2)}</pre>}</div>
    </div>
  );
};

export default TransactionSearch;
