-- AlterTable
ALTER TABLE `Transaction` MODIFY `transaction_type` ENUM('INCOME', 'EXPENSE', 'SAVING', 'EXPENSE_FROM_SAVING') NOT NULL;
