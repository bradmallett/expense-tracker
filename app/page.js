import Transactions from "./components/Transactions";
import Link from "next/link";
import AddExpenseModal from "./components/AddExpenseModal";
import AddIncomeModal from "./components/AddIncomeModal";


export default function Home({ searchParams }) {
  // const showExpenseForm = searchParams.showExpenseForm === "true";
  // const showIncomeForm = searchParams.showIncomeForm === "true";

  return (
    <>
      <h1>EXPENSE TRACKER</h1>
      <Transactions/>
      {/* {showExpenseForm && <AddExpenseModal />}
      {showIncomeForm && <AddIncomeModal />} */}

      <Link href="/?showExpenseForm=true">
        <h2>ADD EXPENSE</h2> 
      </Link>

      <Link href="/?showIncomeForm=true">
        <h2>ADD INCOME</h2> 
      </Link>
    </>
  );
}


