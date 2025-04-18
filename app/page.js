
import TransactionContain from "./ui/TransactionContain";
import { Totals } from "./ui/Totals";
import MonthPicker from "./ui/MonthPicker";
import seedSpendingTagNames from "./lib/actions/seedSpendingTagNames";
import ChartContain from "./ui/charts/ChartContain";
import getMonthTransactions from "./lib/actions/getMonthTransactions";

export default async function Home( props ) {
  const searchParams = await props.searchParams;
  const monthTransactionsData = await getMonthTransactions(searchParams);
  await seedSpendingTagNames();

  return (
    <div className="w-full">
      <Totals selectedMonth={searchParams} />
      <div className="relative text-center mt-4">
        <p className="text-xs font-bold text-slate-300">SELECT MONTH</p>
        <MonthPicker />
      </div>
      <div className="w-full flex">
        <TransactionContain selectedMonth={searchParams} monthTransactionsData={monthTransactionsData}/>
        <ChartContain selectedMonth={searchParams} monthTransactionsData={monthTransactionsData}/>
      </div>
    </div>
  );
}


