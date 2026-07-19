CREATE TABLE "bookings" (
	"name" text NOT NULL,
	"email" text NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waitlist_signups" (
	"email" text NOT NULL,
	"project" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
