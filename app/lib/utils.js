
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
    return cents / 100;
}

