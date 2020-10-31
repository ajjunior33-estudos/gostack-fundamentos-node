import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    return response.status(200).json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, type, value } = request.body;
    console.log(title, type, value);
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transation = createTransaction.execute({ title, value, type });

    return response.status(200).json(transation);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
