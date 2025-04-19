
import CategoriesChart from "./CategoriesChart"
import shapeCategoryData from "@/app/lib/actions/charts/shapeCategoryData";


export default function ChartContain({ selectedMonth, monthTransactionsData}) {

    const categoryChartData = shapeCategoryData(monthTransactionsData); 

    return (
        <div className="mt-16 w-1/2 h-[40vw] max-h-[600px] bg-slate-900">
            <CategoriesChart categoryChartData={categoryChartData} />
        </div>
    )




}