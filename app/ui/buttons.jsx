import Link from "next/link";


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