"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productWithReviews = void 0;
const client_1 = require("@prisma/client");
exports.productWithReviews = client_1.Prisma.validator()({
    include: {
        reviews: true,
    },
});
//# sourceMappingURL=prismatypes.js.map