import 'express-session';

declare module 'express-session' {
  interface SessionData {
    // TODO: Add cart data
    userId?: string;
    initialized?: boolean;
  }
}
