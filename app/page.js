import SelectMonth from "./ui/SelectMonth";
import TransactionContain from "./ui/TransactionContain";
import { Totals } from "./ui/Totals";

export default async function Home( props ) {
  const searchParams = await props.searchParams;


  return (
    <div className="w-full">
      <SelectMonth />
      <Totals selectedMonth={searchParams} />
      <TransactionContain selectedMonth={searchParams}/>
    </div>
  );
}


