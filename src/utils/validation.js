import { z } from "zod";

/**
 * @description - zod schema for form validation for signup
 */
export const signUpSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .regex(/^[A-Za-z]+$/, "First name can only contain letters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name can only contain letters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
  phoneNumber: z
    .string()
    .refine(
      (val) => /^\+\d+\s+\d{10}$/.test(val),
      "Mobile number must be a valid phone number"
    ),
  companyName: z.string().nonempty("Company name is required"),
});

/**
 * @description zod schema for form validation for login
 */
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Please Enter your password"),
});

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character"
  );

export const passwordSchema = z.object({
  password: passwordValidation,
  confirmPassword: passwordValidation,
});


/**
 * @description - zod schema for form validation for user profile
 */
export const userProfileSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .regex(/^[A-Za-z]+$/, "First name can only contain letters"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name can only contain letters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .refine(
      (val) => /^\+\d+\s+\d{10}$/.test(val),
      "Mobile number must be a valid phone number"
    ),
  userTitle: z.string().min(2, "Job Title must be at least 2 characters long"),
  profileImage: z.any(),
});
