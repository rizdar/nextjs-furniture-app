import * as z from 'zod';

export const formCheckoutSchema = () => {
  const schema = z.object({
    alamat: z.string().nonempty({
      message: 'alamat wajib diisi',
    }),
  });

  return schema;
};
