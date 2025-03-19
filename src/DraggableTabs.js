
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Paper, Typography, IconButton, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemType = 'TAB';

const DraggableTab = ({ tab, index, moveTab, closeTab }) => {
  const [, ref] = useDrag({
      type: ItemType,
      item: { index },
  });

  const [, drop] = useDrop({
      accept: ItemType,
      hover: (draggedItem) => {
          if (draggedItem.index !== index) {
              moveTab(draggedItem.index, index);
              draggedItem.index = index;
          }
      },
  });

  return (
      <Box
          ref={(node) => ref(drop(node))}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'move', padding: 0.5 }}
      >
          <Typography variant="body2" sx={{ mr: 1 }}>
              {tab.title}
          </Typography>
          <IconButton size="small" onClick={() => closeTab(tab.id)}>
              <CloseIcon color="error" fontSize="small" />
          </IconButton>
      </Box>
  );
};

export default DraggableTab;