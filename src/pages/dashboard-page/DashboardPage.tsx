import { useState } from 'react'
import { OctoGetRepositoryIssuesApi } from '../../component/github-api/repository-issues/RepositoryIssuesApi'
import { SignOutApi } from '../../firebase/api/auth/AuthApi'
import style from './DashboardPage.module.scss'
import { GitHubIssue } from '../../component/github-api/response-type/GithubIssueType'
import Button from '../../component/button/Button'
import Input from '../../component/input/Input'

const DashboardPage = () => {

	const onSignOut = async () => {
		await SignOutApi()
	}

	const [issuePrefix, setIssuePrefix] = useState("")

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
		<div className={style.container}>
			<button onClick={onSignOut}>
				Sign Out
			</button>
			<hr/>
			<Input onChange={({target})=> setIssuePrefix(target.value)}/>
			<hr/>
			<Button.Action onClick={GetRepositoryIssue}>Get Issues</Button.Action>
			<Button onClick={ClearIssues}>Clear</Button>
			<hr/>
			<div>
				{issues?.map((issue) => {
					return (
						<div key={issue.id}>
							- __[{issuePrefix}{issue.number}]({issue.html_url})__ {issue.title}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default DashboardPage