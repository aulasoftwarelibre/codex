import SubmitButton from '@/components/submit-button/submit-button'

interface SettingsFormFooterProperties {
  isDisabled: boolean
  status: string
}

export default function SettingsFormInputSubmit(
  properties: SettingsFormFooterProperties,
) {
  const { isDisabled, status } = properties
  return (
    <>
      <div className="flex flex-col gap-y-4 items-center sm:items-baseline sm:flex-row sm:justify-between">
        <span>{status}</span>
        <SubmitButton isDisabled={isDisabled}>Guardar</SubmitButton>
      </div>
    </>
  )
}
