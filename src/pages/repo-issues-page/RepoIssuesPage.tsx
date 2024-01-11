import { useEffect, useState } from 'react'
import { OctoGetRepositoryIssuesApi } from '../../component/github-api/repository-issues/RepositoryIssuesApi'
import { GitHubIssue } from '../../component/github-api/response-type/GithubIssueType'
import Button from '../../component/button/Button'
import Input from '../../component/input/Input'
import Section from '../../component/section/Section'
import Checkbox from '../../component/checkbox/Checkbox'
import { OctoGetRepositoriesApi } from '../../component/github-api/repository/RepositoriesApi'
import { GitHubRepository } from '../../component/github-api/response-type/GithubRepositoryType'
import Select from '../../component/select/Select'
import { OctoGetRepositoryLabelsApi } from '../../component/github-api/repository-labels/RepositoryLabelsApi'
import { GitHubLabel } from '../../component/github-api/response-type/GithubLabelType'
import { IssueDiscordFilter, IssueDiscordFormatType, TITLE_FILTER_TYPE_EXCLUDES, TITLE_FILTER_TYPE_INCLUDES, TitleFilterType } from './RepoIssuesPageType'
import IssueList from './issue-list/IssueList'
import { FormatItem } from './issue-list/custom-item/CustomIssueItemType'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  editParams} from '../../redux/GithubParamsReducer'
import { selectParams, selectToken } from '../../redux/GithubParamsSelector'
import { AppDispatch } from '../../store'
import { OCTO_KEY_OWNER, OCTO_KEY_REPO } from '../../component/github-api/GithubBaseApiType'

const RepoIssuesPage = () => {

	//#region Repository
	const dispatch = useDispatch<AppDispatch>();
	const token = useSelector(selectToken)
	const _params = useSelector(selectParams)
	
	const onChangeParams = (e: RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(editParams({ [name]: value }))
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

		setLabels(undefined);
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
		isLinkRemove: false,
		isLabelFilterSubtrative: false,
	})

	const OnChangeFormat = (e : RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormat(prev => ({...prev, [name] : value }))
	}

	const OnChangeFormatCheck = (e : RCE<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormat(prev => ({...prev, [name] : checked }))
	}
	//#endregion

	//#region Labels

	const [labels, setLabels] = useState<GitHubLabel[]>()

	const GetRepositoryLabels = async () => {
		setLabels([])
		const data = await OctoGetRepositoryLabelsApi(_params)
		if(data === null) return;
		setLabels(data);
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
		<div className='flex flex-col m-2 gap-5'>
	

			<div className='flex flex-wrap gap-5'>
				<Section.Blur className='flex gap-4 flex-grow'>
					<form id='get-repositories-form' onSubmit={GetRepositories}>
					<Input.Text label='Token' name='token' required value={_params.token ?? ''} onChange={onChangeParams}/>
					<Input.Text label='Organization' name='org' required onChange={onChangeParams}/>
					<Button.Action form='get-repositories-form' type='submit'>Get Repositories</Button.Action>
					</form>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
					<Select required label={`Select Repository (${repositories?.length ?? 0})`} value={_params.repo ?? ''} onChange={OnSelectRepository}>
						<option value={''} disabled>...</option>
						{repositories?.map((repo) => <option key={repo.id} value={repo.name}>{repo.name}</option>)}
					</Select>
					<Button.Action onClick={GetRepositoryIssues} disabled={!_params.repo}>Get Issues</Button.Action>
					<Button.Action onClick={GetRepositoryLabels} disabled={!_params.repo}>Get Labels</Button.Action>
					<Button onClick={ClearIssues}>Clear</Button>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
					<Input.Text label='Before Card Number' name='prefix' value={format.prefix} onChange={OnChangeFormat}/>
					<Input.Text label='After Card Number' name='suffix' value={format.suffix} onChange={OnChangeFormat}/>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow'>
					<Checkbox label='Remove Link' name='isLinkRemove' checked={format.isLinkRemove} onChange={OnChangeFormatCheck}/>
					<Checkbox label='Subtractive Label Filter' name='isLabelFilterSubtrative' checked={format.isLabelFilterSubtrative} onChange={OnChangeFormatCheck}/>
				</Section.Blur>
				<Section.Blur className='gap-4 flex-grow'>
					<Checkbox label='Toggle Filter' name='isOn' checked={filter.isOn} onChange={onToggleFilter}/>
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
								<Input.Text 
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
								<Input.Text 
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
			</div>
			{<IssueList filter={filter} issues={issues} labels={labels} format={format} formats={[]}/>}
		</div>
		</>
	)
}

export default RepoIssuesPage