import { OctoGetRepositoriesApi } from "@/components/github-api/repository/RepositoriesApi";
import Section from "@/components/section/Section";
import { PreferenceContext } from "@/context/preference";
import { FailedToast, FetchingToast, LoadedToast, SuccessToast } from "@/helpers/ToastPresets";
import { editParams } from "@/redux/GithubParamsReducer";
import { selectParams } from "@/redux/GithubParamsSelector";
import { editGithub } from "@/redux/GithubReducer";
import { AppDispatch } from "@/store";
import { Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const InfoSection = () => {

	const dispatch = useDispatch<AppDispatch>();
	const _params = useSelector(selectParams);
	const toast = useToast();
 
	const {
		savePreference,
		clearPreference,
		gihubInfo
	} = useContext(PreferenceContext);

	useEffect(() => {
		if(!gihubInfo) return;
		dispatch(editParams({ 
			token: gihubInfo.token ?? '',
			org: gihubInfo.orgName ?? '',
		}))
	},[])

	const onChangeParams = (e: RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(editParams({ [name]: value }))
	}

	const OnSavePreferences = () => {
		const prefs = {
			token: _params['token'].toString(),
			orgName: _params['org'].toString(),
		}
		savePreference(prefs);
		toast.closeAll();
		toast( SuccessToast({
			title: 'Save',
		}) )
	}

	const OnClearPreferences = () => {
		clearPreference()
		toast.closeAll();
		toast( SuccessToast({
			title: 'Clear',
		}) )
	}

	//#region Get Repositories

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

		dispatch(editGithub({ 
			repositories: data,
		}))
	}

	//#endregion

	return (
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
				<Input name='org' required  value={_params.org ?? ''} onChange={onChangeParams}/>
			</FormControl>
			<Button type='submit'>
				Get Repositories
			</Button>
			<div className='flex flex-wrap gap-2 justify-between'>
				<Button className='flex-grow' onClick={OnSavePreferences}>
					Save Token
				</Button>
				<Button className='flex-grow' onClick={OnClearPreferences}>
					Clear Token
				</Button>
			</div>
			</form>
		</Section.Blur>
		)
}

export default InfoSection