import SelectMonth from "./ui/SelectMonth";
import Transactions from "./ui/Transactions";
import { Totals } from "./ui/Totals";

export default async function Home( props ) {
  const searchParams = await props.searchParams;


  return (
    <div>
      <SelectMonth />
      <Totals selectedMonth={searchParams} />
      <Transactions selectedMonth={searchParams}/>
    </div>
  );
}


