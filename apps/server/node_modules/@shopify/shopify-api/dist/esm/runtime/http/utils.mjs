function splitN(str, sep, maxNumParts) {
    const parts = str.split(sep);
    const maxParts = Math.min(Math.abs(maxNumParts), parts.length);
    return [...parts.slice(0, maxParts - 1), parts.slice(maxParts - 1).join(sep)];
}

export { splitN };
//# sourceMappingURL=utils.mjs.map
