import { useState } from 'react'
import { OctoGetRepositoryIssuesApi } from '../../component/github-api/repository-issues/RepositoryIssuesApi'
import { GitHubIssue } from '../../component/github-api/response-type/GithubIssueType'
import Section from '../../component/section/Section'
import { OctoGetRepositoriesApi } from '../../component/github-api/repository/RepositoriesApi'
import { GitHubRepository } from '../../component/github-api/response-type/GithubRepositoryType'
import { IssueDiscordFilter, IssueDiscordFormatType, TITLE_FILTER_TYPE_EXCLUDES, TITLE_FILTER_TYPE_INCLUDES, TitleFilterType } from './RepoIssuesPageType'
import IssueList from './issue-list/IssueList'
import { FormatItem } from './issue-list/custom-item/CustomIssueItemType'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  editParams } from '../../redux/GithubParamsReducer'
import { selectParams } from '../../redux/GithubParamsSelector'
import { AppDispatch } from '../../store'
import { OCTO_KEY_OWNER, OCTO_KEY_REPO } from '../../component/github-api/GithubBaseApiType'
import { selectConfig } from '../../redux/IssueConfigSelector'
import { editConfig } from '../../redux/IssueConfigReducer'
import { Button, Checkbox,  FormControl, FormLabel, Input, Select, useColorMode } from '@chakra-ui/react'

const RepoIssuesPage = () => {

	const { toggleColorMode } = useColorMode();

	//#region Repository
	const dispatch = useDispatch<AppDispatch>();
	const _params = useSelector(selectParams);
	const _config = useSelector(selectConfig);

	const onChangeParams = (e: RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(editParams({ [name]: value }))
	}

	const onChangeConfig = (e: RCE<HTMLInputElement>) => {
		const { name, checked } = e.target;
		dispatch(editConfig({ [name]: checked }))
	}

	const [repositories, setRepositories] = useState<GitHubRepository[]>()

	const GetRepositories = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = await OctoGetRepositoriesApi(_params)
		if(data === null) return;
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


	//#region Format
	const [format, setFormat] = useState<IssueDiscordFormatType>({
		prefix: '',
		suffix: '',
	})

	const OnChangeFormat = (e : RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormat(prev => ({...prev, [name] : value }))
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

	const [issues, setIssues] = useState<GitHubIssue[] | undefined>([])

	const GetRepositoryIssues = async () => {
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

	// 
	// #region Custom Format (With Presets)

	const [customFormats, setCustomFormats] = useState<FormatItem[]>([]);
	
	const onAddCustomFormat = () => {
		const date = new Date();
		const newID = date.toISOString() + date.getMilliseconds();
		setCustomFormats(prev => prev.concat({
			id:  newID,
			name: '...',
			type: 'TEXT',
			value: '',
		}))
	}

	const onChangeCustomFormat = (id: string, e: RCE<HTMLSelectElement>) => {
		const { name, value } = e.target;
		setCustomFormats(prev => ([...prev.map((item) => {
				if(item.id === id){
					return {
						...item,
						[name]: value,
					};
				}
				return item;
			})]
		))
	}

	// #endregion
	// 

	return (
		<>
		<div className='flex min-h-screen flex-col mx-2 gap-5'>
			<Button onClick={toggleColorMode}>Mode</Button>
			<div className='flex flex-wrap gap-5'>
				<Section.Blur className='flex gap-4 flex-grow'>
					<form id='get-repositories-form'  className='flex flex-col gap-4 flex-grow' onSubmit={GetRepositories}>
					<FormControl>
						<FormLabel>Token</FormLabel>
						<Input name='token' required value={_params.token ?? ''} onChange={onChangeParams}/>
					</FormControl>
					<FormControl>
						<FormLabel>Organization</FormLabel>
						<Input name='org' required onChange={onChangeParams}/>
					</FormControl>
					<Button variant='outline' form='get-repositories-form' type='submit'>
						Get Repositories
					</Button>
					</form>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
					<FormLabel>{`Select Repository (${repositories?.length ?? 0})`}</FormLabel>
					<Select required value={_params.repo ?? ''} onChange={OnSelectRepository}>
						<option value={''} disabled>...</option>
						{repositories?.map((repo) => <option key={repo.id} value={repo.name}>{repo.name}</option>)}
					</Select>
					<Button onClick={GetRepositoryIssues} disabled={!_params.repo}>Get Issues</Button>
					<Button onClick={ClearIssues}>Clear</Button>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
					<FormControl>
						<FormLabel>Before Card Number</FormLabel>
						<Input name='prefix' value={format.prefix} onChange={OnChangeFormat}/>
					</FormControl>
					<FormControl>
						<FormLabel>After Card Numbe</FormLabel>
						<Input name='suffix' value={format.suffix} onChange={OnChangeFormat}/>
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
			</div>
			{<IssueList filter={filter} format={format} formats={[]} repositories={repositories}/>}
		</div>
		</>
	)
}

export default RepoIssuesPage