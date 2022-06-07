"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorting = void 0;
const common_1 = require("@nestjs/common");
exports.Sorting = (0, common_1.createParamDecorator)((data, context) => {
    const sorting = context.getArgByIndex(0).headers.sorting;
    if (sorting) {
        if (sorting == 'asc' || sorting == 'desc') {
            return sorting;
        }
        throw new common_1.HttpException('wrong sort type', 500);
    }
    return 'none';
});
//# sourceMappingURL=sortheader.decorator.js.map