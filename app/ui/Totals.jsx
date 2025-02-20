import getTotals from "../lib/actions/getTotals";

export async function Totals({ selectedMonth }) {
    const { year, month } = selectedMonth;

    const totals = await getTotals(year, month);

    let totalYearExpense = 0;
    let totalMonthExpense = 0;
    let totalYearIncome = 0;
    let totalMonthIncome = 0;
    const monthName = new Date(year, month - 1).toLocaleString('en-US', {month: 'long'});

    if (totals.length > 0) {
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
    }

    const monthTotalDifference = totalMonthIncome - totalMonthExpense;

    return (
        <div className="totals-contain">
            <div>
                <p>{`${year} INCOME`}</p>
                <p>{`$${totalYearIncome / 100}`}</p>
            </div>
            <div>
                <p>{`${monthName} INCOME`}</p>
                <p>{`$${totalMonthIncome / 100}`}</p>
            </div>
            <div>
                <p>{`${monthName} INCOME VS SPENDING`}</p>
                <p>{`$${monthTotalDifference / 100}`}</p>
            </div>
            <div>
                <p>{`${monthName} SPENDING`}</p>
                <p>{`$${totalMonthExpense / 100}`}</p>
            </div>
            <div>
                <p>{`${year} SPENDING`}</p>
                <p>{`$${totalYearExpense / 100}`}</p>
            </div>
        </div>
    )
}