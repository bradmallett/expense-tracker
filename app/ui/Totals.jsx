import getTotals from "../lib/actions/getTotals";
import { ArrowDownIcon, ArrowUpIcon} from '@heroicons/react/24/outline';
import clsx from "clsx";


export async function Totals({ selectedMonth }) {
    const { year, month } = selectedMonth;
    const totals = await getTotals(year, month);

    let totalYearExpense ;
    let totalMonthExpense;
    let totalYearIncome;
    let totalMonthIncome;
    const monthName = new Date(year, month - 1).toLocaleString('en-US', {month: 'short'}).toUpperCase();

    if (totals.length > 0) {
        for(const total of totals) {
            console.log(total);
            if (total.type === 'income') {
                totalYearIncome = Number(total.year_total) > 0 ? Number(total.year_total) : 0.00;
                totalMonthIncome = Number(total.month_total) > 0 ? Number(total.month_total) : 0.00;
            }
            if (total.type === 'expense') {
                totalYearExpense = Number(total.year_total) > 0 ? Number(total.year_total) : 0.00;
                totalMonthExpense = Number(total.month_total) > 0 ? Number(total.month_total) : 0.00;
            }
        }
    }
  
    const monthTotalDifference = totalMonthIncome - totalMonthExpense;


    // mt-2 mb-2 p-1 md:p-2 w-full md-w-11/12 flex justify-around text-xs border-b border-orange-600 m-auto
    return (
        <div className="mt-2 mb-2 p-2 w-11/12 flex justify-around text-xs border-b border-orange-600 m-auto">


            <div className="text-center w-1/3 flex justify-evenly">
                <div className="text-center">
                    <p className="text-green-500">{`${monthName} Income`}</p>
                    <p>{`$${totalMonthIncome / 100}`}</p>
                </div>
                <div className="text-center">
                    <p className="text-red-500">{`${monthName} Spent`}</p>
                    <p>{`$${totalMonthExpense / 100}`}</p>
                </div>
            </div>

            <div className="text-center w-1/3">
                <div className="flex justify-center">
                    <p>{`${monthName}`}</p>
                    <ArrowUpIcon className="size-4 text-green-500" />
                    <ArrowDownIcon className="size-4 text-red-500" />
                </div>
                <p className={clsx(monthTotalDifference > 0 ? "text-green-500" : "text-red-500",
                    "text-base font-bold")}
                >
                    {`$${monthTotalDifference / 100}`}
                    </p>
            </div>


            <div className="text-center w-1/3 flex justify-evenly">
                <div className="text-center">
                    <p className="text-red-500">{`${year} Spent`}</p>
                    <p>{`$${totalYearExpense / 100}`}</p>
                </div>
                <div className="text-center">
                    <p className="text-green-500">{`${year} Income`}</p>
                    <p>{`$${totalYearIncome / 100}`}</p>
                </div>
            </div>

        </div>
    )
}