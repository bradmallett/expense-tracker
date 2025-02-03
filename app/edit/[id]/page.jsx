import getTransaction from "@/app/lib/actions/getTransaction";
import EditTransactionForm from "@/app/ui/EditTransactionForm";

export default async function Page( props ) {
    const params = await props.params;
    const id = params.id;

    const [transaction] = await getTransaction(id);
    console.log(transaction)


    return (
        <div>
            Edit Transaction.
            <EditTransactionForm transaction={transaction}/>
        </div>
    )
    
}