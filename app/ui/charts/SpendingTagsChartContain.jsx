import { getNameOfMonth } from "../../lib/utils";
import shapeMonthSpendingTagData from "../../lib/actions/charts/shapeMonthSpendingTagData";
import MonthSpendingChart from "./MonthSpendingChart";

export default function SpendingTagsChartContain({ selectedMonth, monthTransactionsData, spendingTagInstances}) {
    const monthName = getNameOfMonth(selectedMonth);
    const shapedMonthTagsData = shapeMonthSpendingTagData(monthTransactionsData, spendingTagInstances);
    

    return (
        <div className="m-0 md:m-5 mt-10 md:mt-16 p-1 md:p-3 pb-6 w-full h-[80vw] md:h-[40vw] max-h-[600px] bg-slate-900 text-center text-slate-300">
            <h2 className="font-bold text-xl text-purple-600">{monthName} SPENDING</h2>
            <MonthSpendingChart shapedMonthTagsData={shapedMonthTagsData}/>
            {/* <YearSpendingChart  /> */}
        </div>
    )
}