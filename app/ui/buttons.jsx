import Link from "next/link";


export function EditTransaction({ id }) {
    console.log(id)


    return (
        <Link
            href={`/edit/${id}`}
            className="edit-transaction-btn"
        >
        Edit
        </Link>
    );
}