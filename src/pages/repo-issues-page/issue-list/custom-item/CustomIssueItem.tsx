import { useMemo } from "react";
import { CustomIssueItemType, FormatItemField, FormatItemText } from "./CustomIssueItemType";
import React from "react";

const CustomIssueItem = (props: CustomIssueItemType) => {
    const { issue, formats } = props;

    const labelColor = useMemo(()=>{
        if(!issue) return;
        if(issue.labels.length === 0) return;
        if(issue.labels.length !== 1) return;
        return `#${issue.labels[0].color}`
    },[issue])

    return (
    <div>
        {formats.map((format) => {
        return (
            <React.Fragment key={issue.id+format.id}>
                {format.type === FormatItemText ?
                <span key={format.name}>{format.value}</span>
                :
                format.type === FormatItemField ? 
                    format.value.toString().includes('url') ?
                    <a href={(issue as any)[format.value]} target="_blank" rel="noopener noreferrer" style={{ color:labelColor }}>{(issue as any)[format.value]}</a>
                    :
                    <span>{(issue as any)[format.value]}</span>
                :
                <span></span>
                }
            </React.Fragment>
            )
        
        })}
    </div>
    )
}

export default CustomIssueItem;
