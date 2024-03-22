import { useMemo, useState } from "react";
import Section from "@/components/section/Section"
import { IssueListType } from "./IssueListType"
import IssueItem from "./issue/IssueItem";
import { TITLE_FILTER_TYPE_EXCLUDES, TITLE_FILTER_TYPE_INCLUDES } from "../RepoIssuesPageType";
import { OctoGetRepositoryIssuesApi } from "@/components/github-api/repository-issues/RepositoryIssuesApi";
import { GitHubIssue } from "@/components/github-api/response-type/GithubIssueType";
import { useSelector } from "react-redux";
import { selectParams } from "@/redux/GithubParamsSelector";
import { OCTO_KEY_REPO } from "@/components/github-api/GithubBaseApiType";
import { GitHubRepository } from "@/components/github-api/response-type/GithubRepositoryType";
import { Button, FormControl, FormLabel, IconButton, Input, Select, useToast } from "@chakra-ui/react";
import { FailedToast, FetchingToast, LoadedToast } from "@/helpers/ToastPresets";
import { FaWindowClose } from "react-icons/fa";
import { selectGithub } from "@/redux/GithubSelector";

const IssueList = (props : IssueListType) => {

	const { filter, OnRemove } = props;
	const _params = useSelector(selectParams);
  const _github = useSelector(selectGithub);

	const toast = useToast();

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

	// 
	// #region Repository

	const [selectedRepository, setSelectedRepository] = useState<GitHubRepository>()

	const OnSelectRepository = (e : RCE<HTMLSelectElement>) => {
		const { value } = e.target
		const selectedRepository = _github.repositories?.find((repo) => repo.id.toString() === value);
		if(!selectedRepository) return;

		setSelectedRepository(selectedRepository);
	}

	// #endregion
	// 

		//#region Issues

	const [issues, setIssues] = useState<GitHubIssue[] | undefined>([])

	const GetRepositoryIssues = async (e: React.FormEvent) => {
		e.preventDefault();
		toast(FetchingToast({
			title: 'Issues',
		}) )
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
		toast.closeAll();
		if(data === null) {
			toast(FailedToast({
				title: `Fetching Issues`,
			}) )
			return;
		}
		toast(LoadedToast({
			title: `${data.length} Issues found`,
		}) )
		setIssues(data);
	}
	
	const ClearIssues = () => setIssues([]);

	//#endregion
	// 

	// 
	//#region Filtered Issue
	
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
	},[issues, filter])

	return (
		<Section.Blur>
			{OnRemove &&
			<div className="flex justify-end">
				<IconButton onClick={OnRemove} aria-label={"Close"} isRound>
					<FaWindowClose/>
				</IconButton>
			</div>
			}
			<form onSubmit={GetRepositoryIssues} className="flex flex-wrap justify-between">
				<FormControl>
					<FormLabel>Repository:</FormLabel>
					<Select value={selectedRepository?.id ?? ''} onChange={OnSelectRepository} required>
						<option value={''} disabled>Select Repo</option>
						{_github.repositories?.map((item) => {
							return (
								<option key={item.id} value={item.id}>{item.name}</option>
							)
						})}
					</Select>
				</FormControl>
				<div className="flex flex-wrap gap-4">
					<Button className="p-1 my-1" disabled={!selectedRepository} type="submit">
						Fetch Issue/s
					</Button>
					<Button className="p-1 my-1" onClick={ClearIssues}>
						Clear
					</Button>
				</div>
			</form>
			<hr/>
			<div className="flex flex-wrap justify-between">
				<div className="flex flex-wrap gap-4">
					<form onSubmit={onSubmitAddLabel}>
						<FormControl>
							<FormLabel>{`Enter Label Filter (${labels.length}):`}</FormLabel>
							<Input maxLength={24}
								value={labelToAdd}
								onChange={({target}) => setLabelToAdd(target.value)}
								required/>
						</FormControl>
						<div className="flex flex-wrap gap-4">
							<Button className="p-1 my-1 rounded text-xs" onClick={onAddLabel}>
								Add Label
							</Button>
							<Button className="p-1 my-1 rounded text-xs" onClick={OnClearLabels}>
								Clear Label/s
							</Button>
						</div>
					</form>
				</div>
			</div>
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
					<IssueItem key={issue.id} issue={issue}/>
				)
			})}
			</div>
		</Section.Blur>
	)
}

export default IssueList