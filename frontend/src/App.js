import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ description: '', amount: '', expense_date: '' });

  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then(res => res.json())
      .then(setExpenses);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newExpense => setExpenses([newExpense, ...expenses]));

    setForm({ description: '', amount: '', expense_date: '' });
  }

  function deleteExpense(id) {
    fetch(`http://localhost:3001/expenses/${id}`, { method: "DELETE" })
      .then(() => setExpenses(expenses.filter(exp => exp.id !== id)));
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Expense Tracker</h1>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input name="description" type="text" className="form-control" placeholder="Description"
                   value={form.description} onChange={handleChange} required/>
          </div>
          <div className="col">
            <input name="amount" type="number" className="form-control" placeholder="Amount"
                   value={form.amount} onChange={handleChange} required/>
          </div>
          <div className="col">
            <input name="expense_date" type="date" className="form-control"
                   value={form.expense_date} onChange={handleChange} required/>
          </div>
          <div className="col">
            <button className="btn btn-primary w-100" type="submit">Add</button>
          </div>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {expenses.map(exp => (
          <tr key={exp.id}>
            <td>{exp.description}</td>
            <td>{exp.amount}</td>
            <td>{exp.expense_date?.substring(0,10)}</td>
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => deleteExpense(exp.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;