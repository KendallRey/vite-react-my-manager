import { useEffect, useMemo } from "react";
import { IssueItemType } from "./IssueItemType";
import { OctoGetIssueCommentsApi } from "../../../component/github-api/repository-issues/RepositoryIssueCommentsApi";
import { useSelector } from "react-redux";
import { selectParams } from "../../../redux/GithubParamsSelector";
import { OCTO_KEY_ISSUE_NUMBER } from "../../../component/github-api/GithubBaseApiType";

const IssueItem = (props: IssueItemType) => {

    const params = useSelector(selectParams);

    const { issue, format } = props;

    const labelColor = useMemo(()=>{
        if(!issue) return;
        if(issue.labels.length === 0) return;
        if(issue.labels.length !== 1) return;
        return `#${issue.labels[0].color}`
    },[issue])

    useEffect(()=>{
        GetIssueComments();
    },[])

    const GetIssueComments = async () => {
        const _comments = await OctoGetIssueCommentsApi({
            ...params,
            [OCTO_KEY_ISSUE_NUMBER] : issue.number
        })
        console.log("TES",_comments)
    }

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