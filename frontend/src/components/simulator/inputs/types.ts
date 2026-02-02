import { z } from "zod";
import { InputsSchema } from "./schema";

type Inputs = z.infer<typeof InputsSchema>;

export type { Inputs };
