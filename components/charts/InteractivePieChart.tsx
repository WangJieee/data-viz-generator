'use client'

import { useContext } from 'react'
import { DataContext } from '@/app/page'
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChartSettings } from '../ui/ChartSidebar'
import { processChartData, getTransformedFieldName, YTransform } from '../../lib/dataTransformUtils'
import { InteractiveBarChartProps } from './InteractiveBarChart'

type InteractivePieChartProps = {
  nameField: string
  dataField: string
  chartSettings?: ChartSettings
  yTransform?: YTransform
}

const InteractivePieChart = ({
  nameField,
  dataField,
  chartSettings = {
    color: '#8884d8',
    showVerticalGrid: true,
    showHorizontalGrid: true,
  },
  yTransform = 'Count',
}: InteractivePieChartProps) => {
  const { data: chartData } = useContext(DataContext) || {}
  if (!chartData) {
    throw new Error('DataContext is not provided')
  }

  // Process data using the utility function
  const processedData = processChartData(chartData, nameField, dataField, yTransform)
  const transformedYField = getTransformedFieldName(dataField, yTransform)

  processedData.forEach((item, index) => {
    item.fill = `rgba(${parseInt(chartSettings.color.slice(1, 3), 16)}, ${parseInt(chartSettings.color.slice(3, 5), 16)}, ${parseInt(chartSettings.color.slice(5, 7), 16)}, ${0.3 + 0.7 * (index / Math.max(processedData.length - 1, 1))})`
  })

  const chartConfig = {
    [transformedYField]: {
      label: transformedYField,
    },
    ...processedData.reduce((config, item, index) => {
      const value = item[nameField] as string
      config[value] = {
        label: value,
        color: `rgba(${parseInt(chartSettings.color.slice(1, 3), 16)}, ${parseInt(chartSettings.color.slice(3, 5), 16)}, ${parseInt(chartSettings.color.slice(5, 7), 16)}, ${0.3 + 0.7 * (index / Math.max(processedData.length - 1, 1))})`,
      }
      return config
    }, {} as Record<string, { label: string, color: string }>),
  } satisfies ChartConfig

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pie Chart - Interactive</CardTitle>
        <CardDescription>
          {`${yTransform} of ${dataField} grouped by ${nameField}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey={transformedYField} hideLabel accessibilityLayer active />}
            />
            <Pie data={processedData} dataKey={transformedYField} />
            <ChartLegend
              content={<ChartLegendContent nameKey={nameField} />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { InteractivePieChart }
export type { InteractivePieChartProps }
