import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css'

interface TreeProps {
    data: any[];
    selectedNode: null | number;
    setSelectedNode: Function;
    depth: number;
}

interface TreeNodeProps {
    node: any;
    selectedNode: null | number;
    setSelectedNode: Function;
    depth: number;
    label: any;
}

const Tree: React.FC<TreeProps> = ({ data, depth = 0, selectedNode, setSelectedNode }) => {
    return (
        <div className="d-tree">
            <ul className="d-flex d-tree-container flex-column">
                {data.map((tree) => (
                    <TreeNode {...tree} node={tree} selectedNode={selectedNode} setSelectedNode={setSelectedNode} depth={depth + 1} />
                ))}
            </ul>
        </div>
    );
};

const TreeNode: React.FC<TreeNodeProps> = ({ node, selectedNode, setSelectedNode, label, depth }) => {
    const [childVisible, setChildVisiblity] = useState(false);

    const hasChild = node.children ? true : false;

    return (
        <li className="d-tree-node border-0">
            <div className="d-flex" onClick={(e) => setChildVisiblity((v) => !v)}>
                {hasChild && (
                    <div className={`d-inline d-tree-toggler d-tree-toggler-space ${childVisible ? "active" : ""}`}>
                        <FontAwesomeIcon icon="caret-right" />
                    </div>
                )}

                <div className="col d-tree-head" onClick={() => setSelectedNode({label, depth})}>
                    {node.label}
                </div>
            </div>

            {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree data={node.children} selectedNode={selectedNode} setSelectedNode={setSelectedNode} depth={depth} />
                    </ul>
                </div>
            )}
        </li>
    );
};

export default Tree;