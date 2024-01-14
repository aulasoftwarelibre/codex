'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import InputForm, {
  FormInputProperties,
} from '@/components/input-form/input-form'
import SettingsFormInputSubmit from '@/components/settings-form/settings-form-input-submit'
import { showToast } from '@/components/toast/toast'
import UserResponse from '@/core/user/dto/responses/user.response'
import {
  UpdatableFields,
  updateSetting,
} from '@/core/user/infrastructure/actions/update-setting'
import FormResponse from '@/lib/zod/form-response'

interface SettingsFormInputTextProperties {
  field: UpdatableFields
  inputProperties: Omit<FormInputProperties, 'state'>
  status: string
  user: UserResponse
}

function useController(properties: SettingsFormInputTextProperties) {
  const [isMutated, setIsMutated] = useState(false)
  const { field, user } = properties
  const formData = {
    field,
    value: user[field],
  }

  const formState = useFormState(
    updateSetting,
    FormResponse.initialState(formData),
  )

  return { ...properties, formState, isMutated, setIsMutated }
}

export default function SettingsFormInputText(
  properties: SettingsFormInputTextProperties,
) {
  const { field, formState, inputProperties, isMutated, setIsMutated, status } =
    useController(properties)

  const [state, action] = formState

  useEffect(() => {
    if (state.success) {
      showToast('Perfil actualizado')
      setIsMutated(false)
    }
  }, [state, setIsMutated])

  return (
    <>
      <form action={action} className="flex flex-col gap-y-4">
        <InputForm
          state={state}
          name="value"
          defaultValue={state.data.value}
          onChange={() => setIsMutated(true)}
          {...inputProperties}
          aria-label={field}
        />
        <input type="hidden" name="field" value={field} />
        <SettingsFormInputSubmit isDisabled={!isMutated} status={status} />
      </form>
    </>
  )
}
