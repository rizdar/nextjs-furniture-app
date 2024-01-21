import * as z from 'zod';

export const formLoginSchema = () => {
  const schema = z.object({
    email: z.string().nonempty({ message: 'email wajib diisi!' }).email({
      message: 'format email salah',
    }),

    password: z
      .string()
      .nonempty({
        message: 'password wajib diisi!',
      })
      .min(8, {
        message: 'password minimal 8 karakter',
      }),
  });

  return schema;
};
