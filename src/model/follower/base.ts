import { z } from "zod";

export const stringOptional = z.string().nullable().optional();
export const numberOptional = z.number().optional().nullable();
export const booleanOptional = z.boolean().optional().nullable();
