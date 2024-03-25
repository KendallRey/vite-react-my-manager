import { v4 as uuidv4 } from 'uuid';

type WithID = {
  id: string
}

export const GetIDs = (list: WithID[]) => list.map((item) => item.id);

export const SetRandomIDs = <T>(list: T[]) => list.map((item) => {
  return {
    id: uuidv4(),
    ...item,
  } as (WithID & T)
})