
import deleteTransaction from "../lib/actions/deleteTransaction";



export default function DeleteTransactionForm({transData}) {
    const deleteTransactionWithTransData = deleteTransaction.bind(null, transData);
    


    return (
        <div className="bg-slate-500 p-5 border-t-4 border-red-500 ">
            <p>Delete Transaction: {`${transData.description}`}?</p>
            <form action={deleteTransactionWithTransData}>
                <button
                    className="p-3"
                    type="submit">
                        DELETE
                </button>
            </form>
        </div>
    )
}