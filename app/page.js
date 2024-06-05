import Expenses from "./components/Expenses";
import Link from "next/link";
import AddExpenseModal from "./components/Modal";

export default async function Home({ searchParams }) {
  const show = searchParams && searchParams.show === "true";

  return (
    <>
      <h1>EXPENSE TRACKER</h1>
      <Expenses/>
      {show && <AddExpenseModal />}
      <Link href="/?show=true">
        <h2>ADD EXPENSE</h2> 
      </Link>
    </>
  );
}


