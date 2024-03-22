import Section from "@/components/section/Section";
import { editFormat } from "@/redux/IssueFormatReducer";
import { selectFormat } from "@/redux/IssueFormatSelector";
import { AppDispatch } from "@/store";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const FormatSection = () => {

	const dispatch = useDispatch<AppDispatch>();
	const _format = useSelector(selectFormat);


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