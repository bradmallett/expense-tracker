import Link from "next/link";
import deleteTransaction from "../lib/actions/deleteTransaction";



export function EditTransaction({ id }) {

    return (
        <Link
            href={`/edit/${id}`}
            className="edit-transaction-btn"
        >
        Edit
        </Link>
    );
}



export function DeleteTransaction({ transData }) {
    const deleteTransactionWithTransData = deleteTransaction.bind(null, transData);

    
    return (
        <form action={deleteTransactionWithTransData}>
            <button>Delete</button>
        </form>
    )
}