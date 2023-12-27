ALTER TABLE "users" DROP COLUMN IF EXISTS "forgotPasswordToken";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "forgotPasswordTokenExpiry";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "verifyToken";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "verifyTokenExpiry";