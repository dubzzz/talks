(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./a", "./a", "./b"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const a_1 = require("./a");
    const a = require("./a");
    const b_1 = require("./b");
    console.log(a_1.v1);
    console.log(a);
    console.log(b_1.default);
});
