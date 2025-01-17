import  TransactionsList from "./ui/TransactionsList";
import AddTransaction from "./ui/AddTransaction";

export default async function Home() {

  return (
    <div>
      <AddTransaction />
      <TransactionsList />
    </div>
  );
}


