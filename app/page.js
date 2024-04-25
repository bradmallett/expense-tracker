import ExpenseForm from "./components/ExpenseForm";
import { getExpenses } from "./api/expenses/expenseRepository";

export default async function Home() {
  //const expenses = await getExpenses();

  return (
    <>
      <h1>EXPENSE TRACKER</h1>
      <ExpenseForm/>
    </>
  );
}
