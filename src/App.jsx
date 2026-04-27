import IdeaPlannerPanel from './components/IdeaPlannerPanel'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main app content goes here */}
      <div className="flex items-center justify-center min-h-screen text-gray-400 text-lg select-none">
        CloutFinder
      </div>

      <IdeaPlannerPanel />
    </div>
  )
}
