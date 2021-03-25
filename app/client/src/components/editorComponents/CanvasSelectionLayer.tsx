import React from "react";
import { useShowPropertyPane } from "utils/hooks/dragResizeHooks";
import { selectWidget } from "actions/widgetActions";
import {
  getCurrentWidgetId,
  getIsPropertyPaneVisible,
} from "selectors/propertyPaneSelectors";
import { useSelector } from "store";
import { AppState } from "reducers";

export const CanvasSelectionLayer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const showPropertyPane = useShowPropertyPane();
  const isPropPaneVisible = useSelector(getIsPropertyPaneVisible);
  const selectedWidgetId = useSelector(getCurrentWidgetId);
  const focusedWidget = useSelector(
    (state: AppState) => state.ui.widgetDragResize.focusedWidget,
  );
  // This state tells us whether a `ResizableComponent` is resizing
  const isResizing = useSelector(
    (state: AppState) => state.ui.widgetDragResize.isResizing,
  );

  // This state tells us whether a `DraggableComponent` is dragging
  const isDragging = useSelector(
    (state: AppState) => state.ui.widgetDragResize.isDragging,
  );
  const openPropertyPane = () => {
    // ignore click captures if the component was resizing or dragging coz it is handled internally in draggable component
    if (isResizing || isDragging) return;
    if (
      (!isPropPaneVisible && selectedWidgetId === focusedWidget) ||
      selectedWidgetId !== focusedWidget
    ) {
      selectWidget(focusedWidget);
      showPropertyPane(focusedWidget, undefined, true);
    }
  };
  return (
    <div onClickCapture={openPropertyPane} className="canvas-triggers">
      {children}
    </div>
  );
};
