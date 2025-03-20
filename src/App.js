// App.js
import React from "react";
import DraggableTabs from "./DraggableTabs";
import DockDemo from "./DockDemo";
import { Dock } from "react-dock";

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>🚀 Chrome-like Draggable Tabs</h2>
      {/* <DraggableTabs /> */}
      <DockDemo/>
    </div>
    // <Dock >
    //   {/* you can pass a function as a child here */}
    //   <div >X</div>
    // </Dock>
  );
};

export default App;
