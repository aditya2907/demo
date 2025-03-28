import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { removeTab, setActiveTab, moveTab } from "./features/tabsSlice";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Draggable Tab Component
const DraggableTab = ({ tab, index, onClick, onClose }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: tab.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <Tab
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      value={tab.id}
      label={
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {tab.label}
          <IconButton size="small" onClick={(e) => onClose(tab.id, e)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      }
      onClick={() => onClick(tab.id)}
    />
  );
};

const MainContent = () => {
  const { tabs, activeTab } = useSelector((state) => state.tabs);
  const dispatch = useDispatch();

  // Handle Tab Click
  const handleTabClick = (tabId) => {
    dispatch(setActiveTab(tabId));
  };

  // Handle Tab Close
  const handleTabClose = (tabId, e) => {
    e.stopPropagation();
    dispatch(removeTab(tabId));
  };

  // Configure Sensors for Dragging
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Handle Drag End
  const onDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tabs.findIndex((tab) => tab.id === active.id);
      const newIndex = tabs.findIndex((tab) => tab.id === over.id);

      // Move tab and update Redux store
      const updatedTabs = arrayMove(tabs, oldIndex, newIndex);
      dispatch(moveTab({ oldIndex, newIndex }));
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      {/* Drag-and-Drop Context */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={tabs.map((tab) => tab.id)} strategy={verticalListSortingStrategy}>
          <Tabs value={activeTab} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab, index) => (
              <DraggableTab
                key={tab.id}
                tab={tab}
                index={index}
                onClick={handleTabClick}
                onClose={handleTabClose}
              />
            ))}
          </Tabs>
        </SortableContext>
      </DndContext>

      {/* Tab Content */}
      <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 1, marginTop: 2 }}>
        {tabs.find((tab) => tab.id === activeTab)?.content || "No tab selected"}
      </Box>
    </Box>
  );
};

export default MainContent;