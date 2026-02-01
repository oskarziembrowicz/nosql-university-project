import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    initialized?: boolean;
    purchaseMessage?: string;
  }
}
