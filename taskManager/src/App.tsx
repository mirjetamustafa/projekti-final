import Select from './components/Select/Select'

function App() {
  const categories = [
    { label: 'Elektronikë', value: 'electronics' },
    { label: 'Veshmbathje', value: 'clothes' },
    { label: 'Ushqime', value: 'food' },
  ]
  return (
    <div>
      <Select label="Kategoria" options={categories} />
    </div>
  )
}

export default App
