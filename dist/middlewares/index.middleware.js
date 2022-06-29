"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendMiddleware = void 0;
const path_1 = require("path");
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
const resolvePath = (file) => (0, path_1.resolve)(`./client/${file}`);
function FrontendMiddleware(req, res, next) {
    const { url } = req;
    if (url.indexOf('/api') === 0) {
        return next();
    }
    else if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
        return res.sendFile(resolvePath(url));
    }
    else {
        return res.sendFile(resolvePath('index.html'));
    }
}
exports.FrontendMiddleware = FrontendMiddleware;
//# sourceMappingURL=index.middleware.js.map