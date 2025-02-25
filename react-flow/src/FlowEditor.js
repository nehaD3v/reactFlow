import React, { useState } from "react";
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


const initialNodes = [
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
];

const FlowEditor = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };

    setHistory([...history, { nodes, edges }]);
    setNodes([...nodes, newNode]);
    setRedoStack([]); // Clear redo stack on new action
  };

  const deleteNode = () => {
    if (nodes.length === 0) return;
    setHistory([...history, { nodes, edges }]);
    const updatedNodes = nodes.slice(0, -1);
    setNodes(updatedNodes);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setRedoStack([...redoStack, { nodes, edges }]);
    setNodes(previousState.nodes);
    setEdges(previousState.edges);
    setHistory(history.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1];
    setHistory([...history, { nodes, edges }]);
    setNodes(nextState.nodes);
    setEdges(nextState.edges);
    setRedoStack(redoStack.slice(0, -1));
  };

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
};

export default FlowEditor;
