import { useState } from 'react'
import { OctoGetRepositoryIssuesApi } from '../../component/github-api/repository-issues/RepositoryIssuesApi'
import { GitHubIssue } from '../../component/github-api/response-type/GithubIssueType'
import Button from '../../component/button/Button'
import Input from '../../component/input/Input'
import Section from '../../component/section/Section'
import Checkbox from '../../component/checkbox/Checkbox'

const RepoIssuesPage = () => {

	//#region Format

	const [format, setFormat] = useState({
		prefix: '',
		suffix: '',
		isLinkRemove: false,
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

	const [issues, setIssues] = useState<GitHubIssue[]>()

	const GetRepositoryIssue = async () => {
		const data = await OctoGetRepositoryIssuesApi({
			owner: 'KenReyMozo',
			repo : 'unity-online-multiplayer-fps'
		})
		if(data === null) return;
		setIssues(data);
	}

	const ClearIssues = () => setIssues([]);

	return (
		<div className='flex flex-col m-2 gap-2'>
			<div className='flex flex-wrap gap-2'>
				<Section.Blur className='flex gap-4 flex-grow'>
					<Input.Text label='Before Card Number' name='prefix' value={format.prefix} onChange={OnChangeFormat}/>
					<Input.Text label='After Card Number' name='suffix' value={format.suffix} onChange={OnChangeFormat}/>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow'>
					<Checkbox label='Remove Link' name='isLinkRemove' checked={format.isLinkRemove} onChange={OnChangeFormatCheck}/>
				</Section.Blur>
				<Section.Blur className='flex gap-4 flex-grow'>
					<Button.Action onClick={GetRepositoryIssue}>Get Issues</Button.Action>
					<Button onClick={ClearIssues}>Clear</Button>
				</Section.Blur>
			</div>
			<Section.Blur>
				{issues?.map((issue) => {
					return (
						<div key={issue.id}>
							{format.isLinkRemove ?
							<>
							- {format.prefix}{issue.number}{format.suffix} {issue.title}
							</>
							:
							<>
							- __[{format.prefix}{issue.number}{format.suffix}]({issue.html_url})__ {issue.title}
							</>
							}
						</div>
					)
				})}
			</Section.Blur>
		</div>
	)
}

export default RepoIssuesPage