-- Alter property status enum to include INACTIVE and DELETED
ALTER TABLE `property`
  MODIFY `status` ENUM('APPROVED', 'IN_REVIEW', 'REJECTED', 'INACTIVE', 'DELETED') NOT NULL DEFAULT 'IN_REVIEW';
