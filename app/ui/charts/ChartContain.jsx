

// import CategoriesChart from "./CategoriesChart"
import { getNameOfMonth } from "../../lib/utils";
// import shapeCategoryData from "../../lib/actions/charts/shapeCategoryData";


export default function ChartContain({ selectedMonth, monthTransactionsData}) {
    const monthName = getNameOfMonth(selectedMonth);
    // const categoryChartData = shapeCategoryData(monthTransactionsData);
    console.log(monthTransactionsData)


    return (
        <div className="m-0 md:m-5 mt-10 md:mt-16 p-1 md:p-3 pb-6 w-full md:w-1/2 h-[80vw] md:h-[40vw] max-h-[600px] bg-slate-900 text-center text-slate-300">
            <h2 className="font-bold text-xl text-purple-600">BUDGET GOALS</h2>
            <p>PERCENTAGES OF SPENT {monthName} INCOME</p>
            {/* <CategoriesChart categoryChartData={categoryChartData} /> */}
        </div>
    )
}