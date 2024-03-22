import { IssueItemType } from "./IssueItemType";
import { useSelector } from "react-redux";
import { selectConfig } from "../../../../redux/IssueConfigSelector";
import IssueLabels from "./IssueItemLabels";
import { selectFormat } from "@/redux/IssueFormatSelector";

const IssueItem = (props: IssueItemType) => {

    const _config = useSelector(selectConfig);
    const _format = useSelector(selectFormat);

    const { issue } = props;

    return (
    <div>
        {_config.removeLink ?
        <>
        - {_format?.prefix}{issue.number}{_format?.suffix} {issue.title}
        </>
        :
        <>
        - __[{_format?.prefix}{issue.number}{_format?.suffix}](
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">{issue.html_url}</a>
        )__ {issue.title}
        </>
        }
        {!_config.hideLabels && <IssueLabels labels={issue.labels}/> }
    </div>
    )
}

export default IssueItem;