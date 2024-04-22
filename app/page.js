'use client'
import ExpenseForm from "./components/ExpenseForm";

export default function Home() {
const  addExpenseItem = async (item) => {
  const res = await fetch('/api/expenses', {
    method: 'POST',
    body: item
  });
}

  return (
    <>
      <h1>EXPENSE TRACKER</h1>
      <ExpenseForm addExpenseItem={addExpenseItem}/>
    </>
  );
}
