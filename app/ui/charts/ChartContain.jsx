
import CategoriesChart from "./CategoriesChart"
import shapeCategoryData from "@/app/lib/actions/charts/shapeCategoryData";


export default function ChartContain({ selectedMonth, monthTransactionsData}) {

    const categoryChartData = shapeCategoryData(monthTransactionsData); 

    return (
        <div className="w-[50%] p-5 mt-20 h-[500px] bg-slate-900">
            <CategoriesChart categoryChartData={categoryChartData} />


        </div>
    )




}