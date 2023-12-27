import { useMemo, useState } from "react";
import Section from "../../../component/section/Section"
import Select from "../../../component/select/Select";
import { IssueListType } from "./IssueListType"
import { GitHubLabel } from "../../../component/github-api/response-type/GithubLabelType";

const IssueList = (props : IssueListType) => {

    const { issues, labels, format } = props;

    const [addedLabels, setAddedLabels] = useState<GitHubLabel[]>([])
    const addedLabelsIDs = useMemo(() => addedLabels.map(item => item.id),[addedLabels])

    const OnSelectLabelToAdd = (e : RCE<HTMLSelectElement>) => {
        if(!labels) return;
        const { value } = e.target;

        const selected = labels.find((item) => item.id.toString() === value);
        if(!selected) return;
        setAddedLabels(prev => prev.concat(selected));
    }

    const OnRemoveLabel = (id: number) => setAddedLabels(prev => prev.filter(label => label.id !== id));

    const filteredIssues = useMemo(() => {
        if(addedLabelsIDs.length === 0) return issues;
        return issues.filter((item) => {
            const _labelsIDs = item.labels.map((item) => item.id)
            if(format.isLabelFilterSubtrative)
                return addedLabelsIDs.every((labelID) => _labelsIDs.includes(labelID));
            return _labelsIDs.every((labelID) => addedLabelsIDs.includes(labelID));
        })
    },[addedLabelsIDs, issues, format.isLabelFilterSubtrative])

    return (
    <Section.Blur>
        {labels &&
        <>
        <Select label={`Label Filter (${format.isLabelFilterSubtrative ? 'All Match' : 'Some Match'})`}
        onChange={OnSelectLabelToAdd} value={""}>
            <option value={""}>Select To Add</option>
            {labels.map((item) => <option key={item.id} value={item.id} disabled={addedLabelsIDs.includes(item.id)}>
                {item.name}
                </option>)}
        </Select>
        <div className="flex flex-wrap gap-2">
            {addedLabels.map((item) => {
            const color = `#${item.color}`
                return (
                    <div key={item.id} className="p-1 rounded" style={{ background: `${color}98` }}>
                        <span style={{color:color, filter: 'brightness(10)'}}>{item.name}</span>
                        <button className="mx-2" onClick={()=>OnRemoveLabel(item.id)}>X</button>
                    </div>
                    )
            })}
        </div>
        </>
        }
        <hr className="my-2"/>
        <div className="my-2">
        {filteredIssues.map((issue) => {
            return (
                <div key={issue.id}>
                    {format.isLinkRemove ?
                    <>
                    - {format.prefix}{issue.number}{format.suffix} {issue.title}
                    </>
                    :
                    <>
                    - __[{format.prefix}{issue.number}{format.suffix}]({issue.html_url})__ {issue.title}
                    </>
                    }
                </div>
            )
        })}
        </div>
    </Section.Blur>
    )
}

export default IssueList