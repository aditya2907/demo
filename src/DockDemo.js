import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Dock } from 'react-dock';
import { Box, Paper, Typography, IconButton, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DraggableTab from './DraggableTabs';

const ItemType = 'TAB';


const TabDemo = () => {
	const [tabs, setTabs] = useState([{ id: 1, title: 'Tab 1', content: 'This is content of Tab 1' }]);
	const [activeTab, setActiveTab] = useState(1);
	const [isDockVisible, setIsDockVisible] = useState(true);

	const addTab = () => {
		const newTab = {
			id: Date.now(),
			title: `Tab ${tabs.length + 1}`,
			content: `This is content of Tab ${tabs.length + 1}`,
		};
		setTabs([...tabs, newTab]);
		setActiveTab(newTab.id);
	};

	const closeTab = (id) => {
		const updatedTabs = tabs.filter((tab) => tab.id !== id);
		setTabs(updatedTabs);
		if (id === activeTab && updatedTabs.length > 0) {
			setActiveTab(updatedTabs[0].id);
		}
	};

	const closeAllTabs = () => {
		setTabs([]);
		setActiveTab(null);
	};

	const moveTab = (fromIndex, toIndex) => {
		const updatedTabs = [...tabs];
		const [movedTab] = updatedTabs.splice(fromIndex, 1);
		updatedTabs.splice(toIndex, 0, movedTab);
		setTabs(updatedTabs);
	};

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content || 'No content available';

	return (
		<DndProvider backend={HTML5Backend}>
			<Box display="flex" alignItems="center" bgcolor="#f5f5f5">
				<Paper elevation={-40} sx={{ padding: 2, width: '90%', height: '90%', maxWidth: 500, maxHeight: 800 }}>
					<Typography variant="h6" gutterBottom>
						Tab Manager
					</Typography>
					<Box mb={2} display="flex" justifyContent="flex-end">
						<IconButton color="primary" onClick={addTab} sx={{ mr: 1 }}>
							<AddIcon />
						</IconButton>
						<IconButton color="error" onClick={closeAllTabs}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</Paper>

				{/* <Dock position="bottom" isVisible={isDockVisible} fluid size={0.4}> */}
				<Box p={2} bgcolor="#f5f5f5" height="100%" overflow="auto">
					<Paper elevation={-40} sx={{ padding: 2, width: '90%', height: '90%', maxWidth: 500, maxHeight: 800 }}>
						<Box p={2} bgcolor="#f5f5f5" height="100%">
							<Box p={2} bgcolor="#f5f5f5" height="100%" display="flex" justifyContent="flex-end" >
								<IconButton color="error" onClick={closeAllTabs}>
									<CloseIcon />
								</IconButton>
							</Box>
							<Tabs
								value={activeTab}
								onChange={handleTabChange}
								variant="scrollable"
								scrollButtons="auto"
								allowScrollButtonsMobile
								sx={{ minHeight: 32 }}
							>
								{tabs.map((tab, index) => (
									<Tab
										key={tab.id}
										label={<DraggableTab tab={tab} index={index} moveTab={moveTab} closeTab={closeTab} />}
										value={tab.id}
										sx={{ minWidth: 100, padding: 0.5 }}
									/>
								))}

							</Tabs>

							<Box mt={2} p={2} bgcolor="#fff" borderRadius={1} boxShadow={1} height="calc(100% - 100px)" overflow="auto">
								<Typography variant="body1">{activeTabContent}</Typography>
							</Box>



						</Box>
					</Paper>
				</Box>
				{/* </Dock> */}
			</Box>
		</DndProvider>
	);
};

export default TabDemo;
