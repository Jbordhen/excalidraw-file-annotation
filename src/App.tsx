import { useRef, useState } from 'react'
import './App.css'
import { Excalidraw } from '@excalidraw/excalidraw'
import {
  AppState,
  ExcalidrawImperativeAPI,
  PointerDownState,
} from '@excalidraw/excalidraw/types/types'

function App() {
  const [size, setSize] = useState({
    width: 800,
    height: 800,
  })
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const excalidrawRef: React.MutableRefObject<ExcalidrawImperativeAPI> =
    useRef(null)

  const onPointerDown = (
    activeTool: AppState['activeTool'],
    pointerDownState: PointerDownState
  ) => {
    setPointer({
      x: pointerDownState.origin.x,
      y: pointerDownState.origin.y,
    })
  }

  return (
    <>
      <div>
        <div
          style={{
            ...size,
            position: 'relative',
          }}
        >
          <img
            style={{ objectFit: 'cover', position: 'absolute', inset: 0 }}
            alt=''
            src='image.jpg'
            width={size.width}
            height={size.height}
          />
          <Excalidraw
            excalidrawAPI={(api) => {
              excalidrawRef.current = api
            }}
            initialData={{
              appState: {
                viewBackgroundColor: 'transparent',
                activeTool: {
                  locked: true,
                  lastActiveTool: null,
                  type: 'selection',
                  customType: null,
                },
              },
            }}
            UIOptions={{
              canvasActions: {
                changeViewBackgroundColor: false,
                clearCanvas: false,
                export: false,
                loadScene: false,
                saveToActiveFile: false,
                toggleTheme: false,
                saveAsImage: false,
              },
            }}
            onPointerDown={onPointerDown}
          ></Excalidraw>
        </div>
        <button
          style={{ marginTop: '1rem' }}
          onClick={() => {
            setSize(
              size.width === 800
                ? { width: 1000, height: 1000 }
                : { width: 800, height: 800 }
            )
          }}
        >
          Toggle Size
        </button>
        <div>{JSON.stringify(pointer, null, 2)}</div>
      </div>
    </>
  )
}

export default App
