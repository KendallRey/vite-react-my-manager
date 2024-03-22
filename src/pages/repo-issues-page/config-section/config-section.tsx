import Section from "@/components/section/Section";
import { editConfig } from "@/redux/IssueConfigReducer";
import { selectConfig } from "@/redux/IssueConfigSelector";
import { AppDispatch } from "@/store";
import { Checkbox } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const ConfigSection = () => {

	const dispatch = useDispatch<AppDispatch>();
	const _config = useSelector(selectConfig);

	const onChangeConfig = (e: RCE<HTMLInputElement>) => {
		const { name, checked } = e.target;
		dispatch(editConfig({ [name]: checked }))
	}

  return (
    <Section.Blur className='flex gap-4 flex-grow min-w-screen'>
      <Checkbox
        name='removeLink'
        checked={_config.removeLink}
        onChange={onChangeConfig}>
        Remove Link
      </Checkbox>
      <Checkbox
        name='hideTitleFilter'
        checked={_config.hideTitleFilter}
        onChange={onChangeConfig}>
        Hide Title Filter
      </Checkbox>
      <Checkbox
        name='hideLabels'
        checked={_config.hideLabels}
        onChange={onChangeConfig}>
        Hide Labels
      </Checkbox>
    </Section.Blur>
  )
}

export default ConfigSection;