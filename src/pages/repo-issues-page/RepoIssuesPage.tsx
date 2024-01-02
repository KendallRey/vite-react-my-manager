import { useState } from 'react'
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
import { IssueDiscordFormatType } from './RepoIssuesPageType'
import IssueList from './issue-list/IssueList'

const RepoIssuesPage = () => {

	//#region Repository
	const [ownerName, setOwnerName] = useState("")

	const [repositories, setRepositories] = useState<GitHubRepository[]>()

	const GetRepositories = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = await OctoGetRepositoriesApi({
			org: ownerName
		})
		if(data === null) return;
		setRepositories(data)
	}
	
	const [selectedRepository, setSelectedRepository] = useState<GitHubRepository>();

	const OnSelectRepository = (e : RCE<HTMLSelectElement>) => {
		const { value } = e.target;
		if(!repositories) return;

		const selected = repositories.find((repo) => repo.id.toString() === value);
		if(!selected) return;

		setLabels(undefined);
		ClearIssues();
		setSelectedRepository(selected);
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
		if(!selectedRepository) return;
		setLabels([])
		const data = await OctoGetRepositoryLabelsApi({
			owner: selectedRepository.owner.login,
			repo : selectedRepository.name,
		})
		if(data === null) return;
		setLabels(data);
	}

	//#endregion

	//#region Issues

	const [issues, setIssues] = useState<GitHubIssue[] | undefined>([])

	const GetRepositoryIssues = async () => {
		if(!selectedRepository) return;
		setIssues(undefined);
		const data = await OctoGetRepositoryIssuesApi({
			owner: selectedRepository.owner.login,
			repo : selectedRepository.name,
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

	return (
		<div className='flex flex-col m-2 gap-5'>
			<div className='flex flex-wrap gap-5'>
				<Section.Blur className='flex gap-4 flex-grow'>
					<form id='get-repositories-form' onSubmit={GetRepositories}>
					<Input.Text label='Organization' value={ownerName} required onChange={({target})=>{setOwnerName(target.value)}}/>
					<Button.Action form='get-repositories-form' type='submit'>Get Repositories</Button.Action>
					</form>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
					<Select required label={`Select Repository (${repositories?.length ?? 0})`} value={selectedRepository?.id ?? ''} onChange={OnSelectRepository}>
						<option value={''} disabled>...</option>
						{repositories?.map((repo) => <option key={repo.id} value={repo.id}>{repo.name}</option>)}
					</Select>
					<Button.Action onClick={GetRepositoryIssues} disabled={!selectedRepository}>Get Issues</Button.Action>
					<Button.Action onClick={GetRepositoryLabels} disabled={!selectedRepository}>Get Labels</Button.Action>
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
			</div>
			{<IssueList issues={issues} labels={labels} format={format}/>}
		</div>
	)
}

export default RepoIssuesPage