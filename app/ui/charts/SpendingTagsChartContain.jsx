import { getNameOfMonth } from "../../lib/utils";
import shapeMonthSpendingTagData from "../../lib/actions/charts/shapeMonthSpendingTagData";
import MonthSpendingChart from "./MonthSpendingChart";
import getTotals from "@/app/lib/actions/getTotals";

export default async function SpendingTagsChartContain({ selectedMonth, monthTransactionsData, spendingTagInstances}) {
    const { year, month } = selectedMonth;
    const monthName = getNameOfMonth(selectedMonth);
    const shapedMonthTagsData = shapeMonthSpendingTagData(monthTransactionsData, spendingTagInstances);
    const totals = await getTotals(year, month);
    let totalMonthIncome;

    for(const total of totals) {
        if (total.type === 'income') {
            totalMonthIncome = Number(total.month_total) > 0 ? Number(total.month_total) : 0;
        }
    }

    return (
        <div className="max-w-[530px] w-11/12 aspect-square mx-auto mt-10 text-center   md:mt-16 ">
            <h2 className="font-bold text-xl text-slate-300 mb-5 md:mb-10">{monthName} SPENDING</h2>
            <MonthSpendingChart shapedMonthTagsData={shapedMonthTagsData} totalMonthIncome={totalMonthIncome} monthName={monthName}/>
        </div>
    )
}