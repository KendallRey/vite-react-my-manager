import { OctoGetUserFollowersApi } from "@/components/github-api/user/UserApi";
import { IGithubFollowerSchema } from "@/model/follower/follower";
import { setUserFollowers } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

const FollowerTable = () => {

  const dispatch = useAppDispatch();
  const followingsIds = useAppSelector((state) => state.user.followings?.map((item) => item.id));

  const [followers, setFollowers] = useState<IGithubFollowerSchema[]>()

  const getUserFollowers = useCallback(async () => {
    const followers = await OctoGetUserFollowersApi({
      params: { per_page: 100 }
    });
    setFollowers(followers ?? [])
    dispatch(setUserFollowers(followers ?? []))
  },[dispatch])

  useEffect(() => {
    getUserFollowers();
  },[getUserFollowers])

  return (
    <TableContainer className="flex flex-col">
      <Table variant='striped' size='sm'>
        <TableCaption>Count: {followers?.length ?? '-'}</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {followers?.map((follower) => <Tr key={follower.id}>
            <Td>{follower.login}</Td>
          </Tr>)}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default FollowerTable