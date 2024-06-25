"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomTimeInMilliseconds = void 0;
function getRandomTimeInMilliseconds(fromSeconds, toSeconds) {
    const randomSeconds = Math.random() * (toSeconds - fromSeconds) + fromSeconds;
    return Math.round(randomSeconds * 1000);
}
exports.getRandomTimeInMilliseconds = getRandomTimeInMilliseconds;
//# sourceMappingURL=get-random-time-in-milliseconds.helper.js.map