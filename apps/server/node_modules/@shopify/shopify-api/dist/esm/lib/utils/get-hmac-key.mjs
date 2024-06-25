function getHMACKey(key) {
    const arrayBuffer = new Uint8Array(key.length);
    for (let i = 0, keyLen = key.length; i < keyLen; i++) {
        arrayBuffer[i] = key.charCodeAt(i);
    }
    return arrayBuffer;
}

export { getHMACKey };
//# sourceMappingURL=get-hmac-key.mjs.map
