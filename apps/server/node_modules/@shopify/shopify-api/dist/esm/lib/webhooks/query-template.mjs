function queryTemplate(template, params) {
    let query = template;
    Object.entries(params).forEach(([key, value]) => {
        query = query.replace(`{{${key}}}`, value);
    });
    return query;
}

export { queryTemplate };
//# sourceMappingURL=query-template.mjs.map
