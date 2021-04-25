-- AlterTable
ALTER TABLE `Category` MODIFY `type` ENUM('INCOME', 'EXPENSE', 'INCOME_FROM_SAVING') NOT NULL;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `transaction_type` ENUM('INCOME', 'EXPENSE', 'SAVING', 'EXPENSE_FROM_SAVING', 'INCOME_FROM_SAVING') NOT NULL;
