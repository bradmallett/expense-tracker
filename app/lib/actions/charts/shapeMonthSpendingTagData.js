import chroma from "chroma-js";

export default function shapeMonthSpendingTagData(monthTransactionsData, spendingTagInstances) {
    if (!monthTransactionsData || !spendingTagInstances) return [];
    let tagsMap = new Map();

    if(spendingTagInstances.length > 0) {
        for(const tag of spendingTagInstances) {
            const transaction = monthTransactionsData.transactions.find((trans) => trans.id === tag.transaction_id);

            if (transaction) {
                const transAmount = transaction.amount;

                if(tagsMap.has(tag.tag_name)) {
                    let tagObj = tagsMap.get(tag.tag_name);
                    const newTagAmount = tagObj.tagAmount + transAmount;
                    tagObj.tagAmount = newTagAmount;
                    tagsMap.set(tag.tag_name, tagObj);
                }
                else {
                    const pastelColor = chroma.hsl(Math.random() * 360, 1, 0.7).hex();
                    const tagObj = {
                        tagName: tag.tag_name,
                        tagAmount: transAmount,
                        tagColor: pastelColor
                    }
                    tagsMap.set(tag.tag_name, tagObj);
                }
            }
        
        }
    }
    const tagsArray = [...tagsMap.values()];
    
    return tagsArray;
}








// monthTransactionsData {
//     month: { id: 29, beginning_balance: 750000 },
//     transactions: [
//       {
//         id: 162,
//         date: 2025-04-01T05:00:00.000Z,
//         amount: 5000,
//         type: 'expense',
//         description: 'Chipotle',
//         budget_category: 'fun'
//       },
//       {
//         id: 176,
//         date: 2025-04-01T05:00:00.000Z,
//         amount: 6899,
//         type: 'expense',
//         description: 'cleaning supplies',
//         budget_category: 'fundamental'
//       },
//       
//     ]
//   }
//   spendingTagInstances [
//     { transaction_id: 162, tag_name: 'food', tag_id: 129 },
//     { transaction_id: 162, tag_name: 'restaurant', tag_id: 130 },
//     { transaction_id: 163, tag_name: 'garden', tag_id: 131 },
//   ]