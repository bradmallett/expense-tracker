import { getTransactions } from "../repositories/transactionsRepository";

const Transactions = async () => {
    const data = await getTransactions();
    console.log("--------DATA FROM TRANSACTIONS COMPONENT--------",data);

  return (
    <div>
        <h2>Transactions</h2>
        {data.Items.map((item) => (
            <div>
                <p>Name: {item.Name}</p>
                <p>Type: {item.Type}</p>
                <p>Date: {item.Date}</p>
                <p>Amount: ${item.Amount}</p>
                <br />
            </div>
        ))}
    </div>
  )
}

export default Transactions;

