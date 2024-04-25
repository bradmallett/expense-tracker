export const addExpenseItem = async (item) => {
    try {
        const res = await fetch('/api/expenses', {
            method: 'POST',
            body: JSON.stringify(item)
          });
      
          const data = await res.json();
          console.log('-------FRONT END RESPONSE DATA-------', data);
    } catch (error) {
        console.error('Error sending POST request: ', error)
    }
};

