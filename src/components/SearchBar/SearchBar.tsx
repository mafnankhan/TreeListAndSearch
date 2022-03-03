import React from 'react';

interface Props {
    data: any;
    setFilteredData: Function;
}

const SearchBar: React.FC<Props> = ({ data, setFilteredData }) => {

    const dfs = (node: any, term: string, foundIDs: any[]) => {
        let isMatching = node.label && node.label.indexOf(term) > -1;

        if (Array.isArray(node.children)) {
            node.children.forEach((child: any) => {
                const hasMatchingChild = dfs(child, term, foundIDs);
                isMatching = isMatching || hasMatchingChild;
            });
        }

        if (isMatching && node.label) {
            foundIDs.push(node.label);
        }

        return isMatching;
    }

    const filterNode = (data: any, matchedIDS: any[]) => {
        return data
            .filter((item: any) => matchedIDS.indexOf(item.label) > -1)
            .map((item: any) => ({
                ...item,
                children: item.children ? filterNode(item.children, matchedIDS) : [],
            }));
    }

    const onChange = (value: string) => {
        const dataNode = {
            children: data
        }

        const matchedIDS: any[] = []
        dfs(dataNode, value, matchedIDS);

        const filteredNodes = filterNode(data, matchedIDS);

        setFilteredData(JSON.stringify(filteredNodes))
    }

    return (
        <input className='input-search' placeholder='Search Node' onChange={e => onChange(e.target.value)} />
    )
}

export default SearchBar;