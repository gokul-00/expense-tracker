import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const { transactions, getTransaction } = useContext(GlobalContext)

    useEffect(() => {
        getTransaction();
    }, []);

    return (
        <div>
        <h3>History</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />   
                ))}    
            </ul>
        </div>
    )
}
