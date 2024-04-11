'use client'
import ExpenseForm from "./components/ExpenseForm";

export default function Home() {
const addExpenseItem = (item) => {
  console.log(item)
}
  return (
    <>
      <h1>EXPENSE TRACKER</h1>
      <ExpenseForm addExpenseItem={addExpenseItem}/>
    </>
  );
}
