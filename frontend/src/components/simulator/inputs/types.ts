import { z } from "zod";
import { ActivitySchema, InputsSchema } from "./schema";

type Inputs = z.infer<typeof InputsSchema>;
type Activity = z.infer<typeof ActivitySchema>;

export type { Inputs, Activity };
