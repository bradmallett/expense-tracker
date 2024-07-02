import { getMonthTransactions } from "../repositories/transactionsRepository";
import Link from "next/link";

const Transactions = async ({searchParams}) => {
  const yearMonth = searchParams?.yearMonth || getCurrentYearMonth();
  const data = await getMonthTransactions(yearMonth);
  console.log('Search Params: ' + searchParams);
  console.log('YearMonth: ' + yearMonth);

  function getCurrentYearMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYearMonth = `${year}-${month}`;
    
    return currentYearMonth;
  }

  function getPreviousMonth() {
    const [year, month] = yearMonth.split('-');
    const currentDate = new Date(year, month -1);
    currentDate.setMonth(currentDate.getMonth(month - 1));
    const currentYear = currentDate.getFullYear();
    const previousMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    return `${currentYear}-${previousMonth}`;
  }

  function getNextMonth() {
    const [year, month] = yearMonth.split('-');
    const currentDate = new Date(year, month - 1);
    currentDate.setMonth(currentDate.getMonth(month + 1));
    const currentYear = currentDate.getFullYear();
    const nextMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    return `${currentYear}-${nextMonth}`;
  }

  const formatAmount = (amount) => {
    return amount.toFixed(2);
  }

  return (
    <div>
        <h2>Transactions</h2>
        <Link href={`/?yearMonth=${getPreviousMonth()}`}><h6>PREVIOUS MONTH</h6></Link>
        <Link href={`/?yearMonth=${getNextMonth()}`}><h6>NEXT MONTH</h6></Link>
        <h3>{yearMonth}</h3>
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

