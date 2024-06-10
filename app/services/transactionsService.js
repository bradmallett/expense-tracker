export const addExpenseItem = async (expenseItem) => {
    try {
        const res = await fetch('/api/expense', {
            method: 'POST',
            body: JSON.stringify(expenseItem)
          });
      
          const data = await res.json();
    } catch (error) {
        console.error('Error sending POST request: ', error)
    }
};


export const addIncomeItem = async (incomeItem) => {
    try {
        const res = await fetch('/api/income', {
            method: 'POST',
            body: JSON.stringify(incomeItem)
          });
      
          const data = await res.json();
    } catch (error) {
        console.error('Error sending POST request: ', error)
    }
};
