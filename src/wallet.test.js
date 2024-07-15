const Wallet = require("./Wallet")

describe('Wallet', () => {

    it('should get all the incomes', () => {
        const wallet = new Wallet()
        const incomeA = {
            value: 5031,
            createdAt: new Date(),
            getValue: () => 50.31
        }
        const incomeB = {
            value: 8000,
            createdAt: new Date(),
            getValue: () => 80
        }
        wallet.addTransaction(incomeA)
        wallet.addTransaction(incomeB)

        const incomes = wallet.getAllIncomes()

        expect(incomes.total).toBe(130.31)
        expect(incomes.list).toContain(incomeA)
        expect(incomes.list).toContain(incomeB)
    })

    it('should get all the incomes and no expenses', () => {
        const wallet = new Wallet()
        const income = {
            value: 5031,
            createdAt: new Date(),
            getValue: () => 50.31
        }
        const expense = {
            value: -3500,
            createdAt: new Date(),
            getValue: () => -35
        }
        wallet.addTransaction(income)
        wallet.addTransaction(expense)

        const incomes = wallet.getAllIncomes()

        expect(incomes.total).toBe(50.31)
        expect(incomes.list).toContain(income)
        expect(incomes.list).not.toContain(expense)
    })

    it('should not include incomes created before start date', () => {
        const wallet = new Wallet()
        const startDate = new Date('2022-01-01')
        const incomeBeforeStartDate = {
            value: 5031,
            createdAt: new Date(startDate.getTime() - 1),
            getValue: () => 50.31
        }
        const incomeAfterStartDate = {
            value: 8000,
            createdAt: new Date(startDate.getTime() + 1),
            getValue: () => 80
        }
        wallet.addTransaction(incomeAfterStartDate)
        wallet.addTransaction(incomeBeforeStartDate)

        const incomes = wallet.getAllIncomes(startDate)

        expect(incomes.total).toBe(80)
        expect(incomes.list).toContain(incomeAfterStartDate)
        expect(incomes.list).not.toContain(incomeBeforeStartDate)
    })

    it('should not include incomes created after end date', () => {
        const wallet = new Wallet()
        const startDate = new Date('2022-01-01')
        const endDate = new Date('2022-01-31')
        const incomeBeforeEndDate = {
            value: 5031,
            createdAt: new Date(endDate.getTime() - 1),
            getValue: () => 50.31
        }
        const incomeAfterEndDate = {
            value: 8000,
            createdAt: new Date(endDate.getTime() + 1),
            getValue: () => 80
        }
        wallet.addTransaction(incomeBeforeEndDate)
        wallet.addTransaction(incomeAfterEndDate)

        const incomes = wallet.getAllIncomes(startDate, endDate)

        expect(incomes.total).toBe(50.31)
        expect(incomes.list).toContain(incomeBeforeEndDate)
        expect(incomes.list).not.toContain(incomeAfterEndDate)
    })
})
it('should get the all expenses', () => {
    const wallet = new Wallet()
    const expenseA = {
        value: -3500,
        createdAt: new Date(),
        getValue: () => -35
    }
    const expenseB = {
        value: -1299,
        createdAt: new Date(),
        getValue: () => -12.99
    }
    wallet.addTransaction(expenseA)
    wallet.addTransaction(expenseB)

    const expenses = wallet.getAllExpenses()

    expect(expenses.total).toBe(47.99)
    expect(expenses.list).toContain(expenseA)
    expect(expenses.list).toContain(expenseB)
})

it('should get the all expenses and no incomes', () => {
    const wallet = new Wallet()
    const income = {
        value: 5031,
        createdAt: new Date(),
        getValue: () => 50.31
    }
    const expense = {
        value: -1299,
        createdAt: new Date(),
        getValue: () => -12.99
    }
    wallet.addTransaction(income)
    wallet.addTransaction(expense)

    const expenses = wallet.getAllExpenses()

    expect(expenses.total).toBe(12.99)
    expect(expenses.list).toContain(expense)
    expect(expenses.list).not.toContain(income)
})
it('should not include expenses created before start date', () => {
    const wallet = new Wallet()
    const startDate = new Date('2022-01-01')
    const expenseBeforeStartDate = {
        value: -3500,
        createdAt: new Date(startDate.getTime() - 1),
        getValue: () => -35
    }
    const expenseAfterStartDate = {
        value: -1299,
        createdAt: new Date(startDate.getTime() + 1),
        getValue: () => -12.99
    }
    wallet.addTransaction(expenseBeforeStartDate)
    wallet.addTransaction(expenseAfterStartDate)

    const expenses = wallet.getAllExpenses(startDate)

    expect(expenses.total).toBe(12.99)
    expect(expenses.list).not.toContain(expenseBeforeStartDate)
    expect(expenses.list).toContain(expenseAfterStartDate)
})

it('should not include expenses created after end date', () => {
    const wallet = new Wallet()
    const startDate = new Date('2022-01-01')
    const endDate = new Date('2022-01-31')
    const expenseBeforeEndDate = {
        value: -3500,
        createdAt: new Date(endDate.getTime() - 1),
        getValue: () => -35
    }
    const expenseAfterEndDate = {
        value: -1299,
        createdAt: new Date(endDate.getTime() + 1),
        getValue: () => -12.99
    }
    wallet.addTransaction(expenseBeforeEndDate)
    wallet.addTransaction(expenseAfterEndDate)

    const expenses = wallet.getAllExpenses(startDate, endDate)

    expect(expenses.total).toBe(35)
    expect(expenses.list).toContain(expenseBeforeEndDate)
    expect(expenses.list).not.toContain(expenseAfterEndDate)
})