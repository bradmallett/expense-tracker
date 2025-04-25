

import CategoriesChart from "./CategoriesChart"
import { getNameOfMonth } from "../../lib/utils";
import shapeCategoryData from "../../lib/actions/charts/shapeCategoryData";


export default function CategoriesChartContain({ selectedMonth, monthTransactionsData}) {
    const monthName = getNameOfMonth(selectedMonth);
    const categoryChartData = shapeCategoryData(monthTransactionsData);

    if(!categoryChartData || categoryChartData.length === 0) {
        return <p className="m-0 md:m-5 mt-10 md:mt-10 p-1 md:p-3 pb-6 w-full h-[80vw] md:h-[30vw] max-h-[600px] bg-slate-900 text-center text-slate-300">Enter some income to view income percentage chart!</p>
    }



    return (
        // <div className="m-0 md:m-5 mt-10 md:mt-10 p-1 md:p-3 pb-6 w-full h-[80vw] md:h-[30vw] max-h-[600px] bg-slate-900 text-center text-slate-300">
        <div className="max-w-[530px] w-11/12 aspect-square mx-auto mt-16 mb-10 pt-5 text-center   bg-slate-900">
            <h2 className="font-bold text-xl text-purple-600">BUDGET GOALS</h2>
            <p>PERCENTAGE OF SPENT {monthName} INCOME</p>
            <CategoriesChart categoryChartData={categoryChartData} />
        </div>
    )
}