import ExpenseForm from "./components/ExpenseForm";
import Expenses from "./components/Expenses";

export default async function Home() {

  return (
    <>
      <h1>EXPENSE TRACKER</h1>
      <ExpenseForm/>
      <Expenses/>
    </>
  );
}
