'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import { Button } from './button'
import { ChartType, DataContext, ViewContext, ViewState } from '@/app/page'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LineChartSettings } from '../chartSettings/LineChartSettings'
import { AreaChartSettings } from '../chartSettings/AreaChartSettings'
import { BarChartSettings } from '../chartSettings/BarChartSettings'
import { PieChartSettings } from '../chartSettings/PieChartSettings'

const ChartSelector = () => {
  const chartTypes = [
    {
      name: 'Line Chart',
      id: ChartType.Line,
      icon: '/line-chart.svg',
      settings: LineChartSettings,
    },
    {
      name: 'Bar Chart',
      id: ChartType.Bar,
      icon: '/bar-chart.svg',
      settings: BarChartSettings,
    },
    {
      name: 'Pie Chart',
      id: ChartType.Pie,
      icon: '/pie-chart.svg',
      settings: PieChartSettings,
    },
    {
      name: 'Scatter Plot',
      id: ChartType.Scatter,
      icon: '/scatter-plot.svg',
      settings: null,
    },
    {
      name: 'Area Chart',
      id: ChartType.Area,
      icon: '/area-chart.svg',
      settings: AreaChartSettings,
    },
    {
      name: 'Radar Chart',
      id: ChartType.Radar,
      icon: '/radar-chart.svg',
      settings: null,
    },
  ]
  const { dispatch } = useContext(ViewContext) || {}
  if (!dispatch) {
    throw new Error('ViewContext is not provided')
  }
  const { data } = useContext(DataContext) || {}
  if (!data) {
    throw new Error('DataContext is not provided')
  }

  const onBackClick = () => {
    dispatch({ type: ViewState.FileUpload })
  }

  return (
    <div className="w-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {chartTypes.map((chart) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Settings = chart.settings as React.FC<any>
          return (
            <Dialog key={chart.id}>
              <DialogTrigger>
                <div
                  className="cursor-pointer rounded-lg p-6 text-center bg-white/30 backdrop-blur-md hover:bg-white/50 transition flex flex-col items-center shadow-md hover:shadow-lg"
                >
                  <Image
                    src={chart.icon}
                    alt={chart.name}
                    height={36}
                    width={36}
                  />
                  <p className="font-normal text-sm mt-1">{chart.name}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{`Configure your ${chart.name}`}</DialogTitle>
                {chart.settings && <Settings fields={Object.keys(data[0])} />}
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
      <div className="w-full flex justify-start mt-4"><Button variant="secondary" onClick={onBackClick}>{'<- Back'}</Button></div>
    </div>
  )
}

export { ChartSelector }
