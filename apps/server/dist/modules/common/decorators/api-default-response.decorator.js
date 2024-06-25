"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDefaultResponse = exports.StatusCodes = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_base_response_decorator_1 = __importDefault(require("./api-base-response.decorator"));
const api_ok_base_response_decorator_1 = require("./api-ok-base-response.decorator");
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["OK"] = 200] = "OK";
    StatusCodes[StatusCodes["CREATED"] = 201] = "CREATED";
    StatusCodes[StatusCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
})(StatusCodes || (exports.StatusCodes = StatusCodes = {}));
const responses = {
    [StatusCodes.OK]: api_ok_base_response_decorator_1.ApiOkBaseResponse,
    [StatusCodes.CREATED]: api_ok_base_response_decorator_1.ApiCreatedBaseResponse,
    [StatusCodes.NO_CONTENT]: (options) => (0, swagger_1.ApiNoContentResponse)({
        ...options,
        description: `${common_1.HttpStatus.NO_CONTENT}. No content.`,
    }),
};
const getResponse = (status = StatusCodes.NO_CONTENT) => ({ dto, isArray, meta, }) => {
    return responses[status]({
        dto,
        isArray,
        meta,
    });
};
function ApiDefaultResponse({ status = StatusCodes.OK, type, meta, isArray, summary, }) {
    const decorators = [
        getResponse(status)({
            dto: type,
            isArray,
            meta,
        }),
        (0, api_base_response_decorator_1.default)(),
        (0, common_1.HttpCode)(status),
    ];
    if (summary)
        decorators.push((0, swagger_1.ApiOperation)({ summary }));
    return (0, common_1.applyDecorators)(...decorators);
}
exports.ApiDefaultResponse = ApiDefaultResponse;
//# sourceMappingURL=api-default-response.decorator.js.map