-- Add social links columns to settings table
ALTER TABLE `settings` 
  ADD COLUMN `facebook` VARCHAR(191) NULL,
  ADD COLUMN `instagram` VARCHAR(191) NULL,
  ADD COLUMN `x` VARCHAR(191) NULL,
  ADD COLUMN `linkedin` VARCHAR(191) NULL;


