-- Add logo_dark and logo_light columns
ALTER TABLE `settings` ADD COLUMN `logo_dark` VARCHAR(191) NULL;
ALTER TABLE `settings` ADD COLUMN `logo_light` VARCHAR(191) NULL;

-- Copy data from logo to both logo_dark and logo_light (if logo column exists)
-- Note: This migration assumes logo column was already removed in previous migration
-- If logo still exists, uncomment the following:
-- UPDATE `settings` SET `logo_dark` = `logo`, `logo_light` = `logo` WHERE `logo` IS NOT NULL;

-- Drop logo column (if it still exists)
-- ALTER TABLE `settings` DROP COLUMN `logo`;
