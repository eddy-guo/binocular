import TransactionSearch from '../components/transactionsearch';

export default function Home() {
  return (
    <div>
      <h1>Transaction Search</h1>
      <TransactionSearch />
    </div>
  );
}


// 0xf73dbce07870ae4eca6c64fe287d42177875d529, 0x3057c07839f654f7fad4eb75d2dcbe093572cb11

// NEXT UP
// start there, then add more parameters (dependent on api)
// txlist: transaction value, gas, date, transaction status(fail/success), contract creation, contract method call
// tokentx,tokennfttx,token1155tx: token transfer
// HARD: events/event logs
// seperate from/to; have both (interactions), and have seperate (from a to b)