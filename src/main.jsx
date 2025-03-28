import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { removeTab, setActiveTab, moveTab } from "./features/tabsSlice";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Draggable Tab Component
const DraggableTab = ({ tab, index, moveTabHandler, onClick, onClose }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TAB",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TAB",
    hover(item) {
      if (item.index !== index) {
        moveTabHandler(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Tab
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
    </div>
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

  // Handle Drag and Move
  const moveTabHandler = (fromIndex, toIndex) => {
    dispatch(moveTab({ fromIndex, toIndex }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {/* Tabs with Drag-and-Drop */}
        <Tabs value={activeTab} variant="scrollable" scrollButtons="auto">
          {tabs.map((tab, index) => (
            <DraggableTab
              key={tab.id}
              tab={tab}
              index={index}
              moveTabHandler={moveTabHandler}
              onClick={handleTabClick}
              onClose={handleTabClose}
            />
          ))}
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 1, marginTop: 2 }}>
          {tabs.find((tab) => tab.id === activeTab)?.content || "No tab selected"}
        </Box>
      </Box>
    </DndProvider>
  );
};

export default MainContent;