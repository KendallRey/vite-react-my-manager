import { useContext, useState } from 'react'
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
import { PreferenceContext } from '@/context/preference'

const RepoIssuesPage = () => {

	const { toggleColorMode } = useColorMode();
	const {
		loadSavedRepos,
		savedRepos,
		removeSavedRepo,
		repos: loadedRepos,
		clearLoadedSavedRepos,
	} = useContext(PreferenceContext);

	const OnClearRepos = () => setRepos([])

	//#region Repository

	const _config = useSelector(selectConfig);

	//#region Repos List

	const [repos, setRepos] = useState([uuidv4()]);
	const OnAddRepo = () => setRepos(prev => (prev.concat(uuidv4())));
	const OnRemoveRepo = (id: string) => setRepos(prev => (prev.filter((item) => item !== id)));

	const OnLoadSavedRepos = async () => {
		loadSavedRepos();
		setRepos(savedRepos);
	}

	const OnClearLoadedRepos = async () => {
		clearLoadedSavedRepos();
	}

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

				<Section.Blur className='flex-grow'>
					<div className='flex gap-4 flex-wrap'>
					<Button onClick={OnAddRepo}>
						Add Repository
					</Button>
					<Button onClick={OnClearRepos}>
						Clear List
					</Button>
					{!!savedRepos.length &&
					<>
					<Button onClick={OnLoadSavedRepos}>
						Load Saved Repos ({savedRepos.length})
					</Button>
					<Button onClick={OnClearLoadedRepos}>
						Clear Loaded Repos ({loadedRepos.length})
					</Button>
					</>
					}
					</div>
					<hr className='my-2'/>
					<small>Saved Repos ({savedRepos.length})</small>
					<div className='flex gap-2 my-2 flex-wrap'>
					{savedRepos.map((item) => 
					<Button
						key={item}
						size={'xs'}
						onClick={()=>removeSavedRepo(item)}>
						{item}
					</Button>
						)}
					</div>
				</Section.Blur>
			</div>

			{repos.map((repo) => {
				return (
					<IssueList
						key={repo}
						repoName={repo}
						OnRemove={repos.length !== 0 ? ()=>OnRemoveRepo(repo) : undefined}/>
					)
			})}
		</div>

		<IssueSettingsFab/>
		</>
	)
}

export default RepoIssuesPage