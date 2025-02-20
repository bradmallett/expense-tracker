import deleteTransaction from "../lib/actions/deleteTransaction";



export function DeleteTransaction({ transData }) {
    const deleteTransactionWithTransData = deleteTransaction.bind(null, transData);

    return (
        <form action={deleteTransactionWithTransData}>
            <button>DELETE TRANSACTION</button>
        </form>
    )
}