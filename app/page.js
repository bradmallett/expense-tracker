import SelectMonth from "./ui/SelectMonth";
import Transactions from "./ui/Transactions";


export default async function Home( props ) {
  const searchParams = await props.searchParams;


  return (
    <div>
      <SelectMonth />
      <Transactions selectedMonth={searchParams}/>
    </div>
  );
}


