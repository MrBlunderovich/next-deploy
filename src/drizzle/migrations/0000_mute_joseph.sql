CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text(255) NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`test4` text
);
