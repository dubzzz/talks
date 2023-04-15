export function checkAndUpdateView(view: ViewData) {
  if (view.state & ViewState.BeforeFirstCheck) {
    view.state &= ~ViewState.BeforeFirstCheck;
    view.state |= ViewState.FirstCheck;
  } else {
    view.state &= ~ViewState.FirstCheck;
  }
  shiftInitState(
    view,
    ViewState.InitState_BeforeInit,
    ViewState.InitState_CallingOnInit
  );
  markProjectedViewsForCheck(view);
  Services.updateDirectives(view, CheckType.CheckAndUpdate);
  execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
  execQueriesAction(
    view,
    NodeFlags.TypeContentQuery,
    NodeFlags.DynamicQuery,
    CheckType.CheckAndUpdate
  );
  let callInit = shiftInitState(
    view,
    ViewState.InitState_CallingOnInit,
    ViewState.InitState_CallingAfterContentInit
  );
  callLifecycleHooksChildrenFirst(
    view,
    NodeFlags.AfterContentChecked | (callInit ? NodeFlags.AfterContentInit : 0)
  );

  Services.updateRenderer(view, CheckType.CheckAndUpdate);

  execComponentViewsAction(view, ViewAction.CheckAndUpdate);
  execQueriesAction(
    view,
    NodeFlags.TypeViewQuery,
    NodeFlags.DynamicQuery,
    CheckType.CheckAndUpdate
  );
  callInit = shiftInitState(
    view,
    ViewState.InitState_CallingAfterContentInit,
    ViewState.InitState_CallingAfterViewInit
  );
  callLifecycleHooksChildrenFirst(
    view,
    NodeFlags.AfterViewChecked | (callInit ? NodeFlags.AfterViewInit : 0)
  );

  if (view.def.flags & ViewFlags.OnPush) {
    view.state &= ~ViewState.ChecksEnabled;
  }
  view.state &= ~(ViewState.CheckProjectedViews | ViewState.CheckProjectedView);
  shiftInitState(
    view,
    ViewState.InitState_CallingAfterViewInit,
    ViewState.InitState_AfterInit
  );
}
