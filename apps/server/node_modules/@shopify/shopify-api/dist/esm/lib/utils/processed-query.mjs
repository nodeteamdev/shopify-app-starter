class ProcessedQuery {
    static stringify(keyValuePairs) {
        if (!keyValuePairs || Object.keys(keyValuePairs).length === 0)
            return '';
        return new ProcessedQuery().putAll(keyValuePairs).stringify();
    }
    processedQuery;
    constructor() {
        this.processedQuery = new URLSearchParams();
    }
    putAll(keyValuePairs) {
        Object.entries(keyValuePairs).forEach(([key, value]) => this.put(key, value));
        return this;
    }
    put(key, value) {
        if (Array.isArray(value)) {
            this.putArray(key, value);
        }
        else if (value?.constructor === Object) {
            this.putObject(key, value);
        }
        else {
            this.putSimple(key, value);
        }
    }
    putArray(key, value) {
        value.forEach((arrayValue) => this.processedQuery.append(`${key}[]`, `${arrayValue}`));
    }
    putObject(key, value) {
        Object.entries(value).forEach(([entry, entryValue]) => {
            this.processedQuery.append(`${key}[${entry}]`, `${entryValue}`);
        });
    }
    putSimple(key, value) {
        this.processedQuery.append(key, `${value}`);
    }
    stringify(omitQuestionMark = false) {
        const queryString = this.processedQuery.toString();
        return omitQuestionMark ? queryString : `?${queryString}`;
    }
}

export { ProcessedQuery as default };
//# sourceMappingURL=processed-query.mjs.map
