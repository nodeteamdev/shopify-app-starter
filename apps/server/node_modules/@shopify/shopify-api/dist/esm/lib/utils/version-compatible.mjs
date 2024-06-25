import { ApiVersion } from '../types.mjs';

function versionCompatible(config) {
    return (referenceVersion, currentVersion = config.apiVersion) => {
        // Return true if not using a dated version
        if (currentVersion === ApiVersion.Unstable) {
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

export { versionCompatible, versionPriorTo };
//# sourceMappingURL=version-compatible.mjs.map
