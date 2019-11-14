import React, { useState,useEffect  } from 'react'

const EditEmployeeForm = props => {
  const [employee, setEmployee] = useState(props.currentEmployee)

  useEffect(
    () => {
        setEmployee(props.currentEmployee)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setEmployee({ ...employee, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateEmployee(employee.id, employee)
      }}
    >
      <label>First Name</label>
      <input type="text" name="firstName" value={employee.firstName} onChange={handleInputChange} />
      <label>Last Name</label>
      <input type="text" name="lastName" value={employee.lastName} onChange={handleInputChange} />
      <label>Department</label>
      <input type="text" name="department" value={employee.department} onChange={handleInputChange} />
      <button>Update Employee</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditEmployeeForm