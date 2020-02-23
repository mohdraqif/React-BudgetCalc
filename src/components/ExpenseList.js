import React from 'react';
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = (props) => {
  return (
    <React.Fragment>
      <ul className='list'>
        {props.expenses.map((expense) => {
          return <ExpenseItem key={expense.id} expense={expense} 
          Edit={props.edit} Delete={props.delete} />
        })}
      </ul>
      {props.expenses.length > 0 && 
        <button className='btn' onClick={props.clear}>clear expenses
          <MdDelete className='btn-icon' />
        </button>}
    </React.Fragment>
  );
}

export default ExpenseList;
