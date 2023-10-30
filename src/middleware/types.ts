import Context from "../context";

export type Middleware = (context: Context, next: () => void) => void;
