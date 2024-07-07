import { NextFunction, Request, Response } from "express"
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

type Token = { id: string, iat: number, exp: number };

export class AuthMiddleware {

  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if (!authorization) return res.status(401).json({error: 'No token provided'});
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'No token provided'});

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<Token>(token);
      if (!payload) return res.status(401).json({error: 'Invalid token'});

      const user = await UserModel.findById(payload.id);

      // se puden verificar campos para permitirle o no al usuario realizar la accion
      // ejemplo: user.isActive,user.invalidateToken

      if (!user) return res.status(401).json({error: 'Invalid token'});

      req.body.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Internal server error'});
    }

  }
}