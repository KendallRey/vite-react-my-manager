import { useEffect, useMemo, useState } from "react";
import Section from "../../../component/section/Section"
import { IssueListType } from "./IssueListType"
import IssueItem from "./issue/IssueItem";
import { TITLE_FILTER_TYPE_EXCLUDES, TITLE_FILTER_TYPE_INCLUDES } from "../RepoIssuesPageType";
import { OctoGetRepositoryIssuesApi } from "../../../component/github-api/repository-issues/RepositoryIssuesApi";
import { GitHubIssue } from "../../../component/github-api/response-type/GithubIssueType";
import { useSelector } from "react-redux";
import { selectParams } from "../../../redux/GithubParamsSelector";
import { OCTO_KEY_REPO } from "../../../component/github-api/GithubBaseApiType";
import { GitHubRepository } from "../../../component/github-api/response-type/GithubRepositoryType";
import { selectConfig } from "../../../redux/IssueConfigSelector";
import { Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const IssueList = (props : IssueListType) => {

    const { format, filter, repositories } = props;
    const _params = useSelector(selectParams);
    const config = useSelector(selectConfig);
    // 
    // #region Filter Labels

    type FilterLabelType = {
        id: string;
        value: string;
    }

    const [labels, setLabels] = useState<FilterLabelType[]>([]);
    const labelValues = useMemo(()=> labels.map((item) => item.value) ,[labels]);
    const OnRemoveLabel = (id: string) =>  setLabels(prev => prev.filter(label => label.id !== id));
    const OnClearLabels = () =>  setLabels([]);

    const [labelToAdd, setLabelToAdd] = useState("")
    
    const onSubmitAddLabel = (e: React.FormEvent) => {
        e.preventDefault();
        onAddLabel();
    }
    const onAddLabel = () => {
        if(labelToAdd.trim() === '') return;
        const formatLabelToAdd = labelToAdd.trim();
        if(labelValues.includes(formatLabelToAdd)){
            return;
        }

        const date = new Date();
        const newLabelToAdd = {
            id: "label"+date.toISOString()+date.getMilliseconds(),
            value: formatLabelToAdd,
        }
        setLabels((prev) => prev.concat(newLabelToAdd))
        setLabelToAdd("")
    }

    // #endregion
    // 

    // #region Repository

    const [selectedRepository, setSelectedRepository] = useState<GitHubRepository>()

    const OnSelectRepository = (e : RCE<HTMLSelectElement>) => {
        const { value } = e.target
        const selectedRepository = repositories?.find((repo) => repo.id.toString() === value);
        if(!selectedRepository) return;

        setSelectedRepository(selectedRepository);
    }

    // #endregion

    //#region Issues

	const [issues, setIssues] = useState<GitHubIssue[] | undefined>([])

	const GetRepositoryIssues = async () => {
		setIssues(undefined);
        if(!selectedRepository) return;
		const data = await OctoGetRepositoryIssuesApi({
			..._params,
            [OCTO_KEY_REPO]:  selectedRepository.name,
			params: {
				sort: 'created',
				direction: 'asc',
                labels: labelValues.join(',')
			}
		})
		if(data === null) return;
		setIssues(data);
	}
	
	const ClearIssues = () => setIssues([]);

	//#endregion

    const filteredIssues = useMemo(() => {
        let filteredIssues = issues;
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
    },[issues, config.isLabelFilterSubtractive, filter])

    return (
    <Section.Blur>
        <div className="flex flex-wrap justify-between">
        <FormControl>
          <FormLabel>Repository:</FormLabel>
          <Select value={selectedRepository?.id ?? ''} onChange={OnSelectRepository} required>
            {repositories?.map((item) => {
              return (
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            })}
          </Select>
        </FormControl>
        <div className="flex flex-wrap gap-4">
            <Button className="p-1 my-1" onClick={GetRepositoryIssues} disabled={!selectedRepository}>
                Fetch Issue/s
            </Button>
            <Button className="p-1 my-1" onClick={ClearIssues}>
                Clear
            </Button>
            </div>
            </div>
            <hr/>
        <div className="flex flex-wrap justify-between">
            <div className="flex flex-wrap gap-4">
            <form onSubmit={onSubmitAddLabel}>
              <FormControl>
                <FormLabel>{`Enter Label Filter (${labels.length}):`}</FormLabel>
                <Input maxLength={24} value={labelToAdd} onChange={({target}) => setLabelToAdd(target.value)}/>
              </FormControl>
            </form>
            </div>
            
        </div>
        <Button className="p-1 m-1 rounded text-xs" onClick={onAddLabel}>
            Add Label
        </Button>
        <Button className="p-1 m-1 rounded text-xs" onClick={OnClearLabels}>
            Clear Label/s
        </Button>
        <div className="flex flex-wrap gap-2">
            {labels.map((item) => {
                return (
                    <div key={item.id} className="p-1 rounded border border-gray-500 rounded-xl px-2">
                        <span>{item.value}</span>
                        <button className="mx-2" onClick={()=>OnRemoveLabel(item.id)}>X</button>
                    </div>
                    )
            })}
        </div>
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