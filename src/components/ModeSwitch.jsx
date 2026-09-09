/** Slider switch. role="switch" so it announces its state rather than reading
    as a plain button. */
export default function ModeSwitch({ checked, onChange, labelOff, labelOn }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="mode-switch"
      onClick={() => onChange(!checked)}
    >
      <span className="mode-switch__track" aria-hidden="true">
        <span className="mode-switch__thumb" />
      </span>
      <span>{checked ? labelOn : labelOff}</span>
    </button>
  )
}
