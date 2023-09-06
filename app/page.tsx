import TransactionSearch from "../components/transactionsearch";
import ERC20Search from "../components/erc20search";
import ERC721Search from "../components/erc721search";
import ERC1155Search from "../components/erc1155search";


export default function Home() {
  return (
    <>
      <div>
        <h1>Transaction Search</h1>
        <TransactionSearch />
      </div>
      <div>
        <h1>ERC20 Search</h1>
        <ERC20Search />
      </div>
      <div>
        <h1>ERC721 Search</h1>
        <ERC721Search />
      </div>
      <div>
        <h1>ERC1155 Search</h1>
        <ERC1155Search />
      </div>
    </>
  );
}

// TEST VALUES
// default: 0xf73dbce07870ae4eca6c64fe287d42177875d529

// MISC ISSUES
// From/To - be able to search from "from", "to", or both

// NEXT UP
// conditional rendering
// blocknumber (similar to date, but do min/max)
// HARD: events/event logs, contract specific calls/methods, date (implement calendar)
