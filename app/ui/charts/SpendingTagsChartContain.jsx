import { getNameOfMonth } from "../../lib/utils";
import shapeMonthSpendingTagData from "../../lib/actions/charts/shapeMonthSpendingTagData";
import MonthSpendingChart from "./MonthSpendingChart";
import getTotals from "@/app/lib/actions/getTotals";

export default async function SpendingTagsChartContain({ selectedMonth, monthTransactionsData, spendingTagInstances}) {
    const { year, month } = selectedMonth;
    const monthName = getNameOfMonth(selectedMonth);
    const shapedMonthTagsData = shapeMonthSpendingTagData(monthTransactionsData, spendingTagInstances);
    const totals = await getTotals(year, month);
    let totalMonthExpense;

    for(const total of totals) {
        if (total.type === 'expense') {
            totalMonthExpense = Number(total.month_total) > 0 ? Number(total.month_total) : 0;
        }
    }


    if (shapedMonthTagsData.length === 0 || !shapeMonthSpendingTagData) {
        return <p className="mt-10 text-center">No Data. Add some Spending Tags to track your expenses!</p>
    }



    

    return (
        <div className="max-w-[530px] w-11/12 aspect-square mx-auto mt-10 text-center   md:mt-16 ">
            <h2 className="font-bold text-xl text-slate-300 mb-5 md:mb-10">{monthName} SPENDING</h2>
            <MonthSpendingChart shapedMonthTagsData={shapedMonthTagsData} totalMonthExpense={totalMonthExpense} monthName={monthName}/>
        </div>
    )
}