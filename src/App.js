import React, {useState, useEffect} from 'react';
import './App.css'
import uuid from 'uuid'
import Alert from './components/Alert'
import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'

// const initialExpenses = [
//   {id: uuid(), charge: 'rent', amount: 1600},
//   {id: uuid(), charge: 'phone bill', amount: 500},
//   {id: uuid(), charge: 'credit card bill', amount: 2100}
// ]

// LocalStorage used for instead of defining state manually as above
const initialExpenses = localStorage.getItem('expenses') ?
  JSON.parse(localStorage.getItem('expenses')) : []

const App = () => {
  // Use of useState hooks for state management
  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState('')
  const [alert, setAlert] = useState({show: false})
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)

  // Hook for local data usage 
  useEffect(() => {
    console.log('useEffect called');
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  // EventHandlers defined here
  const chargeHandler = (e) => setCharge(e.target.value)
  const amountHandler = (e) => setAmount(e.target.value)
  const clearItemsHandler = () => setExpenses([]);

  const alertHandler = ({type, text}) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({show: false})
    }, 5000)
  }

  const editHandler = (id) => {
    let expense = expenses.find((item) => item.id === id) 
    let {charge, amount} = expense   
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  const deleteHandler = (id, charge) => {
    let tempExpenses = expenses.filter((item) => item.id !== id)
    setExpenses(tempExpenses)  
    alertHandler({type: 'danger', text: `Item ${charge} deleted successfully`}) 
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(charge && amount > 0) {
      if(edit) {
        let tempExpense = expenses.map((item) => {
          return (item.id ===id ? {...item, charge, amount} : item)
        })
        setExpenses(tempExpense)
        setEdit(false)
        alertHandler({type: 'success', text: 'Item edited'})
      }
      else {
        const singleExpense = {id: uuid(), charge, amount} 
        setExpenses([...expenses, singleExpense]) //Important: Explains functionality of Hooks   
      }
      setCharge('')
      setAmount('')
      alertHandler({type: 'success', text: 'Item added'})
    } 
    else if(!charge && !amount) {
      alertHandler({type: 'danger', text: 'Please provide the Charge and Amount'})
    }
    else if(!charge) {
      alertHandler({type: 'danger', text: 'Please provide the Charge'})
    }
    else {
      alertHandler({type: 'danger', text: 'Please provide the Amount'})
    }
  }

  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm 
          charge={charge} amount={amount} 
          chargeHandler={chargeHandler} 
          amountHandler={amountHandler}
          submitHandler={submitHandler}
          edit={edit} />

        <ExpenseList 
          expenses={expenses} 
          edit={editHandler}
          delete={deleteHandler}
          clear={clearItemsHandler} />
      </main>
      <h1>
        total spending : <span className='total'>$
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount))}, 0)}</span>
      </h1>
    </React.Fragment>
  );
}

export default App;
