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

import { TbSettingsCode } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

const IssueSettingsFab = () => {

	const _config = useSelector(selectConfig);
	const dispatch = useDispatch<AppDispatch>();

	const onChangeConfig = (e: RCE<HTMLInputElement>) => {
		const { name, checked } = e.target;
		dispatch(editConfig({ [name]: checked }))
	}

  return (
    <div className='fixed right-2 bottom-10 z-10'>
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
					</PopoverBody>
				</PopoverContent>
			</Popover>

		</div>
    )
}

export default IssueSettingsFab