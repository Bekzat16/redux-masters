import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchCustomers } from './asyncActions/customers';
import { addCustomerAction, addManyCustomersAction, removeCustomerAction } from './store/customerReducer';

function App() {
  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const addCash = (cash) => {
    dispatch({type: 'ADD_CASH', payload: cash})
  }

  const getCash = (cash) => {
    dispatch({type: 'GET_CASH', payload: cash})
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <div style={{fontWeight: '3rem', margin: '10px'}}>{cash}</div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button onClick={() => addCash(Number(prompt()))}>Add cash</button>
        <button onClick={() => getCash(Number(prompt()))}>Get cash</button>
        <button onClick={() => addCustomer(prompt())}>Add client</button>
        <button onClick={() => dispatch(fetchCustomers())}>Add clients list</button>
      </div>
      {customers.length > 0 ?
        <div>
          {customers.map(customer => 
            <div onClick={() => removeCustomer(customer)} style={{fontSize: '2rem', border: '1px solid black', padding: '10px', marginTop: 5}}>{customer.name}</div>
          )}
        </div>
        :
        <div style={{fontSize: '2rem', marginTop: 20}}>
          No clients
        </div>
      }
    </div>
  );
}

export default App;
