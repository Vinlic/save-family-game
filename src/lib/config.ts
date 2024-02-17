import dev from "@/configs/dev";
import prod from "@/configs/prod";

export default import.meta.env.DEV ? dev : prod;