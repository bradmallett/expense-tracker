
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