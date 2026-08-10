import "express";

declare global {
  namespace Express {
    interface AuthenticatedUser {
      id: number;
    }

    interface Request {
      user: AuthenticatedUser;
    }
  }
}

export {};