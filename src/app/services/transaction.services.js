// const transactionRepository = require('../repositories/transaction.repository')


// const transactionService = {
//     addTransaction: async (amount, accountId) => {
//         const id = await transactionRepository.addTransaction(amount, accountId)
//         console.log(id)
//         return id
//     }
// }

// module.exports = transactionService

const transactionRepository = require('../repositories/transaction.repository')
const messagesAsync = require('../middlewares/messagesasync')
 
const transactionService = {
    addTransaction: async (amount, accountId) => {
        const message = await transactionRepository.addTransaction(amount, accountId)
        messagesAsync.send(message.id, accountId, amount, 'withdrawal')
        console.log(message)
        return message
    }
}
 
module.exports = transactionService