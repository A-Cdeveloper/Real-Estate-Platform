-- Add lat and lng columns to settings table
ALTER TABLE `settings` ADD COLUMN `lat` DOUBLE NULL;
ALTER TABLE `settings` ADD COLUMN `lng` DOUBLE NULL;

