'use client'

import { Canva } from '@/components/ui/Canva'
import { ChartSelector } from '@/components/ui/ChartSelector'
import { FileUpload } from '@/components/ui/FileUpload'
import { ProgressSteps } from '@/components/ui/ProgressSteps'
import { YTransform } from '@/lib/dataTransformUtils'
import { createContext, useReducer, useState } from 'react'

export enum ViewState {
  FileUpload = 'fileUpload',
  ChartSelector = 'chartSelector',
  Canva = 'canva',
}

export enum ChartType {
  Line = 'line',
  Bar = 'bar',
  Pie = 'pie',
  Scatter = 'scatter',
  Area = 'area',
  Radar = 'radar',
}

export interface ChartConfig {
  chartType: ChartType
  xField?: string
  yField?: string
  yTransform?: YTransform
  xTransform?: string
}

interface ViewAction {
  type: ViewState
  payload?: ChartConfig
}

interface ViewReducerState {
  view: ViewState
  chartConfig?: ChartConfig
}

function viewReducer(state: ViewReducerState, action: ViewAction): ViewReducerState {
  return {
    view: action.type,
    chartConfig: action.payload || state.chartConfig,
  }
}
export interface ChartDataPoint {
  [key: string]: string | number
}

export const ViewContext = createContext<{
  view: ViewState
  chartConfig?: ChartConfig
  dispatch: React.Dispatch<ViewAction>
} | undefined>(undefined)
export const DataContext = createContext<{ data: ChartDataPoint[], setData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>> } | undefined>(undefined)

export default function Home() {
  const [state, dispatch] = useReducer(viewReducer, {
    view: ViewState.FileUpload,
    chartConfig: undefined,
  })
  const [data, setData] = useState<ChartDataPoint[]>([])

  let content
  switch (state.view) {
    case ViewState.FileUpload:
      content = <FileUpload />
      break
    case ViewState.ChartSelector:
      content = <ChartSelector />
      break
    case ViewState.Canva:
      content = state.chartConfig ? <Canva chartConfig={state.chartConfig} /> : null
      break
    default:
      content = null
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <ViewContext.Provider value={{ view: state.view, chartConfig: state.chartConfig, dispatch }}>
          <DataContext.Provider value={{ data, setData }}>
            {content}
          </DataContext.Provider>
        </ViewContext.Provider>
      </main>
    </div>
  )
}
