import { createContext } from "react";

const TransactionContext = createContext({
    transactions: [],
    setTransactions: () => {},
});

export default TransactionContext;