import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// initial state
const initialState = {
    transactions:[],
    error: null,
    loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //action
    async function getTransaction() {
        try {
            const res = await axios.get('/transactions')

            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/transactions/${id}`)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
        
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const res = await axios.post('/transactions', transaction, config)
            
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
        
    }
    return (<GlobalContext.Provider value={{
        transactions:state.transactions,
        error:state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}