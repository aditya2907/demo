// App.js
import React from "react";
import DraggableTabs from "./DraggableTabs";
import DockDemo from "./DockDemo";

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>🚀 Chrome-like Draggable Tabs</h2>
      {/* <DraggableTabs /> */}
      <DockDemo/>
    </div>
  );
};

export default App;
