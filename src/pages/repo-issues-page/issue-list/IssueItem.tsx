import { useEffect, useMemo } from "react";
import { IssueItemType } from "./IssueItemType";

const IssueItem = (props: IssueItemType) => {
    const { issue, format } = props;

    const labelColor = useMemo(()=>{
        if(!issue) return;
        if(issue.labels.length === 0) return;
        if(issue.labels.length !== 1) return;
        return `#${issue.labels[0].color}`
    },[issue])

    useEffect(()=>{
    },[])

    return (
    <div>
        {format?.isLinkRemove ?
        <>
        - {format?.prefix}{issue.number}{format?.suffix} {issue.title}
        </>
        :
        <>
        - __[{format?.prefix}{issue.number}{format?.suffix}](
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer" style={{ color:labelColor }}>{issue.html_url}</a>
        )__ {issue.title}
        </>
        }
    </div>
    )
}

export default IssueItem;