import { z } from 'zod';

export const UserRole = z.enum(['CLIENT', 'VENDOR', 'ADMIN']);
export type UserRole = z.infer<typeof UserRole>;

export const CurrentUserSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email(),
  role: UserRole,
  fullName: z.string(),
});

export type CurrentUser = z.infer<typeof CurrentUserSchema>;
