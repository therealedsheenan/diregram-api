import { NextFunction, Request, Response } from "express";

/*
 * GET home page.
 */
export let index = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    title: "Welcome to min-ts-node.",
    description: "Minimal typescript + node express implementation\n"
  });
};

/*
 * GET sample page.
 */
export let sample = (req: Request, res: Response, next: NextFunction) => {
  res.send("This is the users endpoint.");
};
