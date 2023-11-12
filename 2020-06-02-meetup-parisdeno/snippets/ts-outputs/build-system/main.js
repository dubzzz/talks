System.register(["./a", "./b"], function (exports_1, context_1) {
    "use strict";
    var a_1, a, b_1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
                a = a_1_1;
            },
            function (b_1_1) {
                b_1 = b_1_1;
            }
        ],
        execute: function () {
            console.log(a_1.v1);
            console.log(a);
            console.log(b_1.default);
        }
    };
});
