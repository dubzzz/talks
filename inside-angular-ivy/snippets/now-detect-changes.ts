// check the view and its children (synchronous)
// preferred way to do change detection is to use markDirty
// and wait for the scheduler to call this method at some future point in time 
export function detectChangesInternal<T>(
  hostView: LView,
  hostNode: LElementNode,
  def: ComponentDef<T>,
  component: T
) {
  const oldView = enterView(hostView, hostNode);
  const template = def.template;

  try {
    // runs template function that executes instructions:
    // - updating child elements, directives and components inputs
    // - updating text bindings
    // - refreshing view and content queries
    template(getRenderFlags(hostView), component);
    // runs change detection for child components
    // and executes init and content life cycle hooks
    refreshDirectives();
    // runs change detection for embedded views
    refreshDynamicChildren();
  } finally {
    leaveView(oldView);
  }
}
