import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  
  // recebe token 
  const authToken = request.headers.authorization;

  // validar token
  if(!authToken) {
    return response.status(401).json({ 
      message: "Token is missing"
    });
  }

  const [, token] = authToken.split(" ");

  try {

    // valida se token é valido

    const { sub } = verify(token, "e43665b7ee4a6b0e9e68ff97908c35a8") as IPayload;

    // Recupera informacoes do user
    request.user_id = sub;

    return next();
    
  } catch (err) {

    return response.status(401).end();

  }
}