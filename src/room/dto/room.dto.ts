import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomDtoSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    number: z.number(),
    bed: z.number(),
    smoking: z.boolean().optional(),
    breakfast: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class RoomDto extends createZodDto(RoomDtoSchema) {}
