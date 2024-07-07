import jwt from "jsonwebtoken"

export class JwtAdapter {

  static async generateToken(payload: Object, duration: string = '2h'): Promise<string | null> {
    return new Promise(resolve => {
      // todo: generacion del seed
      jwt.sign(payload, 'SEED', {expiresIn: duration}, (err, token) => {
        if (err) return resolve(null);
        resolve(token!);
      });
    });
  }

  static async validateToken(token: string): Promise<string | null> {
    return new Promise(resolve => {
      jwt.verify(token, 'SEED', (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded! as string);
      });
    });
  }

}