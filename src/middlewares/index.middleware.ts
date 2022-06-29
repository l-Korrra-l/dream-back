import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import path, { join } from 'path';

const resolvePath = (file: string) => path.resolve(`../dist/${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { url } = req;
    if (url.indexOf('/api') === 1) {
      next();
    } else {
      res.sendFile(join(__dirname, '..','..', 'client/index.html'));
    }
  }
}
