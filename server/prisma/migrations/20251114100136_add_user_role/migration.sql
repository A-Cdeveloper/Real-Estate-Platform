/*
  Warnings:

  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `property` DROP FOREIGN KEY `Property_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `propertyimage` DROP FOREIGN KEY `PropertyImage_propertyId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('ADMIN', 'AGENT') NOT NULL;

-- AddForeignKey
ALTER TABLE `property` ADD CONSTRAINT `property_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `propertyimage` ADD CONSTRAINT `propertyimage_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `propertyimage_propertyId_idx` ON `propertyimage`(`propertyId`);
DROP INDEX `PropertyImage_propertyId_idx` ON `propertyimage`;

-- RedefineIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
DROP INDEX `User_email_key` ON `user`;
