import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
var _c0 = [2, "text-align", "center"];
var _c1 = ["width", "300", "alt", "Angular Logo", "src", "[...]"];
var _c2 = ["target", "_blank", "rel", "noopener", "href", "[...]"];
var _c3 = ["target", "_blank", "rel", "noopener", "href", "[...]"];
var _c4 = ["target", "_blank", "rel", "noopener", "href", "[...]"];
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'ng-inferno';
    }
    AppComponent.ngComponentDef = i0.ɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], factory: function AppComponent_Factory(t) { return new (t || AppComponent)(); }, consts: 19, vars: 1, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵelementStart(0, "div", _c0);
            i0.ɵelementStart(1, "h1");
            i0.ɵtext(2);
            i0.ɵelementEnd();
            i0.ɵelement(3, "img", _c1);
            i0.ɵelementEnd();
            i0.ɵelementStart(4, "h2");
            i0.ɵtext(5, "Here are some links to help you start: ");
            i0.ɵelementEnd();
            i0.ɵelementStart(6, "ul");
            i0.ɵelementStart(7, "li");
            i0.ɵelementStart(8, "h2");
            i0.ɵelementStart(9, "a", _c2);
            i0.ɵtext(10, "Tour of Heroes");
            i0.ɵelementEnd();
            i0.ɵelementEnd();
            i0.ɵelementEnd();
            i0.ɵelementStart(11, "li");
            i0.ɵelementStart(12, "h2");
            i0.ɵelementStart(13, "a", _c3);
            i0.ɵtext(14, "CLI Documentation");
            i0.ɵelementEnd();
            i0.ɵelementEnd();
            i0.ɵelementEnd();
            i0.ɵelementStart(15, "li");
            i0.ɵelementStart(16, "h2");
            i0.ɵelementStart(17, "a", _c4);
            i0.ɵtext(18, "Angular blog");
            i0.ɵelementEnd();
            i0.ɵelementEnd();
            i0.ɵelementEnd();
            i0.ɵelementEnd();
        } if (rf & 2) {
            i0.ɵtextBinding(2, i0.ɵinterpolation1(" Welcome to ", ctx.title, "! "));
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