"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MjmlAdapter = void 0;
const handlebars_adapter_1 = require("./handlebars.adapter");
const ejs_adapter_1 = require("./ejs.adapter");
const pug_adapter_1 = require("./pug.adapter");
const mjml_1 = require("mjml");
class MjmlAdapter {
    constructor(engine, config, others) {
        this.engine = engine;
        if (typeof engine == 'string') {
            if (engine === 'pug') {
                this.engine = new pug_adapter_1.PugAdapter(config);
            }
            else if (engine === 'handlebars') {
                this.engine = new handlebars_adapter_1.HandlebarsAdapter(others.handlebar.helper, config);
            }
            else if (engine === 'ejs') {
                this.engine = new ejs_adapter_1.EjsAdapter(config);
            }
            else if (engine === '') {
                engine = null;
            }
        }
    }
    compile(mail, callback, mailerOptions) {
        var _a;
        (_a = this === null || this === void 0 ? void 0 : this.engine) === null || _a === void 0 ? void 0 : _a.compile(mail, () => {
            mail.data.html = (0, mjml_1.default)(mail.data.html).html;
            callback();
        }, mailerOptions);
    }
}
exports.MjmlAdapter = MjmlAdapter;
