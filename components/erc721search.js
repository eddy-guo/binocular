"use client";

import { useState } from "react";
import axios from "axios";

const ERC721Search = () => {
  const [myAddress, setMyAddress] = useState("");
  const [minGas, setMinGas] = useState("");
  const [maxGas, setMaxGas] = useState("");
  const [startBlock, setStartBlock] = useState("");
  const [endBlock, setEndBlock] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setResult();
    try {
      const response = await axios.post("/api/erc721", {
        my_address: myAddress,
        min_gas: minGas,
        max_gas: maxGas,
        start_block: startBlock,
        end_block: endBlock,
        token_id: tokenId,
        token_name: tokenName,
        token_symbol: tokenSymbol,
        contract_address: contractAddress,
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
      <input
        type="text"
        placeholder="Start Block"
        value={startBlock}
        onChange={(e) => setStartBlock(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="End Block"
        value={endBlock}
        onChange={(e) => setEndBlock(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Token Name"
        value={tokenName}
        onChange={(e) => setTokenName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Token Symbol"
        value={tokenSymbol}
        onChange={(e) => setTokenSymbol(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Contract Address"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <br />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}

      <div>{result && <pre>{JSON.stringify(result, null, 2)}</pre>}</div>
    </div>
  );
};

export default ERC721Search;
