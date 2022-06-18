"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortingBy = void 0;
const common_1 = require("@nestjs/common");
exports.SortingBy = (0, common_1.createParamDecorator)((data, context) => {
    const sorting = context.getArgByIndex(0).headers.sortingby;
    if (sorting) {
        return sorting;
    }
});
//# sourceMappingURL=sortbyheader.decorator.js.map