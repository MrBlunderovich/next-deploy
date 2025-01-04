ALTER TABLE `basic_sections` RENAME COLUMN "section_id" TO "section_name";--> statement-breakpoint
DROP INDEX `basic_sections_section_id_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `basic_sections_section_name_unique` ON `basic_sections` (`section_name`);