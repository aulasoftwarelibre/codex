'use client'

import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

import { SettingsFormInputSubmit } from '@/app/settings/components/settings-form-input-submit'
import { FormInputProperties, InputForm } from '@/components/form/input-form'
import { showToast } from '@/components/form/toast'
import { UserResponse } from '@/core/user/dto/responses/user.response'
import {
  UpdatableFields,
  updateSetting,
} from '@/core/user/infrastructure/actions/update-setting'
import { FormResponse } from '@/lib/zod/form-response'

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

export function SettingsFormInputText(
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
          defaultValue={state.data.value}
          name="value"
          onChange={() => setIsMutated(true)}
          state={state}
          {...inputProperties}
          aria-label={field}
        />
        <input name="field" type="hidden" value={field} />
        <SettingsFormInputSubmit isDisabled={!isMutated} status={status} />
      </form>
    </>
  )
}
