const express = require('express')
const _ = require("lodash")

module.exports = function(app, staffService) {
  const employeeRouter = express.Router()

  employeeRouter.get('/', async (req, res) => {
    res.json(await staffService.listEmployees(_.pick(req.query, ['name'])))
  })

  employeeRouter.post('/', async (req, res) => {
    const employee = await staffService.createEmployee(req.body)
    if (employee)
      res.status(201).json(employee)
    else
      res.status(400)
  })

  employeeRouter.get('/:employeeId', async (req, res) => {
    const employee = await staffService.getEmployeeById(req.params.employeeId)
    if (!employee) {
      res.status(404).end()
      return
    }
    res.json(employee)
  })

  employeeRouter.delete('/:employeeId', async (req, res) => {
    const deleted = await staffService.deleteEmployee(req.params.employeeId)
    if (!deleted) {
      res.status(404).end()
      return
    }
    res.status(204).end()
  })

  employeeRouter.patch('/:employeeId', async (req, res) => {
    const updatedEmployee = await staffService.updateEmployee(req.params.employeeId, req.body)
    if (!updatedEmployee) {
      res.status(404).end()
      return
    }
    res.json(updatedEmployee)
  })

  return employeeRouter
}