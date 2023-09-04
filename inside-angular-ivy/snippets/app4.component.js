import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
var _c0 = [3, "label", "act"];
var _c1 = [3, "value", "valueChange"];
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.name = 'ng-inferno';
        this.data = [1, 2, 3];
    }
    AppComponent.prototype.reset = function () {
        this.name = '';
    };
    AppComponent.ngComponentDef = i0.ɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], factory: function AppComponent_Factory(t) { return new (t || AppComponent)(); }, consts: 4, vars: 2, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵelementStart(0, "div");
            i0.ɵelementStart(1, "app-subcompo", _c0);
            i0.ɵlistener("act", function($event) { return ctx.reset(); });
            i0.ɵelementEnd();
            i0.ɵelementStart(2, "input", _c1);
            i0.ɵlistener("valueChange", function($event) { return ctx.name = $event; });
            i0.ɵelementEnd();
            i0.ɵelementEnd();
        } if (rf & 2) {
            i0.ɵelementProperty(1, "label", i0.ɵbind(ctx.name));
            i0.ɵelementProperty(2, "value", i0.ɵbind(ctx.name));
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