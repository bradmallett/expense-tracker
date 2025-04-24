
import TransactionContain from "./ui/TransactionContain";
import { Totals } from "./ui/Totals";
import MonthPicker from "./ui/MonthPicker";
import seedSpendingTagNames from "./lib/actions/seedSpendingTagNames";
import CategoriesChartContain from "./ui/charts/CategoriesChartContain";
import getMonthTransactions from "./lib/actions/getMonthTransactions";
import getMonthSpendingTagInstances from "./lib/actions/getMonthSpendingTagInstances";
import SpendingTagsChartContain from "./ui/charts/SpendingTagsChartContain";

export default async function Home( props ) {
  const searchParams = await props.searchParams;
  const monthTransactionsData = await getMonthTransactions(searchParams);
  const monthID = monthTransactionsData?.month?.id || null;
  const transactions = monthTransactionsData?.transactions || [];


  const spendingTagInstances =  await getMonthSpendingTagInstances(monthTransactionsData?.transactions);
  await seedSpendingTagNames();

  return (
    <div className="w-full">
      <Totals selectedMonth={searchParams}/>
      <div className="relative text-center mt-8">
        <p className="text-xs font-bold text-slate-300">SELECT MONTH</p>
        <MonthPicker />
      </div>

      <div className="w-full flex flex-col md:flex-row max-w-[1500px] mx-auto">
        <TransactionContain selectedMonth={searchParams} monthTransactionsData={monthTransactionsData} spendingTagInstances={spendingTagInstances}/>



        {transactions.length > 0 && monthID != null &&
          <div className="w-full md:w-1/2">
            <SpendingTagsChartContain selectedMonth={searchParams} monthTransactionsData={monthTransactionsData} spendingTagInstances={spendingTagInstances}/>
            <CategoriesChartContain selectedMonth={searchParams} monthTransactionsData={monthTransactionsData}/>
          </div>
        }


      </div>
    </div>
  );
}


