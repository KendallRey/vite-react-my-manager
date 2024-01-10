import { useEffect, useMemo, useState } from "react";
import Section from "../../../component/section/Section"
import Select from "../../../component/select/Select";
import { IssueListType } from "./IssueListType"
import { GitHubLabel } from "../../../component/github-api/response-type/GithubLabelType";
import Button from "../../../component/button/Button";
import IssueItem from "./IssueItem";
import { GITHUB_COLORABLE_TEXT_STYLE, GITHUB_HEX_OPACITY } from "../../../utils/GithubColor";
import { TITLE_FILTER_TYPE_EXCLUDES, TITLE_FILTER_TYPE_INCLUDES } from "../RepoIssuesPageType";

const IssueList = (props : IssueListType) => {

    const { issues, labels, format, filter } = props;

    const [addedLabels, setAddedLabels] = useState<GitHubLabel[]>([])
    const addedLabelsIDs = useMemo(() => addedLabels.map(item => item.id),[addedLabels])

    const OnSelectLabelToAdd = (e : RCE<HTMLSelectElement>) => {
        if(!labels) return;
        const { value } = e.target;

        const selected = labels.find((item) => item.id.toString() === value);
        if(!selected) return;
        setAddedLabels(prev => prev.concat(selected));
    }

    useEffect(() => {
        setAddedLabels([]);
    }, [labels])

    const OnRemoveLabel = (id: number) => setAddedLabels(prev => prev.filter(label => label.id !== id));

    const OnClearLabels = () => setAddedLabels([])

    const filteredIssues = useMemo(() => {
        let filteredIssues = addedLabelsIDs.length === 0 ? issues : issues?.filter((item) => {
            const _labelsIDs = item.labels.map((item) => item.id)
            if(format.isLabelFilterSubtrative)
                return addedLabelsIDs.every((labelID) => _labelsIDs.includes(labelID));
            return _labelsIDs.every((labelID) => addedLabelsIDs.includes(labelID));
        })
        if(filter.isOn){
            filteredIssues = filteredIssues?.filter((item) =>{
                const title = item.title.toLowerCase();
                let isIncluded = true;
                if(filter.isOn){
                    if(filter[TITLE_FILTER_TYPE_INCLUDES].length !== 0){
                        const toIncludes = filter[TITLE_FILTER_TYPE_INCLUDES].map((item) => item.value.toLowerCase());
                        isIncluded = toIncludes.some((include) => title.includes(include));
                    }
                    if(filter[TITLE_FILTER_TYPE_EXCLUDES].length !== 0){
                        const toExcludes = filter[TITLE_FILTER_TYPE_EXCLUDES].map((item) => item.value.toLowerCase());
                        isIncluded = !toExcludes.includes(title);
                    }
                    
                }

                return isIncluded;
            })
        }

        return filteredIssues
    },[addedLabelsIDs, issues, format.isLabelFilterSubtrative, filter])

    return (
    <Section.Blur>
        {labels &&
        <>
        <Select label={`Label Filter (${format.isLabelFilterSubtrative ? 'All Match' : 'Some Match'})`}
        onChange={OnSelectLabelToAdd} value={""}>
            <option value={""}>Select To Add</option>
            {labels.map((item) => <option key={item.id} value={item.id} disabled={addedLabelsIDs.includes(item.id)}
            style={{ color: `#${item.color}` }}>
                {item.name}
                </option>)}
        </Select>
        <Button.Action className="p-1 my-1 rounded text-xs" onClick={OnClearLabels}>
            Clear Filter/s
        </Button.Action>
        <div className="flex flex-wrap gap-2">
            {addedLabels.map((item) => {
            const color = `#${item.color}`
                return (
                    <div key={item.id} className="p-1 rounded" style={{ background: `${color}${GITHUB_HEX_OPACITY}` }}>
                        <span style={{color:color, filter: GITHUB_COLORABLE_TEXT_STYLE}}>{item.name}</span>
                        <button className="mx-2" onClick={()=>OnRemoveLabel(item.id)}>X</button>
                    </div>
                    )
            })}
        </div>
        </>
        }
        <hr className="my-2"/>
        <div className="my-2">
        <span>Issue/s ({filteredIssues?.length})</span>
        <hr/>
        {filteredIssues === undefined ?
        <div className="text-center text-2xl">Loading . . .</div> :
        filteredIssues.length === 0 ?
        <div className="text-center text-2xl">No Issue/s found.</div> :
        filteredIssues.map((issue) => {
            return (
                <IssueItem key={issue.id} issue={issue} format={format}/>
            )
        })}
        </div>
    </Section.Blur>
    )
}

export default IssueList