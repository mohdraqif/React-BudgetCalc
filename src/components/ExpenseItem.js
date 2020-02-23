import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md'

const ExpenseItem = (props) => {
  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{props.expense.charge}</span>
        <span className='amount'>{props.expense.amount}</span>
      </div>
        <button className='edit-btn' aria-label='edit button' 
          onClick={() => props.Edit(props.expense.id)}>
        <MdEdit/>
        </button>
        <button className='clear-btn' aria-label='delete button'
          onClick={() => props.Delete(props.expense.id, props.expense.charge)}>
        <MdDelete/>
        </button>
      <div>

      </div>
    </li>
  );
}

export default ExpenseItem;
