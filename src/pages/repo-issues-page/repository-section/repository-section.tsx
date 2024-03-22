import { OCTO_KEY_OWNER, OCTO_KEY_REPO } from "@/components/github-api/GithubBaseApiType";
import { OctoGetRepositoryIssuesApi } from "@/components/github-api/repository-issues/RepositoryIssuesApi"
import { GitHubIssue } from "@/components/github-api/response-type/GithubIssueType";
import Section from "@/components/section/Section"
import { editParams } from "@/redux/GithubParamsReducer";
import { selectParams } from "@/redux/GithubParamsSelector";
import { selectGithub } from "@/redux/GithubSelector";
import { AppDispatch } from "@/store";
import { Button, FormLabel, Select } from "@chakra-ui/react"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RepositorySection = () => {

	const dispatch = useDispatch<AppDispatch>();
	const _params = useSelector(selectParams);
  const _github = useSelector(selectGithub);

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

  const OnSelectRepository = (e : RCE<HTMLSelectElement>) => {
		const { value } = e.target;
		if(!_github.repositories) return;

		const selected = _github.repositories.find((repo) => repo.name === value);
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

  return (
    <Section.Blur className='flex gap-4 flex-grow flex-wrap'>
    <form onSubmit={GetRepositoryIssues} className='flex-grow'>
      <FormLabel>
        {`Select Repository (${ _github.repositories?.length ?? 0})`}
      </FormLabel>
      <Select
        required
        value={_params.repo ?? ''}
        onChange={OnSelectRepository}>
        <option value={''} disabled>...</option>
        {_github.repositories?.map((repo) => 
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
    )
}

export default RepositorySection