"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        throw new common_1.HttpException('only image files allowed', common_1.HttpStatus.BAD_REQUEST);
        return callback(null, false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const removeFile = (fullFilePath) => {
    try {
        fs_1.default.unlinkSync(fullFilePath);
    }
    catch (err) {
        throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
    }
};
exports.removeFile = removeFile;
//# sourceMappingURL=imageFilter.helpers.js.map