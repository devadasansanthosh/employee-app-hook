import React, { useState } from 'react'

const AddEmployeeForm = props => {

    const initialFormState = { firstName: '', lastName: '', department: '' }
    const [employee, setEmployee] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target
      
        setEmployee({ ...employee, [name]: value })
      }
  return (
    <form
    onSubmit={event => {
        event.preventDefault()
        if (!employee.firstName || !employee.lastName || !employee.department) return
    
        props.addEmployee(employee)
        setEmployee(initialFormState)
      }}
    >
      <label>First Name</label>
      <input type="text" name="firstName" value={employee.firstName} onChange={handleInputChange} />
      <label>Last Name</label>
      <input type="text" name="lastName" value={employee.lastName} onChange={handleInputChange} />
      <label>Department</label>
      <input type="text" name="department" value={employee.department} onChange={handleInputChange} />
      <button>Add new employee</button>
    </form>
  )
}

export default AddEmployeeForm