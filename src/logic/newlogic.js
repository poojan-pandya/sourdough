export function calculateTotalSpent(transactions) {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].category !== "Income") {
            total += transactions[i].amount;
        }
    }
    return total;
}