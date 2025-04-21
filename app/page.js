
import TransactionContain from "./ui/TransactionContain";
import { Totals } from "./ui/Totals";
import MonthPicker from "./ui/MonthPicker";
import seedSpendingTagNames from "./lib/actions/seedSpendingTagNames";
import ChartContain from "./ui/charts/ChartContain";
import getMonthTransactions from "./lib/actions/getMonthTransactions";

export default async function Home( props ) {
  const searchParams = await props.searchParams;
  const monthTransactionsData = await getMonthTransactions(searchParams); // I put this fetch here in order to feed the ChartContain - which holds my Recharts component.
  await seedSpendingTagNames();

  return (
    <div className="w-full">
      <Totals selectedMonth={searchParams} />
      <div className="relative text-center mt-8">
        <p className="text-xs font-bold text-slate-300">SELECT MONTH</p>
        <MonthPicker />
      </div>
      <div className="w-full flex flex-col md:flex-row max-w-[1500px] mx-auto">
        <TransactionContain selectedMonth={searchParams} monthTransactionsData={monthTransactionsData}/>
        <ChartContain selectedMonth={searchParams} monthTransactionsData={monthTransactionsData}/>
      </div>
    </div>
  );
}


