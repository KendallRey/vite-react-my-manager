import Section from "@/components/section/Section";
import FollowerTable from "./ui/FollowerTable";
import FollowingTable from "./ui/FollowingTable";
import { Button, Divider, Text } from "@chakra-ui/react";

const UserPage = () => {
  
  return (
    <div className='flex h-full flex-col mx-2 gap-5 w-full'>
      <Section.Blur>
        <Button>Compare</Button>
      </Section.Blur>
      <div className="flex gap-4">
      <Section.Blur className='flex-1'>
        <Text className="text-2xl">Followers</Text>
        <Divider/>
        <FollowerTable />
      </Section.Blur>
      <Section.Blur className='flex-1'>
      <Text className="text-2xl">Following</Text>
        <Divider/>
        <FollowingTable />
      </Section.Blur>
      </div>
    </div>
  );
}

export default UserPage;