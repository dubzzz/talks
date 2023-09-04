template: (rf: core.ɵRenderFlags, ctx: AppComponent) => {
    if (rf & 1) {
        /** Create: This runs only on first render */
        // eg.: i0.ɵtext(2);
    }
    if (rf & 2) {
        /** Update: This runs on every change detection */
        // eg.: i0.ɵtextBinding(2, "text");
    }
},