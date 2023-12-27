import { z } from "zod";
// the zod is used to check whether the user enter correct formit input data
export const RegisterUserSchema = z
  .object({
    username: z
      .string({
        required_error: "name is required",
      })
      .min(1, "Full name is required ")
      .max(50, "Name should be less than 50 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .min(1, "Email is Required")
      .email("email is invalid"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(1, "confirm your password")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z
      .string({
        required_error: "Please confirm your password",
      })
      .min(1, "Confirm your Password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "passwords do not match",
  });
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "please provide an email",
    })
    .min(1, "email is required")
    .email("email is invalid"),
  password: z
    .string({
      required_error: "please provide a valid password",
    })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type loginUserSInput = z.infer<typeof loginUserSchema>;
