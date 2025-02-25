# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

FlowEditor.js - A React Flow Diagram with Undo/Redo
React Flow

FlowEditor.js - A React Flow Diagram with Undo/Redo
This file is a React.js component that uses @xyflow/react to create an interactive flow diagram editor where users can:
Add Nodes
Delete Nodes
Undo Changes
Redo Changes
It also includes basic flow features like:
Dragging nodes
Connecting nodes with edges
Zooming & Panning

1. Importing Required Dependencies

import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";


What’s Happening?
React & useState: Standard React hooks to manage state.
ReactFlow: The main component that renders the flow diagram.
addEdge: A helper function to connect nodes with edges.
Background, Controls, MiniMap: Extra features for UI.
useNodesState, useEdgesState: Hooks to manage nodes and edges.
CSS Import: Required styles for the flow diagram.
2. Initial Nodes Setup
const initialNodes = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
];

What’s Happening?
We define an initial node (Node 1) with:
id: A unique identifier.
data: The content (label) displayed inside the node.
position: (x, y) coordinates on the canvas.

3. Component State Setup
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState([]);
const [history, setHistory] = useState([]);
const [redoStack, setRedoStack] = useState([]);

What’s Happening?
useNodesState: A special hook from @xyflow/react to manage nodes.
nodes: Stores the list of nodes.
setNodes: Function to update nodes.
onNodesChange: Handles node changes (e.g., dragging).
useEdgesState: A similar hook to manage edges.
history: Keeps track of previous states for Undo.
redoStack: Stores future states for Redo.

4. Function to Add a New Node

const addNode = () => {
  const newNode = {
    id: (nodes.length + 1).toString(),
    data: { label: `Node ${nodes.length + 1}` },
    position: { x: Math.random() * 400, y: Math.random() * 400 },
  };

  setHistory([...history, { nodes, edges }]); // Save current state before adding
  setNodes([...nodes, newNode]); // Add new node
  setRedoStack([]); // Clear redo history on new action
};


What’s Happening?
Creates a new node with a unique id.
Assigns a random position to avoid overlap.
Saves the current state in history for Undo.
Adds the new node to the nodes array.
Clears redoStack (because a new action invalidates the redo history).

5. Function to Delete the Last Node
const deleteNode = () => {
  if (nodes.length === 0) return;
  setHistory([...history, { nodes, edges }]); // Save current state for Undo
  const updatedNodes = nodes.slice(0, -1); // Remove last node
  setNodes(updatedNodes);
  setRedoStack([]);
};


What’s Happening?
If there are no nodes, it does nothing.
Saves the current state before deletion.
Removes the last node from the array.
Clears the redoStack.
6. Undo Function
const undo = () => {
  if (history.length === 0) return;
  const previousState = history[history.length - 1]; // Get last state
  setRedoStack([...redoStack, { nodes, edges }]); // Save current state for Redo
  setNodes(previousState.nodes);
  setEdges(previousState.edges);
  setHistory(history.slice(0, -1)); // Remove last history entry
};
What’s Happening?
If no history, do nothing.
Retrieves the last saved state.
Saves the current state in redoStack (so we can redo later).
Restores nodes & edges to the previous state.
Removes the last history entry.

7. Redo Function

const redo = () => {
  if (redoStack.length === 0) return;
  const nextState = redoStack[redoStack.length - 1]; // Get last redo state
  setHistory([...history, { nodes, edges }]); // Save current state for Undo
  setNodes(nextState.nodes);
  setEdges(nextState.edges);
  setRedoStack(redoStack.slice(0, -1)); // Remove last redo entry
};

What’s Happening?
If redoStack is empty, do nothing.
Retrieves the last redo state.
Saves the current state in history (so we can undo after redo).
Restores the nodes & edges from redo state.
Removes the last entry in redoStack.

8. UI Rendering
return (
  <div style={{ width: "100vw", height: "100vh" }}>
    <div style={{ marginBottom: 10 }}>
      <button onClick={addNode}>Add Node</button>
      <button onClick={deleteNode} disabled={nodes.length === 0}>
        Delete Node
      </button>
      <button onClick={undo} disabled={history.length === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={redoStack.length === 0}>
        Redo
      </button>
    </div>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  </div>
);

What’s Happening?
Buttons for Add Node, Delete Node, Undo, and Redo.
disabled attributes prevent errors when actions are not possible.
ReactFlow Component:
Renders the flow diagram.
Uses event handlers for nodes & edges updates.
Allows edge connections.
Extra Features:
<Background />: Adds a background grid.
<Controls />: Adds zoom & pan controls.
<MiniMap />: Adds a small overview map.
9. Exporting the Component

export default FlowEditor;
This allows us to import and use FlowEditor in other files.

How to Use This Component?
1. Install Dependencies
npm install @xyflow/react
2. Import & Use in App.js
import React from "react";
import FlowEditor from "./FlowEditor";

function App() {
  return (
    <div>
      <h1>React Flow Diagram</h1>
      <FlowEditor />
    </div>
  );
}

export default App;
3. Run the Project
npm start
