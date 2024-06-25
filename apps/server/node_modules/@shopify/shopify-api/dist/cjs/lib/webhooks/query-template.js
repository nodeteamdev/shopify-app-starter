'use strict';

function queryTemplate(template, params) {
    let query = template;
    Object.entries(params).forEach(([key, value]) => {
        query = query.replace(`{{${key}}}`, value);
    });
    return query;
}

exports.queryTemplate = queryTemplate;
//# sourceMappingURL=query-template.js.map
