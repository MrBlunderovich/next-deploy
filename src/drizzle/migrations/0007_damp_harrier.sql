PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_basic_sections` (
	`id` text PRIMARY KEY NOT NULL,
	`section_name` text NOT NULL,
	`title` text(255),
	`description` text,
	`image` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_basic_sections`("id", "section_name", "title", "description", "image", "created_at", "updated_at") SELECT "id", "section_name", "title", "description", "image", "created_at", "updated_at" FROM `basic_sections`;--> statement-breakpoint
DROP TABLE `basic_sections`;--> statement-breakpoint
ALTER TABLE `__new_basic_sections` RENAME TO `basic_sections`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `basic_sections_section_name_unique` ON `basic_sections` (`section_name`);