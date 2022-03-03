import React, { useState } from 'react';
import { debounce } from 'lodash';

interface Props {
    data: any;
    setJsonData: Function
}

const JsonEditor:React.FC <Props>= ({ data, setJsonData }) => {
    const formatJSON = (input: string): string => {
        try {
            if (input.length == 0) {
                return '';
            } else {
                var parsedData = JSON.parse(input);
                return JSON.stringify(parsedData, null, 4);
            }
        } catch (error: any) {
            return error.messsage
        }
    }

    const onChange = debounce((value: string) => {
        setJsonData(JSON.stringify(value));
    }, 1200);

    return (
        <textarea 
            value={formatJSON(data)}
            onChange={e => onChange(e.target.value)}
        />
    )
}

export default JsonEditor;