'use client'

import { Canva } from '@/components/ui/Canva'
import { ChartSelector } from '@/components/ui/ChartSelector'
import { FileUpload } from '@/components/ui/FileUpload'
import { createContext, useReducer, useState } from 'react'

export enum ViewState {
  FileUpload = 'fileUpload',
  ChartSelector = 'chartSelector',
  Canva = 'canva',
}

function viewReducer(state: ViewState, action: { type: ViewState }): ViewState {
  return action.type
}

export const ViewContext = createContext<{ view: ViewState, dispatch: React.Dispatch<{ type: ViewState }> } | undefined>(undefined)
export const DataContext = createContext<{ data: object[], setData: React.Dispatch<React.SetStateAction<object[]>> } | undefined>(undefined)

export default function Home() {
  const [view, dispatch] = useReducer(viewReducer, ViewState.FileUpload)
  const [data, setData] = useState<object[]>([])

  let content
  switch (view) {
    case ViewState.FileUpload:
      content = <FileUpload />
      break
    case ViewState.ChartSelector:
      content = <ChartSelector />
      break
    case ViewState.Canva:
      content = <Canva />
      break
    default:
      content = null
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <ViewContext.Provider value={{ view, dispatch }}>
          <DataContext.Provider value={{ data, setData }}>
            {content}
          </DataContext.Provider>
        </ViewContext.Provider>

      </main>

    </div>
  )
}
