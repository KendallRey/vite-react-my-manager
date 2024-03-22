import { useState } from 'react'
import Section from '@/components/section/Section'
import IssueList from './issue-list/IssueList'
import { selectConfig } from '@/redux/IssueConfigSelector'
import { Button, useColorMode } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';
import IssueSettingsFab from './floating-action/issue-settings-fab'
import ConfigSection from './config-section/config-section'
import FormatSection from './format-section/format-section'
import RepositorySection from './repository-section/repository-section'
import TitleFilterSection from './title-filter-section/title-filter-section'
import InfoSection from './info-section/info-section'
import { useSelector } from 'react-redux'

const RepoIssuesPage = () => {

	const { toggleColorMode } = useColorMode();

	//#region Repository

	const _config = useSelector(selectConfig);

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

				<InfoSection/>

				<RepositorySection/>

				<FormatSection/>

				<ConfigSection/>

				{!_config.hideTitleFilter &&
				<TitleFilterSection/>
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
						OnRemove={repos.length !== 0 ? ()=>OnRemoveRepo(repo) : undefined}/>
					)
			})}
		</div>

		<IssueSettingsFab/>
		</>
	)
}

export default RepoIssuesPage