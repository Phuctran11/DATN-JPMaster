import { Request, Response, NextFunction } from "express";

export interface ApiError extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";

  console.error("[ERROR] Status:", status);
  console.error("[ERROR] Message:", message);
  console.error("[ERROR] Stack:", err.stack);

  res.status(status).json({
    error: {
      status,
      message,
      timestamp: new Date().toISOString(),
    },
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: {
      status: 404,
      message: "Route not found",
      path: req.path,
      method: req.method,
    },
  });
};
