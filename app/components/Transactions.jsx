import { getTransactions } from "../repositories/transactionsRepository";
//import Link from "next/link";

const Transactions = async ({searchParams}) => {

  // ---- thinking through accessing yearMonth by searchParams-----
  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  // const currentYearMonth = `${year}-${month}`;
  // const yearMonth = searchParams?.yearMonth || currentYearMonth;

  const data = await getTransactions();
  const formatAmount = (amount) => {
    return amount.toFixed(2);
  }

  return (
    <div>
        <h2>Transactions</h2>
        {data.Items.map(({Name, Type, Date, Amount}, index) => (
          
            <div key={index}>
                <p>Name: {Name}</p>
                <p>Type: {Type}</p>
                <p>Date: {Date}</p>
                <p>Amount: ${formatAmount(Amount)}</p>
                <br />
            </div>
        ))}
    </div>
  )
}

export default Transactions;

