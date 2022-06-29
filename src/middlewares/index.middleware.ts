import path, { join, resolve } from 'path';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

const resolvePath = (file: string) => resolve(`./client/${file}`);

export function FrontendMiddleware(req, res, next) {
  const { url } = req;
  if (url.indexOf('/api') === 0) {
    return next();
  } else if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
    return res.sendFile(resolvePath(url));
  } else {
    return res.sendFile(resolvePath('index.html'));
  }
}
