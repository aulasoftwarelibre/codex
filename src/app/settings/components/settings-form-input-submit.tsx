import { SubmitButton } from '@/components/form/submit-button'

interface SettingsFormFooterProperties {
  isDisabled: boolean
  status: string
}

export function SettingsFormInputSubmit(
  properties: SettingsFormFooterProperties,
) {
  const { isDisabled, status } = properties
  return (
    <>
      <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:items-baseline sm:justify-between">
        <span>{status}</span>
        <SubmitButton isDisabled={isDisabled}>Guardar</SubmitButton>
      </div>
    </>
  )
}
