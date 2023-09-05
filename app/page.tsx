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
// 0xf73dbce07870ae4eca6c64fe287d42177875d529
// 0x3057c07839f654f7fad4eb75d2dcbe093572cb11
//44996000000000000

// MISC ISSUES
// BigInt for dividing (show in eth instead of wei)
  // CAN MULTIPLY min_gas BY BIGINT 10^18, but ideally other side (think, divide one side, might as well multiply other)
// seperate from/to; have both (interactions), and have seperate (from a to b)

// NEXT UP
// txlist: date, transaction status(fail/success), contract creation, 
// tokentx,tokennfttx,token1155tx: token transfer
// HARD: events/event logs, contract specific calls/methods
