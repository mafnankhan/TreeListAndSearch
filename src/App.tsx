import React, { useState } from 'react';
import './components/FontAwesomeIcons';
import Tree from './components/Tree/Tree';
import JsonEditor from './components/JsonEditor/JsonEditor';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';

const treeData = [
  {
    label: "Documents",
    children: [
      {
        label: "Head",
        children: [
          {
            label: "Body",
            children: [
              {
                label: "Img",
              },
              {
                label: "span",
              },
              {
                label: "p",
                children: [
                  {
                    label: "h1",
                  },
                  {
                    label: "h2",
                  },
                  {
                    label: "h3",
                  },
                ]
              },
            ]
          },
          {
            label: "div",
          },
          {
            label: "button",
          },
          {
            label: "Select",
          },
        ],
      },
    ],
  },
  {
    label: "Form",
    children: [
      {
        label: "textarea",
      },
      {
        label: "radio",
      },
    ],
  },
  {
    label: "Checkbox",
    children: [],
  },
];

const App: React.FC = () => {
  const [JsonData, setJsonData] = useState(JSON.stringify(treeData));
  const [filteredData, setFilteredData] = useState<any>();
  const [selectedNode, setSelectedNode] = useState<null | any>(null);

  return (
    <>
      <header className="App-header">
        <h2>Coding Challenge</h2>
      </header>
      <body className='App-body'>
        <div className='left-col'>
          <SearchBar data={JSON.parse(JsonData)} setFilteredData={setFilteredData} />
          <Tree data={filteredData ? JSON.parse(filteredData) : JSON.parse(JsonData)} selectedNode={selectedNode} setSelectedNode={setSelectedNode} depth={0} />
        </div>
        <div className='middle-col'>
            <div className='editor-box'>
              <div className='editorp-box-label'>
                Enter valid json below:
              </div>
              <div className="editor-box-element">
                <JsonEditor data={JsonData} setJsonData={setJsonData}/>
              </div>
            </div>
        </div>
        <div className='right-col'>
          {selectedNode && (
            <>
            <p className='tree-selected-node'>SELECTED NODE: {selectedNode?.label}</p>
            <p className='tree-selected-depth'>DEPTH: {selectedNode?.depth}</p>
            </>
          )}
        </div>
      </body>
    </>
  );
}

export default App;
