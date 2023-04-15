import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
var _c0 = [3, "ngIf"];
var _c1 = ["ngFor", "", 3, "ngForOf"];
var _c2 = [3, "value", "valueChange"];
function AppComponent_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵelementStart(0, "span");
    i0.ɵtext(1);
    i0.ɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = i0.ɵnextContext();
    i0.ɵtextBinding(1, i0.ɵinterpolation1("Hello ", ctx_r0.name, ""));
} }
function AppComponent_li_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵelementStart(0, "li");
    i0.ɵtext(1);
    i0.ɵelementEnd();
} if (rf & 2) {
    var item_r2 = ctx.$implicit;
    i0.ɵtextBinding(1, i0.ɵinterpolation1("", item_r2, ""));
} }
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.name = 'ng-inferno';
        this.data = [1, 2, 3];
    }
    AppComponent.ngComponentDef = i0.ɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], factory: function AppComponent_Factory(t) { return new (t || AppComponent)(); }, consts: 6, vars: 3, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵelementStart(0, "div");
            i0.ɵtemplate(1, AppComponent_span_1_Template, 2, 1, "span", _c0);
            i0.ɵelementStart(2, "ul");
            i0.ɵtemplate(3, AppComponent_li_3_Template, 2, 1, "li", _c1);
            i0.ɵelementEnd();
            i0.ɵelementStart(4, "input", _c2);
            i0.ɵlistener("valueChange", ($event) => (ctx.name = $event));
            i0.ɵelementEnd();
            i0.ɵelementEnd();
        } if (rf & 2) {
            i0.ɵelementProperty(1, "ngIf", i0.ɵbind((ctx.name !== "Bob")));
            i0.ɵelementProperty(3, "ngForOf", i0.ɵbind(ctx.data));
            i0.ɵelementProperty(4, "value", i0.ɵbind(ctx.name));
        } }, encapsulation: 2 });
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map