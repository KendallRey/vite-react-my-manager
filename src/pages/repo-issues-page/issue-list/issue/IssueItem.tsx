import { IssueItemType } from "./IssueItemType";
import { useSelector } from "react-redux";
import { selectConfig } from "../../../../redux/IssueConfigSelector";
import IssueLabels from "./IssueItemLabels";

const IssueItem = (props: IssueItemType) => {

    const config = useSelector(selectConfig);

    const { issue, format } = props;

    return (
    <div>
        {config.removeLink ?
        <>
        - {format?.prefix}{issue.number}{format?.suffix} {issue.title}
        </>
        :
        <>
        - __[{format?.prefix}{issue.number}{format?.suffix}](
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.html_url}</a>
        )__ {issue.title}
        </>
        }
        {!config.hideLabels && <IssueLabels labels={issue.labels}/> }
    </div>
    )
}

export default IssueItem;