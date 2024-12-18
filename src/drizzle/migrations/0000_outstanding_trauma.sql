CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`description` text(255) NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`salt` text(255) NOT NULL,
	`password` text(255) NOT NULL,
	`userRole` text DEFAULT 'BASIC' NOT NULL,
	`email_verified` integer DEFAULT false,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);