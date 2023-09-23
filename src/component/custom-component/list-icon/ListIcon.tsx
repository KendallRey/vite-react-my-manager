import { ReactNode } from "react"
import { BsMusicNoteBeamed } from "react-icons/bs"
import { MdGames } from "react-icons/md"
import { HiDesktopComputer } from "react-icons/hi"
import { BiSolidBookBookmark } from "react-icons/bi"
import { FaList } from "react-icons/fa"
import { AiFillPicture, AiFillVideoCamera } from "react-icons/ai"


type IconType = 
	"MdGames" |
	"BsMusicNoteBeamed" |
	"HiDesktopComputer" |
	"AiFillPicture" |
	"AiFillVideoCamera" |
	"BiSolidBookBookmark" |
	"FaList"

type ListIconType = {
	id : IconType
	name : string
	icon : ReactNode
}

export const LIST_ICONS : ListIconType[] = [
	{
		id : "MdGames",
		name : "Games",
		icon : <MdGames/>
	},
	{
		id : "BsMusicNoteBeamed",
		name : "Music",
		icon : <BsMusicNoteBeamed/>
	},
	{
		id : "HiDesktopComputer",
		name : "Computer",
		icon : <HiDesktopComputer/>
	},
	{
		id : "AiFillPicture",
		name : "Photos",
		icon : <AiFillPicture/>
	},
	{
		id : "AiFillVideoCamera",
		name : "Videos",
		icon : <AiFillVideoCamera/>
	},
	{
		id : "BiSolidBookBookmark",
		name : "Books",
		icon : <BiSolidBookBookmark/>
	},
	{
		id : "FaList",
		name : "List",
		icon : <FaList/>
	},
]