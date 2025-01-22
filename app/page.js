import  TransactionsList from "./ui/TransactionsList";
import AddTransaction from "./ui/AddTransaction";
import SelectMonth from "./ui/SelectMonth";
import { getMonthTransactions } from "./lib/actions";


export default async function Home( props ) {
  const searchParams = await props.searchParams;
  const { year, month } = searchParams;

  const monthYear = {
    year,
    month
  }

  const monthTransactions = await getMonthTransactions(year, month);

  return (
    <div>
      <SelectMonth />
      <TransactionsList monthTransactions={monthTransactions}/>
      <AddTransaction monthTransactions={monthTransactions}/>
    </div>
  );
}


