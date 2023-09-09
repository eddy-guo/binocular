"use client";

import TransactionSearch from "../components/transactionsearch";
import ERC20Search from "../components/erc20search";
import ERC721Search from "../components/erc721search";
import ERC1155Search from "../components/erc1155search";
import { useState } from "react";

export default function Home() {
  const [temp, setTemp] = useState("");

  return (
    <>
      <select value={temp} onChange={(e) => setTemp(e.target.value)}>
        <option value="" disabled>
          Select Transaction Search Type
        </option>
        <option value="eth">Ethereum</option>
        <option value="erc20">ERC20</option>
        <option value="erc721">ERC721</option>
        <option value="erc1155">ERC1155</option>
      </select>
      <div>
        {temp == "eth" && (
          <>
            <h1>Ethereum Search</h1>
            <TransactionSearch />
          </>
        )}
      </div>
      <div>
        {temp == "erc20" && (
          <>
            <h1>ERC20 Search</h1>
            <ERC20Search />
          </>
        )}
      </div>
      <div>
        {temp == "erc721" && (
          <>
            <h1>ERC721 Search</h1>
            <ERC721Search />
          </>
        )}
      </div>
      <div>
        {temp == "erc1155" && (
          <>
            <h1>ERC1155 Search</h1>
            <ERC1155Search />
          </>
        )}
      </div>
    </>
  );
}

// TEST VALUES
// default: 0xf73dbce07870ae4eca6c64fe287d42177875d529

// MISC ISSUES
// From/To - be able to search from "from", "to", or both

// NEXT UP
// blocknumber (similar to date, but do min/max)
// HARD: events/event logs, contract specific calls/methods, date (implement calendar)
