import { useState } from 'react'
import { OctoGetRepositoryIssuesApi } from '@/components/github-api/repository-issues/RepositoryIssuesApi'
import { GitHubIssue } from '@/components/github-api/response-type/GithubIssueType'
import Section from '@/components/section/Section'
import { OctoGetRepositoriesApi } from '@/components/github-api/repository/RepositoriesApi'
import { GitHubRepository } from '@/components/github-api/response-type/GithubRepositoryType'
import { IssueDiscordFilter, TITLE_FILTER_TYPE_EXCLUDES, TITLE_FILTER_TYPE_INCLUDES, TitleFilterType } from './RepoIssuesPageType'
import IssueList from './issue-list/IssueList'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  editParams } from '@/redux/GithubParamsReducer'
import { selectParams } from '@/redux/GithubParamsSelector'
import { AppDispatch } from '@/store'
import { OCTO_KEY_OWNER, OCTO_KEY_REPO } from '@/components/github-api/GithubBaseApiType'
import { selectConfig } from '@/redux/IssueConfigSelector'
import { editConfig } from '@/redux/IssueConfigReducer'
import { Button, Checkbox,  FormControl, FormLabel, Input, Select, useColorMode, useToast } from '@chakra-ui/react'
import { FailedToast, FetchingToast, LoadedToast, } from '@/helpers/ToastPresets'
import { selectFormat } from '@/redux/IssueFormatSelector'
import { editFormat } from '@/redux/IssueFormatReducer'
import { v4 as uuidv4 } from 'uuid';

const RepoIssuesPage = () => {

	const { toggleColorMode } = useColorMode();
	const toast = useToast();

	//#region Repository

	const dispatch = useDispatch<AppDispatch>();
	const _params = useSelector(selectParams);
	const _config = useSelector(selectConfig);
	const _format = useSelector(selectFormat);

	const onChangeParams = (e: RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(editParams({ [name]: value }))
	}

	const onChangeConfig = (e: RCE<HTMLInputElement>) => {
		const { name, checked } = e.target;
		dispatch(editConfig({ [name]: checked }))
	}

	const onChangeFormat = (e: RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(editFormat({ [name]: value }))
	}

	const [repositories, setRepositories] = useState<GitHubRepository[]>()

	const GetRepositories = async (e: React.FormEvent) => {
		e.preventDefault();
		toast( FetchingToast({
			title: 'Repositories',
		}) )
		const data = await OctoGetRepositoriesApi(_params)
		toast.closeAll()
		if(data === null) {
			toast(FailedToast({
				title: 'Fetching Repositories',
			}) )
			return;
		}
		toast(LoadedToast({
			title: `${data.length} Repositories`,
		}) )
		setRepositories(data)
	}

	const OnSelectRepository = (e : RCE<HTMLSelectElement>) => {
		const { value } = e.target;
		if(!repositories) return;

		const selected = repositories.find((repo) => repo.name === value);
		if(!selected) return;

		ClearIssues();
		const owner = selected.owner.login
		const name = selected.name

		dispatch(editParams({ 
			[OCTO_KEY_REPO]: name,
			[OCTO_KEY_OWNER]: owner,
		}))
	}
	//#endregion

	// 
	// #region Filters

	const [filter, setFilter] = useState<IssueDiscordFilter>({
		isOn: false,
		[TITLE_FILTER_TYPE_EXCLUDES]: [],
		[TITLE_FILTER_TYPE_INCLUDES]: [],
	})

	const onToggleFilter = (e: RCE<HTMLInputElement>) => {
		const { checked } = e.target;
		setFilter(prev => ({...prev, isOn: checked}))
	}

	const onAddFilter = (type : TitleFilterType) => {
		const date = new Date();
		const newID = date.getMilliseconds()+date.getSeconds()+'-filter'
		setFilter(prev => ({...prev,
			[type]: prev[type].concat({
				id: newID,
				value: '',
			})
		}))
	}

	const onRemoveFilter = (id: string, type : TitleFilterType) => {
		setFilter(prev => ({...prev,
			[type]: prev[type].filter(item => item.id !== id)
		}))
	}

	const onChangeFilter = (id: string, type : TitleFilterType, e: RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFilter(prev => (
			{...prev, 
				[type]: prev[type]
				.map((item) => {
					if(item.id === id){
						return {
							...item,
							[name]: value
						}
					}
					return item;
				})
			}
		))
	}

	// #endregion
	// 

	//#region Issues

	const [_, setIssues] = useState<GitHubIssue[] | undefined>([])

	const GetRepositoryIssues = async (e: React.FormEvent) => {
		e.preventDefault();
		setIssues(undefined);
		const data = await OctoGetRepositoryIssuesApi({
			..._params,
			params: {
				sort: 'created',
				direction: 'asc',
				labels: 'wontfix,enhancement',
			}
		})
		if(data === null) return;
		setIssues(data);
	}
	
	const ClearIssues = () => setIssues([]);
	//#endregion

	//#region Repos List

	const [repos, setRepos] = useState([uuidv4()]);
	const OnAddRepo = () => setRepos(prev => (prev.concat(uuidv4())));
	const OnRemoveRepo = (id: string) => setRepos(prev => (prev.filter((item) => item !== id)));

	//#endregion

	return (
		<>
		<div className='flex min-h-screen flex-col mx-2 gap-5'>
			<Button onClick={toggleColorMode}>Mode</Button>
			<div className='flex flex-wrap gap-5'>
				<Section.Blur className='flex gap-4 flex-grow'>
					<form
						className='flex flex-col gap-4 flex-grow'
						onSubmit={GetRepositories}>
					<FormControl>
						<FormLabel>Token</FormLabel>
						<Input name='token' required value={_params.token ?? ''} onChange={onChangeParams}/>
					</FormControl>
					<FormControl>
						<FormLabel>Organization</FormLabel>
						<Input name='org' required onChange={onChangeParams}/>
					</FormControl>
					<Button variant='outline' type='submit'>
						Get Repositories
					</Button>
					</form>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
					<form onSubmit={GetRepositoryIssues} className='flex-grow'>
						<FormLabel>
							{`Select Repository (${repositories?.length ?? 0})`}
						</FormLabel>
						<Select
							required
							value={_params.repo ?? ''}
							onChange={OnSelectRepository}>
							<option value={''} disabled>...</option>
							{repositories?.map((repo) => 
								<option
									key={repo.id}
									value={repo.name}>
										{repo.name}
								</option>)
							}
						</Select>
						<div className='flex gap-2 my-2'>
							<Button type='submit' disabled={!_params.repo}>Get Issues</Button>
							<Button onClick={ClearIssues}>Clear</Button>
						</div>
					</form>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
					<FormControl>
						<FormLabel>Before Card Number</FormLabel>
						<Input name='prefix' value={_format.prefix} onChange={onChangeFormat}/>
					</FormControl>
					<FormControl>
						<FormLabel>After Card Number</FormLabel>
						<Input name='suffix' value={_format.suffix} onChange={onChangeFormat}/>
					</FormControl>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow min-w-screen'>
					<Checkbox
						name='removeLink'
						checked={_config.removeLink}
						onChange={onChangeConfig}>
						Remove Link
					</Checkbox>
					<Checkbox
						name='isLabelFilterSubtractive'
						checked={_config.isLabelFilterSubtractive}
						onChange={onChangeConfig}>
						Subtractive Label Filter
					</Checkbox>
					<Checkbox
						name='hideTitleFilter'
						checked={_config.hideTitleFilter}
						onChange={onChangeConfig}>
						Hide Title Filter
					</Checkbox>
					<Checkbox
						name='hideLabels'
						checked={_config.hideLabels}
						onChange={onChangeConfig}>
						Hide Labels
					</Checkbox>
				</Section.Blur>
				{!_config.hideTitleFilter &&
				<Section.Blur className='gap-4 flex-grow'>
					<Checkbox name='isOn' checked={filter.isOn} onChange={onToggleFilter}>
						Toggle Filter
					</Checkbox>
					<div className='flex gap-4 mb-2 flex-wrap'>
					<Button className='flex-grow'
						onClick={()=>onAddFilter(TITLE_FILTER_TYPE_INCLUDES)}>
						ADD INCLUDES
					</Button>
					<Button className='flex-grow'
						onClick={()=>onAddFilter(TITLE_FILTER_TYPE_EXCLUDES)}>
						ADD EXCLUDES
					</Button>
					</div>
					<hr/>
					<h6 className='text-green-400'>Title Includes</h6>
					<div className='flex gap-2 flex-wrap'>
					{filter[TITLE_FILTER_TYPE_INCLUDES].map((item) => {
						return (
							<div key={item.id} className='flex'>
								<Input
									name='value'
									value={item.value}
									onChange={(e) => onChangeFilter(item.id, TITLE_FILTER_TYPE_INCLUDES, e)}/>
								<span onClick={()=>onRemoveFilter(item.id, TITLE_FILTER_TYPE_INCLUDES)} style={{
									cursor: 'pointer'
								}}>x</span>
							</div>
							)
					})}
					</div>
					<hr/>
					<h6 className='text-red-400'>Title Excludes</h6>
					<div className='flex gap-2 flex-wrap'>
					{filter[TITLE_FILTER_TYPE_EXCLUDES].map((item) => {
						return (
							<div key={item.id} className='flex'>
								<Input
									name='value'
									value={item.value}
									onChange={(e) => onChangeFilter(item.id, TITLE_FILTER_TYPE_EXCLUDES, e)}/>
								<span onClick={()=>onRemoveFilter(item.id, TITLE_FILTER_TYPE_EXCLUDES)} style={{
									cursor: 'pointer'
								}}>x</span>
							</div>
							)
					})}
					</div>
				</Section.Blur>
				}
				<Section.Blur className='gap-4 flex-grow'>
					<Button onClick={OnAddRepo}>
						Add Repository
					</Button>
				</Section.Blur>
			</div>
			{repos.map((repo) => {
				return (
					<IssueList
						key={repo}
						filter={filter}
						formats={[]}
						OnRemove={repos.length !== 0 ? ()=>OnRemoveRepo(repo) : undefined}
						repositories={repositories}/>
					)
			})}
		</div>
		</>
	)
}

export default RepoIssuesPage