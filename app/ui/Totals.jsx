import getTotals from "../lib/actions/getTotals";
import { ArrowDownIcon, ArrowUpIcon} from '@heroicons/react/24/outline';
import clsx from "clsx";
import { formatCentsToDollars } from "../lib/utils";
import Triangle from "./Triangle";


export async function Totals({ selectedMonth }) {
    const { year, month } = selectedMonth;
    const totals = await getTotals(year, month);
    
        let totalYearExpense = 0;
        let totalMonthExpense = 0;
        let totalYearIncome = 0;
        let totalMonthIncome = 0;
        let monthTotalDifference = 0;
        const monthName = new Date(year, month - 1).toLocaleString('en-US', {month: 'short'}).toUpperCase();


        for(const total of totals) {
            if (total.type === 'income') {
                totalYearIncome = Number(total.year_total) > 0 ? Number(total.year_total) : 0;
                totalMonthIncome = Number(total.month_total) > 0 ? Number(total.month_total) : 0;
            }
            if (total.type === 'expense') {
                totalYearExpense = Number(total.year_total) > 0 ? Number(total.year_total) : 0;
                totalMonthExpense = Number(total.month_total) > 0 ? Number(total.month_total) : 0;
            }
        }

        monthTotalDifference = totalMonthIncome - totalMonthExpense;


        return (
            <div className="w-100 pt-5 pb-5 bg-slate-800">
                <div className="w-100 max-w-[1200px] mx-auto flex justify-evenly">


                <div className="flex w-1/3 justify-center">
                    <div className="flex flex-col items-center">
                        <Triangle direction={'up'} size={'w-5 h-5' } color={'text-green-600'} />
                        <p className="text-xs text-green-600 font-bold">{`${formatCentsToDollars(totalMonthIncome)}`}</p>
                    </div>
                    <p className="font-bold text-sm">{monthName}</p>
                    <div className="flex flex-col items-center">
                        <Triangle direction={'down'} size={'w-5 h-5' } color={'text-red-600'} />
                        <p className="text-xs text-red-600 font-bold">{`${formatCentsToDollars(totalMonthExpense)}`}</p>
                    </div>
                </div>




                <div className="w-[3px] h-[30px] bg-slate-300 rounded-sm md:hidden"></div>

                <div className="hidden md:block text-center w-1/3 font-bold text-sm md:show">
                   <div className="flex justify-center">
                     <p>{`${monthName}`}</p>
                         <ArrowUpIcon className="size-4 text-green-500 font-bold" />
                         <ArrowDownIcon className="size-4 text-red-500 font-bold" />
                     </div>
                     <p className={clsx(monthTotalDifference > 0 ? "text-green-600" : "text-red-600")}
                     >
                         {`${formatCentsToDollars(monthTotalDifference)}`}
                         </p>
                 </div>

                


                <div className="flex w-1/3 justify-center">
                    <div className="flex flex-col items-center">
                        <Triangle direction={'up'} size={'w-5 h-5' } color={'text-green-600'}/>
                        <p className="text-xs text-green-600 font-bold">{`${formatCentsToDollars(totalYearIncome)}`}</p>
                    </div>
                    <p className="font-bold text-sm">{year}</p>
                    <div className="flex flex-col items-center">
                        <Triangle direction={'down'} size={'w-5 h-5' } color={'text-red-600'}/>
                        <p className="text-xs text-red-600 font-bold">{`${formatCentsToDollars(totalYearExpense)}`}</p>
                    </div>
                </div>


                </div>
            </div>



















            // <div className="mt-2 md:p-2 md:w-11/12 flex justify-around text-xs border-b border-orange-600 max-w-[1480px] mx-auto">
            //     <div className="text-center w-1/3 flex justify-evenly">
            //         <div className="text-center">
            //             <p className="text-green-500">{`${monthName} Income`}</p>
            //             <p>{`${formatCentsToDollars(totalMonthIncome)}`}</p>
            //         </div>
            //         <div className="text-center">
            //             <p className="text-red-500">{`${monthName} Spent`}</p>
            //             <p>{`${formatCentsToDollars(totalMonthExpense)}`}</p>
            //         </div>
            //     </div>
            //     <div className="text-center w-1/3">
            //         <div className="flex justify-center">
            //             <p>{`${monthName}`}</p>
            //             <ArrowUpIcon className="size-4 text-green-500" />
            //             <ArrowDownIcon className="size-4 text-red-500" />
            //         </div>
            //         <p className={clsx(monthTotalDifference > 0 ? "text-green-500" : "text-red-500",
            //             "text-base font-bold")}
            //         >
            //             {`${formatCentsToDollars(monthTotalDifference)}`}
            //             </p>
            //     </div>
            //     <div className="text-center w-1/3 flex justify-evenly">
            //         <div className="text-center">
            //             <p className="text-red-500">{`${year} Spent`}</p>
            //             <p>{`${formatCentsToDollars(totalYearExpense)}`}</p>
            //         </div>
            //         <div className="text-center">
            //             <p className="text-green-500">{`${year} Income`}</p>
            //             <p>{`${formatCentsToDollars(totalYearIncome)}`}</p>
            //         </div>
            //     </div>
            // </div>
        )
    
}