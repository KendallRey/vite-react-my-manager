import { UseToastOptions } from "@chakra-ui/react"

const TOAST_DEFAULT = {
	isClosable: true,
  position: 'bottom-right',
  duration: 9000,
} as UseToastOptions

const TOAST_OVERRIDE = {

} as UseToastOptions

export const FetchingToast = (props: UseToastOptions) => {
	const { title, } = props;

	const option : UseToastOptions = {
		...TOAST_DEFAULT,
		...props,
		status: 'loading',
		title: `Fetching ${title}`,
		...TOAST_OVERRIDE
	}

	return option

}

export const LoadedToast = (props: UseToastOptions) => {
	const { title, } = props;

	const option : UseToastOptions = {
		...TOAST_DEFAULT,
		...props,
		status: 'success',
		title: `${title} Loaded`,
		...TOAST_OVERRIDE
	}

	return option
}

export const FailedToast = (props: UseToastOptions) => {
	const { title, } = props;

	const option : UseToastOptions = {
		...TOAST_DEFAULT,
		...props,
		status: 'error',
		title: `${title} Failed`,
		...TOAST_OVERRIDE
	}

	return option
}

export const SuccessToast = (props: UseToastOptions) => {
	const { title, } = props;

	const option : UseToastOptions = {
		...TOAST_DEFAULT,
		...props,
		status: 'success',
		title: `${title} Success`,
		...TOAST_OVERRIDE
	}
	return option
}