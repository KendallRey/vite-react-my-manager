import { OctoGetUserFollowingsApi } from "@/components/github-api/user/UserApi";
import { IGithubFollowerSchema } from "@/model/follower/follower";
import { setUserFollowings } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

const FollowingTable = () => {

  const dispatch = useAppDispatch();
  const followersIds = useAppSelector((state) => state.user.followers?.map((item) => item.id));

  const [followings, setFollowings] = useState<IGithubFollowerSchema[]>()

  const getUserFollowers = useCallback(async () => {
    const followers = await OctoGetUserFollowingsApi({
      params: { per_page: 100 }
    });
    setFollowings(followers ?? [])
    dispatch(setUserFollowings(followers ?? []))
  },[dispatch])

  useEffect(() => {
    getUserFollowers();
  },[getUserFollowers])

  return (
    <TableContainer className="flex flex-col">
      <Table variant='striped' size='sm'>
        <TableCaption>Count: {followings?.length ?? '-'}</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {followings?.map((follower) => {
            const isFollower = followersIds?.includes(follower.id);
            return (
              <Tr key={follower.id}>
                <Td color={!isFollower ? 'yellow' : ''}>{follower.login}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default FollowingTable