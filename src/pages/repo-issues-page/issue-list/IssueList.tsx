import { useContext, useEffect, useMemo, useState } from "react";
import Section from "@/components/section/Section"
import { IssueListType } from "./IssueListType"
import IssueItem from "./issue/IssueItem";
import { OctoGetRepositoryIssuesApi } from "@/components/github-api/repository-issues/RepositoryIssuesApi";
import { GitHubIssue } from "@/components/github-api/response-type/GithubIssueType";
import { useSelector } from "react-redux";
import { selectParams } from "@/redux/GithubParamsSelector";
import { OCTO_KEY_REPO } from "@/components/github-api/GithubBaseApiType";
import { GitHubRepository } from "@/components/github-api/response-type/GithubRepositoryType";
import { Button, FormControl, FormLabel, IconButton, Input, Select, Stat, StatHelpText, StatLabel, StatNumber, useToast } from "@chakra-ui/react";
import { FailedToast, FetchingToast, LoadedToast } from "@/helpers/ToastPresets";
import { FaSave, FaWindowClose } from "react-icons/fa";
import { selectGithub } from "@/redux/GithubSelector";
import { selectFilter } from "@/redux/GithubFilterSelector";
import { PreferenceContext } from "@/context/preference";
import { CgPlayListRemove } from "react-icons/cg";
import { v4 as uuidv4 } from 'uuid';
import { GetIDs } from "@/helpers/array-helper";
import { selectConfig } from "@/redux/IssueConfigSelector";

const IssueList: React.FC<IssueListType> = (props) => {

	const { OnRemove, repoName } = props;
	const { addSavedRepo, removeSavedRepo, repos, savedRepos } = useContext(PreferenceContext);

	const _params = useSelector(selectParams);
	const _github = useSelector(selectGithub);
	const _filter = useSelector(selectFilter);
	const _config = useSelector(selectConfig);

	const toast = useToast();

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			OnLoadRepo();
			setLoaded(true);
		}
	},[loaded]);

	const SavedReposIDs = useMemo(()=>GetIDs(savedRepos),[savedRepos])

	const OnLoadRepo = async () => {
		if(!repoName || !repos.length) return;
		const savedRepoIDs = GetIDs(repos);
		if(!savedRepoIDs.includes(repoName)) return;
		const repo = _github.repositories?.find((item) => item.name === repoName);
		if(!repo) return;
		const savedRepo = savedRepos.find((item) => item.id === repo.name);
		setSelectedRepository(repo);
		const savedLabels = savedRepo?.labels.map((item) => ({
			id: uuidv4(),
			value: item
		})) ?? [];
		setLabels(savedLabels);
		GetRepositoryIssues(repo, savedRepo?.labels);
	}

	const OnSaveRepo = () => {
		if(!selectedRepository) return;
		const repoConfig = {
			id: selectedRepository.name,
			labels: labelValues,
		}
		addSavedRepo(repoConfig);
	}

	const OnRemoveRepo = () => {
		if(!selectedRepository) return;
		removeSavedRepo(selectedRepository.name);
	}

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

		const newLabelToAdd = {
			id: uuidv4(),
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

	const OnSubmitGetRepositories = (e: React.FormEvent) => {
		e.preventDefault();
		GetRepositoryIssues()
	}

	const [issues, setIssues] = useState<GitHubIssue[] | undefined>([])

	const GetRepositoryIssues = async (repo? : GitHubRepository, labels?: string[]) => {
		toast(FetchingToast({
			title: 'Issues',
		}) )
		setIssues(undefined);
		const repoToLoad = repo ?? selectedRepository;
		if(!repoToLoad) return;
		const data = await OctoGetRepositoryIssuesApi({
			..._params,
			[OCTO_KEY_REPO]:  repoToLoad.name,
			params: {
				sort: 'created',
				direction: 'asc',
				labels: labels?.join(',') ?? labelValues.join(',')
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
		if(_filter.title_on){
			filteredIssues = filteredIssues?.filter((item) =>{
				const title = item.title.toLowerCase();
				let isIncluded = true;
				if(_filter.title_on){
					if(_filter.title_includes?.length !== 0){
						const toIncludes = _filter.title_includes?.map((item) => item.value.toLowerCase());
						isIncluded = toIncludes?.some((include) => title.includes(include)) ?? true;
					}
					if(_filter.title_excludes?.length !== 0){
						const toExcludes = _filter.title_excludes?.map((item) => item.value.toLowerCase());
						isIncluded = !toExcludes?.includes(title);
					}
				}

					return isIncluded;
			})
		}

		return filteredIssues
	},[issues, _filter.title_on])

	return (
		<Section.Blur>
			<div className="flex justify-end gap-2">
				{(selectedRepository && SavedReposIDs.includes(selectedRepository.name)) &&
				<IconButton onClick={OnRemoveRepo} aria-label={"Remove"} isRound>
					<CgPlayListRemove />
				</IconButton>
				}
				<IconButton onClick={OnSaveRepo} aria-label={"Save"} isRound>
					<FaSave/>
				</IconButton>
				{OnRemove &&
					<IconButton onClick={OnRemove} aria-label={"Close"} isRound>
						<FaWindowClose/>
					</IconButton>
				}
			</div>
			{_config.simplifyList ?
			<Stat>
				<StatLabel>Repository</StatLabel>
				<StatNumber>{selectedRepository?.name}</StatNumber>
				<StatHelpText>Filter Labels: [{labelValues.join(', ')}]</StatHelpText>
			</Stat>
			:
			<>
			<form onSubmit={OnSubmitGetRepositories} className="flex flex-wrap justify-between">
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
					<IssueItem key={issue.id} issue={issue}/>
				)
			})}
			</div>
		</Section.Blur>
	)
}

export default IssueList