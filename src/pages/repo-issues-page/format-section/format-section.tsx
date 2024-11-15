import Section from "@/components/section/Section";
import { editFormat } from "@/redux/features/IssueFormatReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const FormatSection = () => {

	const dispatch = useAppDispatch();
	const _format = useAppSelector((state) => state.format);


	const onChangeFormat = (e: RCE<HTMLInputElement>) => {
		const { name, value } = e.target;
		dispatch(editFormat({ [name]: value }))
	}

	return (
		<Section.Blur className='flex gap-4 flex-grow flex-wrap'>
			<FormControl>
				<FormLabel>Before Card Number</FormLabel>
				<Input name='prefix' value={_format.prefix} onChange={onChangeFormat}/>
			</FormControl>
			<FormControl>
				<FormLabel>After Card Number</FormLabel>
				<Input name='suffix' value={_format.suffix} onChange={onChangeFormat}/>
			</FormControl>
		</Section.Blur>
	)
}

export default FormatSection;