ALTER TABLE `tasks` ADD `created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` ADD `updated_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL;