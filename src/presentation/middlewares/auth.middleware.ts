import { NextFunction, Request, Response } from "express"
import { JwtAdapter } from "../../config";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({error: 'No token provided'});
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'No token provided'});

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken(token);
      if (!payload) return res.status(401).json({error: 'Invalid token'});

      req.body.token = payload;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Internal server error'});
    }

  }
}