import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { removeTab, setActiveTab, moveTab } from "./features/tabsSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MainContent = () => {
  const { tabs, activeTab } = useSelector((state) => state.tabs);
  const dispatch = useDispatch();

  // Handle drag end
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    dispatch(
      moveTab({
        fromIndex: source.index,
        toIndex: destination.index,
      })
    );
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tabs" direction="horizontal">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ display: "flex", borderBottom: 1, borderColor: "divider" }}
            >
              {tabs.map((tab, index) => (
                <Draggable key={tab.id} draggableId={tab.id} index={index}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Tab
                        value={tab.id}
                        label={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {tab.label}
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeTab(tab.id));
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        }
                        onClick={() => dispatch(setActiveTab(tab.id))}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Tab Content */}
      <Box sx={{ padding: 2 }}>
        {tabs.find((tab) => tab.id === activeTab)?.content || "No tab selected"}
      </Box>
    </Box>
  );
};

export default MainContent;