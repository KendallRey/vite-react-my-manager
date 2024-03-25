import { editConfig } from '@/redux/IssueConfigReducer';
import { selectConfig } from '@/redux/IssueConfigSelector';
import { AppDispatch } from '@/store';
import {
	Checkbox,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger
} from '@chakra-ui/react'

import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { TbSettingsCode } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

const IssueSettingsFab = () => {

	const _config = useSelector(selectConfig);
	const dispatch = useDispatch<AppDispatch>();

	const onChangeConfig = (e: RCE<HTMLInputElement>) => {
		const { name, checked } = e.target;
		dispatch(editConfig({ [name]: checked }))
	}

	const onScrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	const onScrollBottom = () => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		});
	}

	return (
		<div className='fixed flex flex-col gap-2 right-2 bottom-10 z-10'>
			<Popover>
				<PopoverTrigger>
					<IconButton aria-label={'Settings'} isRound
						variant={'solid'}
						colorScheme='teal'>
						<TbSettingsCode />
					</IconButton>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>Settings</PopoverHeader>
					<PopoverBody className='flex flex-col'>
						<Checkbox
							name='removeLink'
							checked={_config.removeLink}
							onChange={onChangeConfig}>
							Remove Link
						</Checkbox>
						<Checkbox
							name='hideLabels'
							checked={_config.hideLabels}
							onChange={onChangeConfig}>
							Hide Labels
						</Checkbox>
						<Checkbox
							name='simplifyList'
							checked={_config.simplifyList}
							onChange={onChangeConfig}>
							Simplify List
						</Checkbox>
					</PopoverBody>
				</PopoverContent>
			</Popover>
			<hr/>
			<IconButton aria-label={'Scroll Up'} isRound
				onClick={onScrollTop}
				variant={'solid'}
				colorScheme='teal'>
				<FaArrowUp />
			</IconButton>
			<IconButton aria-label={'Scroll Up'} isRound
				onClick={onScrollBottom}
				variant={'solid'}
				colorScheme='teal'>
				<FaArrowDown />
			</IconButton>
		</div>
		)
}

export default IssueSettingsFab