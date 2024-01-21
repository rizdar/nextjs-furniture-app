import * as z from 'zod';

export const formRegisterSchema = () => {
  const schema = z.object({
    nama: z
      .string()
      .nonempty({
        message: 'nama wajib diisi!',
      })
      .max(50),
    nohp: z
      .string()
      .nonempty({
        message: 'nohp wajib diisi!',
      })
      .min(10, {
        message: 'no hp minimal 10 karakter',
      }),
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
