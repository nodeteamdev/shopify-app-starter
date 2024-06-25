'use strict';

var types = require('../types.js');

function versionCompatible(config) {
    return (referenceVersion, currentVersion = config.apiVersion) => {
        // Return true if not using a dated version
        if (currentVersion === types.ApiVersion.Unstable) {
            return true;
        }
        const numericVersion = (version) => parseInt(version.replace('-', ''), 10);
        const current = numericVersion(currentVersion);
        const reference = numericVersion(referenceVersion);
        return current >= reference;
    };
}
function versionPriorTo(config) {
    return (referenceVersion, currentVersion = config.apiVersion) => {
        return !versionCompatible(config)(referenceVersion, currentVersion);
    };
}

exports.versionCompatible = versionCompatible;
exports.versionPriorTo = versionPriorTo;
//# sourceMappingURL=version-compatible.js.map
