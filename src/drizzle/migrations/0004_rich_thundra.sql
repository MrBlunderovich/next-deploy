CREATE TABLE `basic_sections` (
	`id` text PRIMARY KEY NOT NULL,
	`section_id` text NOT NULL,
	`title` text(255) NOT NULL,
	`description` text,
	`image` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
