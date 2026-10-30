import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export const patientRegistrationSchema = z
  .object({
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(32, "Password must be at most 32 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(6, "Please confirm your password").max(32),
    contactNumber: z
      .string()
      .refine(
        (value) => value === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(value),
        {
          message: "Contact number must be a 10-digit number",
        },
      )
      .optional(),
  })
  .refine(
    (data) => {
     return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );
