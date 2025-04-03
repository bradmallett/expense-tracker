
import TransactionContain from "./ui/TransactionContain";
import { Totals } from "./ui/Totals";
import MonthPicker from "./ui/MonthPicker";

export default async function Home( props ) {
  const searchParams = await props.searchParams;


  return (
    <div className="w-full">
      <Totals selectedMonth={searchParams} />
      <div className="relative text-center mt-4">
        <p className="text-xs font-bold text-slate-300">SELECT MONTH</p>
        <MonthPicker />
      </div>
      <TransactionContain selectedMonth={searchParams}/>
    </div>
  );
}


