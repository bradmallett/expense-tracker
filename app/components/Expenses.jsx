import { getExpenses } from "../repositories/expenseRepository";


const Expenses = async () => {
    const data = await getExpenses();
    console.log(data);

  return (
    <div>
        <h2>EXPENSES</h2>
        {data.Items.map((item) => (
            <div>
                <p>Name: {item.ExpenseName}</p>
                <p>Amount: ${item.ExpenseAmount}</p>
                <p>Cateogory: {item.ExpenseCategory}</p>
                <br />
            </div>
        ))}
    </div>
  )
}

export default Expenses;

