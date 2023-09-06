import TransactionSearch from '../components/transactionsearch';

export default function Home() {
  return (
    <div>
      <h1>Transaction Search</h1>
      <TransactionSearch />
    </div>
  );
}

// TEST VALUES
// default: 0xf73dbce07870ae4eca6c64fe287d42177875d529
// contract creation: 0x9aa99c23f67c81701c772b106b4f83f6e858dd2e

// MISC ISSUES
// seperate from/to; have both (interactions), and have seperate (from a to b)

// NEXT UP
// tokentx,tokennfttx,token1155tx: token transfer
// HARD: events/event logs, contract specific calls/methods, date (implement calendar)
