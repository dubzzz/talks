function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    i0.ɵelementStart(0, "div");
    i0.ɵtext(1);
    i0.ɵelementStart(2, "input", _c0);
    i0.ɵlistener("valueChange", $event => (ctx.name = $event));
    i0.ɵelementEnd();
    i0.ɵelementEnd();
  }
  if (rf & 2) {
    i0.ɵtextBinding(1, i0.ɵinterpolation1(" Hello ", ctx.name, " "));
    i0.ɵelementProperty(2, "value", i0.ɵbind(ctx.name));
  }
}
