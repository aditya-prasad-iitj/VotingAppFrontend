import { useState } from 'preact/hooks'

const OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

export function App() {
  const [voterId, setVoterId] = useState('')
  const [selected, setSelected] = useState(null)
  const [errors, setErrors] = useState({})

  const handleVote = () => {
    const errs = {}
    if (!voterId.trim()) errs.voterId = 'Voter ID is required.'
    if (!selected) errs.candidate = 'Select an option to continue.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
  }

  return (
    <div class="page">
      <div class="header">
        <h1 class="title">Cast Your Vote</h1>
      </div>

      <div class="card">

        <div class="field-group">
          <label class="label" for="voter-id">VOTER ID</label>
          <input
            id="voter-id"
            class={"input" + (errors.voterId ? " input-error" : "")}
            type="text"
            placeholder="Enter your Voter ID"
            value={voterId}
            onInput={e => {
              setVoterId(e.target.value)
              if (errors.voterId) setErrors(p => ({ ...p, voterId: undefined }))
            }}
          />
          {errors.voterId && <p class="error">{errors.voterId}</p>}
        </div>

        <div class="divider" />

        <div class="field-group">
          <p class="label">SELECT CANDIDATE</p>
          {errors.candidate && <p class="error">{errors.candidate}</p>}
          <div class="candidates">
            {OPTIONS.map((opt, i) => (
              <button
                key={i}
                class={"candidate" + (selected === opt ? " candidate-selected" : "")}
                onClick={() => {
                  setSelected(opt)
                  if (errors.candidate) setErrors(p => ({ ...p, candidate: undefined }))
                }}
              >
                <span class="candidate-id mono">{i + 1}</span>
                <span class="candidate-name">{opt}</span>
                <span class="tick">{selected === opt ? '✓' : ''}</span>
              </button>
            ))}
          </div>
        </div>

        <div class="divider" />

        <button class="btn-vote" onClick={handleVote}>Vote Now</button>
        <p class="fine-print">End-to-end encrypted. Your identity remains confidential.</p>
      </div>
    </div>
  )
}
