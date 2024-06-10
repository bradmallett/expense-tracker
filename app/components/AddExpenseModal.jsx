import Link from "next/link";
import ExpenseForm from "./ExpenseForm";


function AddExpenseModal() {
  return (
    <>
        {/* Navigates back to the base URL - closing the modal */}
        <Link href="/">
            <button className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Close
            </button>
        </Link>
        <ExpenseForm />
    </>
  );
}

export default AddExpenseModal;
