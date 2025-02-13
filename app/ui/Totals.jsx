import getTotals from "../lib/actions/getTotals";

export async function Totals({ selectedMonth }) {
    const { year, month } = selectedMonth;

    const totals = await getTotals(year, month);
    const totalYearExpense = Number(totals[0]?.year_total);
    const totalMonthExpense = Number(totals[0]?.month_total);
    const totalYearIncome = Number(totals[1]?.year_total);
    const totalMonthIncome = Number(totals[1]?.month_total);
    const monthTotalDifference = totalMonthIncome - totalMonthExpense;
    const monthName = new Date(year, month - 1).toLocaleString('en-US', {month: 'long'});

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
                <p>{`${monthName} DIFFERENCE`}</p>
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