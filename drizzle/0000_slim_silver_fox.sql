CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" varchar(255) NOT NULL,
	"isadmin" boolean DEFAULT false,
	"forgotPasswordToken" text NOT NULL,
	"forgotPasswordTokenExpiry" date NOT NULL,
	"verifyToken" text NOT NULL,
	"verifyTokenExpiry" date NOT NULL,
	"createdat" timestamp DEFAULT now(),
	"updatedat" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
