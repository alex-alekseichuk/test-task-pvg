
module.exports = function(staffModels) {
  return {
    createEmployee: async (data) => await staffModels.Employee.create(data),
    listEmployees: async (where) => await staffModels.Employee.findAll({where}),
    getEmployeeById: async (employeeId) => await staffModels.Employee.findByPk(employeeId),
    deleteEmployee: async (employeeId) => {
      const employee = await staffModels.Employee.findByPk(employeeId)
      if (!employee) {
        return false
      }
      await employee.destroy()
      return true
    },
    updateEmployee: async (employeeId, data) => {
      const employee = await staffModels.Employee.findByPk(employeeId)
      if (!employee) {
        return
      }
      employee.set(data)
      await employee.save()
      return employee
    },
  }
}

