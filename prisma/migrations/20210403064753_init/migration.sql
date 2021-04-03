/*
  Warnings:

  - You are about to drop the column `name` on the `Saving` table. All the data in the column will be lost.
  - You are about to drop the column `final_amount` on the `Saving` table. All the data in the column will be lost.
  - Added the required column `type` to the `Label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Saving` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_amount` to the `Saving` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Label` ADD COLUMN     `type` ENUM('INCOME', 'EXPENSE') NOT NULL;

-- AlterTable
ALTER TABLE `Saving` DROP COLUMN `name`,
    DROP COLUMN `final_amount`,
    ADD COLUMN     `title` VARCHAR(191) NOT NULL,
    ADD COLUMN     `target_amount` DECIMAL(65, 30) NOT NULL;
