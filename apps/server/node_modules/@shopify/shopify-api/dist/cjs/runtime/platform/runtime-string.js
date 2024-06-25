'use strict';

// eslint-disable-next-line import/no-mutable-exports
exports.abstractRuntimeString = () => {
    throw new Error("Missing adapter implementation for 'abstractRuntimeString' - make sure to import the appropriate adapter for your platform");
};
function setAbstractRuntimeString(func) {
    exports.abstractRuntimeString = func;
}

exports.setAbstractRuntimeString = setAbstractRuntimeString;
//# sourceMappingURL=runtime-string.js.map
