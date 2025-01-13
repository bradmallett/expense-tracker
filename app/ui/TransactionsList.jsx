import { getTransactions } from "../lib/actions";


export default async function TransactionsList() {
    const transactions = await getTransactions();

    return (
        <div>
          <h1>TRANSACTIONS</h1>
    
            {transactions.map(trans => (
              <div key={trans.id}>
                <div>
                  <h2>{trans.description}</h2>
                  <p>{trans.amount}</p>
                  <p>{trans.type}</p>
                </div>
              </div>
            ))}
    
        </div>
      );
};