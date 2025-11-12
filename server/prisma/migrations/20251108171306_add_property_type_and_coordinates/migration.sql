-- AlterTable
ALTER TABLE `property` ADD COLUMN `lat` DOUBLE NULL,
    ADD COLUMN `lng` DOUBLE NULL,
    ADD COLUMN `type` ENUM('Apartment', 'House', 'Commercial') NULL;
