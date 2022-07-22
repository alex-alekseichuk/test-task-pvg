describe('staff_service', () => {
  const staffServiceFactory = require('./staff_service')
  let staffModel, staffService
  beforeEach(() => {
    staffModel = mockStaffModel()
    staffService = staffServiceFactory(staffModel)
  })
  describe('createEmployee', () => {
    it('should create employee', async () => {
      const employee = await staffService.createEmployee({name: 'Test'})
      expect(employee).toMatchObject({id: 1, name: 'Test'})
      expect(staffModel.Employee.create).toBeCalledWith({name: 'Test'})
    })
  })
  describe('listEmployees', () => {
    it('should list all records', async () => {
      await staffService.listEmployees()
      expect(staffModel.Employee.findAll).toBeCalledWith({})
    })
    it('should list records by the query', async () => {
      const query = {name: 'Test'}
      await staffService.listEmployees(query)
      expect(staffModel.Employee.findAll).toBeCalledWith({where: query})
    })
  })
  describe('getEmployeeById', () => {
    it('should get record by ID', async () => {
      const id = 2
      await staffService.getEmployeeById(id)
      expect(staffModel.Employee.findByPk).toBeCalledWith(id)
    })
  })
  describe('getEmployeeById', () => {
    it('should get record by ID', async () => {
      const id = 2
      await staffService.getEmployeeById(id)
      expect(staffModel.Employee.findByPk).toBeCalledWith(id)
    })
  })
  describe('deleteEmployee', () => {
    let employee
    beforeEach(() => {
      employee = mockEmployee({id: 2, name: 'Test'})
      staffModel.Employee.findByPk = jest.fn(async (id) => id === 1 ? null : employee)
    })
    it('should not delete absent record by ID', async () => {
      const id = 1
      expect(await staffService.deleteEmployee(id)).toBeFalsy()
      expect(staffModel.Employee.findByPk).toBeCalledWith(id)
      expect(employee.destroy).not.toBeCalled()
    })
    it('should delete existing record by ID', async () => {
      const id = 2
      expect(await staffService.deleteEmployee(id)).toBeTruthy()
      expect(staffModel.Employee.findByPk).toBeCalledWith(id)
      expect(employee.destroy).toBeCalled()
    })
  })
  describe('updateEmployee', () => {
    let employee
    beforeEach(() => {
      employee = mockEmployee({id: 2, name: 'Test'})
      staffModel.Employee.findByPk = jest.fn(async (id) => id === 1 ? null : employee)
    })
    it('should update existing record by ID', async () => {
      const id = 2
      const data = {name: 'new'}
      expect(await staffService.updateEmployee(id, data)).toBeTruthy()
      expect(staffModel.Employee.findByPk).toBeCalledWith(id)
      expect(employee.set).toBeCalledWith(data)
      expect(employee.save).toBeCalled()
    })
    it('should not update absent record by ID', async () => {
      const id = 1
      const data = {name: 'new'}
      expect(await staffService.updateEmployee(id, data)).toBeFalsy()
      expect(staffModel.Employee.findByPk).toBeCalledWith(id)
      expect(employee.set).not.toBeCalled()
      expect(employee.save).not.toBeCalled()
    })
  })
})

function mockStaffModel() {
  return {
    Employee: {
      findAll: jest.fn(async () => []),
      create: jest.fn(async ({name}) => mockEmployee({id: 1, name})),
      findByPk: jest.fn(async (id) => id === 1 ? null : mockEmployee({id, name: 'Test'})),
    }
  }
}

function mockEmployee({id, name}) {
  return {
    id,
    name,
    destroy: jest.fn(async () => {}),
    save: jest.fn(async () => {}),
    set: jest.fn((data) => {}),
  }
}