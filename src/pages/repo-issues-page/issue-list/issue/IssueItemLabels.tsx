import { useCallback } from "react";
import { GithubIssueLabel } from "../../../../component/github-api/response-type/GithubIssueType"

type IssueLabelT = {
  labels: GithubIssueLabel[];
}

const IssueLabels: React.FC<IssueLabelT> = (props) => {
  const { labels} = props;

  const GetLabelColor = useCallback((color: string) => `#${color}`,[])

  return (
    <>
    <br/>
    <div className="mt-2">
      {labels.map((label) => 
        <span key={label.id}
          className="bg-blue-100 text-xs font-medium me-2 px-2.5 py-0.5 rounded border bg-transparent"
          style={{ color: GetLabelColor(label.color), borderColor: GetLabelColor(label.color) }}>
            {label.name}
        </span>)}
    </div>
    </>
    )
}

export default IssueLabels