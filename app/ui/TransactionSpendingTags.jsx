

export default function TransactionSpendingTags({spendingTagInstances, transactionID}) {
    const transactionTags = spendingTagInstances.filter(tag => tag.transaction_id === transactionID);

    return (
        <div className="tagName-contain">
            {transactionTags.map(tag => (
                <p key={tag.tag_id}>{tag.tag_name}</p>
            ))}
        </div>

    )
}