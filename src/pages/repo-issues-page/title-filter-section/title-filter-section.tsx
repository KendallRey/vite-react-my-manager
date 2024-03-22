import Section from "@/components/section/Section";
import {
	addTitleExcludeFilter,
	addTitleIncludeFilter,
	onChangeTitleExcludeFilter,
	onChangeTitleIncludeFilter,
	removeTitleExcludeFilter,
	removeTitleIncludeFilter,
	toggleTitleFilter
} from "@/redux/GithubFilterReducer";
import { selectFilter } from "@/redux/GithubFilterSelector";
import { AppDispatch } from "@/store";
import { Button, Checkbox, IconButton, Input } from "@chakra-ui/react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const TitleFilterSection = () => {

	const dispatch = useDispatch<AppDispatch>();
	const _filter = useSelector(selectFilter);

	const OnToggleFilter = () => dispatch(toggleTitleFilter());

	const OnAddTitleIncludeFilter = () => dispatch(addTitleIncludeFilter({
		id: uuidv4(),
		value: ''
	}));

	const OnAddTitleExcludeFilter = () => dispatch(addTitleExcludeFilter({
		id: uuidv4(),
		value: ''
	}));

	const OnRemoveTitleIncludeFilter = (id: string) => dispatch(removeTitleIncludeFilter(id));

	const OnChangeTitleIncludeFilter = (id: string, value: string) => {
		dispatch(onChangeTitleIncludeFilter({
			id,
			value,
		}));
	}

	const OnRemoveTitleExcludeFilter = (id: string) => dispatch(removeTitleExcludeFilter(id));

	const OnChangeTitleExcludeFilter = (id: string, value: string) => {
		dispatch(onChangeTitleExcludeFilter({
			id,
			value,
		}));
	}

	return (
		<Section.Blur className='gap-4 w-[100%] flex-grow'>
			<Checkbox name='isOn' checked={_filter.title_on} onChange={OnToggleFilter}>
				Toggle Filter
			</Checkbox>
			<div className='flex gap-4 mb-2 flex-wrap'>
			<Button className='flex-grow'
				onClick={OnAddTitleIncludeFilter}>
				ADD INCLUDES
			</Button>
			<Button className='flex-grow'
				onClick={OnAddTitleExcludeFilter}>
				ADD EXCLUDES
			</Button>
			</div>
			<hr className="my-2"/>
			<h6 className='text-green-400'>Title Includes</h6>
			<div className='flex gap-2 flex-wrap'>
			{_filter.title_includes?.map((item) => {
				return (
					<div key={item.id} className='flex'>
						<Input
							name='value'
							value={item.value}
							onChange={(e) => OnChangeTitleIncludeFilter(item.id, e.target.value)}
						/>
						<IconButton aria-label="Remove Filter"
							onClick={()=>OnRemoveTitleIncludeFilter(item.id)}>
							<FaWindowClose/>
						</IconButton>
					</div>
					)
			})}
			</div>
			<hr className="my-2"/>
			<h6 className='text-red-400'>Title Excludes</h6>
			<div className='flex gap-2 flex-wrap'>
			{_filter.title_excludes?.map((item) => {
				return (
					<div key={item.id} className='flex'>
						<Input
							name='value'
							value={item.value}
							onChange={(e) => OnChangeTitleExcludeFilter(item.id, e.target.value)}
						/>
						<IconButton aria-label="Remove Filter"
							onClick={()=>OnRemoveTitleExcludeFilter(item.id)}>
							<FaWindowClose/>
						</IconButton>
					</div>
					)
			})}
			</div>
		</Section.Blur>
	)

}

export default TitleFilterSection;