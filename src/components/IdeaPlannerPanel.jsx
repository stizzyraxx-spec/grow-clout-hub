import { useState, useRef, useEffect, useCallback } from 'react'

const MIN_W = 320
const MAX_W_RATIO = 0.92
const DEFAULT_W = 680

export default function IdeaPlannerPanel() {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState(DEFAULT_W)
  const dragging = useRef(false)
  const startX = useRef(0)
  const startW = useRef(0)

  const onMouseDown = useCallback((e) => {
    dragging.current = true
    startX.current = e.clientX
    startW.current = width
    e.preventDefault()
  }, [width])

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const delta = startX.current - e.clientX
      const maxW = Math.floor(window.innerWidth * MAX_W_RATIO)
      setWidth(Math.min(maxW, Math.max(MIN_W, startW.current + delta)))
    }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <>
      {/* Pull tab */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ right: open ? width : 0 }}
        className="fixed top-1/2 -translate-y-1/2 z-50 flex items-center gap-1.5 transition-[right] duration-300 ease-in-out"
        title={open ? 'Close IdeaPlanner' : 'Open IdeaPlanner'}
      >
        <div className="flex flex-col items-center justify-center bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white rounded-l-xl shadow-lg px-1.5 py-5 cursor-pointer select-none transition-colors">
          <span className="text-xs font-semibold tracking-widest [writing-mode:vertical-rl] rotate-180">
            IdeaPlanner
          </span>
          <svg
            className={`w-3.5 h-3.5 mt-2 transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </div>
      </button>

      {/* Slide-out panel */}
      <div
        style={{ width, right: open ? 0 : -width }}
        className="fixed top-0 bottom-0 z-40 flex transition-[right] duration-300 ease-in-out shadow-2xl"
      >
        {/* Resize handle */}
        <div
          onMouseDown={onMouseDown}
          className="w-1.5 flex-shrink-0 bg-violet-200 hover:bg-violet-400 cursor-col-resize active:bg-violet-500 transition-colors"
          title="Drag to resize"
        />

        {/* IdeaPlanner iframe */}
        <div className="flex-1 overflow-hidden bg-white">
          {open && (
            <iframe
              src="/ideaplanner.html"
              className="w-full h-full border-0"
              title="IdeaPlanner"
              allow="clipboard-read; clipboard-write"
            />
          )}
        </div>
      </div>

      {/* Backdrop (mobile-friendly) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
