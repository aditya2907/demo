import { Box } from '@mui/material';
import Header from './components/Header';
import Content from './components/Content';
import MiniDrawer from './components/ClippedDrawer';

function App() {
	return (
		<div>
			<Box>
				<Box>
					<Header />
					<Content />
				</Box>
				<Box >
					<MiniDrawer />
				</Box>
			</Box>

		</div>
	);
}

export default App;
