import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';

export const Transaction = ({transaction}) => {
    const {deleteTransaction} = useContext(GlobalContext)
    const sign = transaction.amount > 0 ? '+' : '-';
    return (
        <div>
            <li className={sign==='+'?'plus':'minus'}>
                {transaction.text} 
                <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
                <button className="delete-btn" 
                onClick={() => deleteTransaction(transaction.id)}>
                    x
                </button>
            </li>
        </div>
    )
}
