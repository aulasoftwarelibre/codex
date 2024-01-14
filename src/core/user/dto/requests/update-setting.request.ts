import { DeepReadonly } from 'ts-essentials'

type UpdateSettingRequest = DeepReadonly<{
  email: string
  field: string
  value: string
}>

const UpdateSettingRequest = {
  with: (properties: UpdateSettingRequest): UpdateSettingRequest => properties,
}

export default UpdateSettingRequest
