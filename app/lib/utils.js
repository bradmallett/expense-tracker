
export function updateDayBalance(type, currentBalance, amount) {
    switch(type) {
        case 'expense':
            return (currentBalance - amount);

        case 'income':
            return currentBalance + amount;

        case 'savings':
            return currentBalance;
            
        default:
            return currentBalance;
    }
}

export function centsToDollars(cents) {
    return (cents / 100).toFixed(2);
}



export function formatCentsToDollars(cents) {
    let amount =  cents / 100;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}

export function formatNumberToPercent(number) {
    return `${number}%`;
}

export function getNameOfMonth(selectedMonth) {
    const rawMonth = selectedMonth?.month?.trim();
    const monthIndex = parseInt(rawMonth, 10) - 1; // JS months are 0-indexed
    const date = new Date(2025, monthIndex, 1); // year, monthIndex, day

    return date.toLocaleString('default', { month: 'long' }).toUpperCase();
}
