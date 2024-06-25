// eslint-disable-next-line import/no-mutable-exports
let abstractRuntimeString = () => {
    throw new Error("Missing adapter implementation for 'abstractRuntimeString' - make sure to import the appropriate adapter for your platform");
};
function setAbstractRuntimeString(func) {
    abstractRuntimeString = func;
}

export { abstractRuntimeString, setAbstractRuntimeString };
//# sourceMappingURL=runtime-string.mjs.map
