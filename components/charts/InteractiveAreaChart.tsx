'use client'

import { useContext } from 'react'
import { DataContext } from '@/app/page'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { ChartSettings } from '../ui/ChartSidebar'

type InteractiveAreaChartProps = {
  xField: string
  yField: string
  chartSettings?: ChartSettings
}

const InteractiveAreaChart = ({
  xField,
  yField,
  chartSettings = {
    color: '#8884d8',
    showVerticalGrid: true,
    showHorizontalGrid: true,
    showDots: false,
    strokeWidth: 2,
    lineType: 'monotone',
  },
}: InteractiveAreaChartProps) => {
  const { data: chartData } = useContext(DataContext) || {}
  if (!chartData) {
    throw new Error('DataContext is not provided')
  }

  const processedData = chartData.map(item => ({
    ...item,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [yField]: parseFloat((item as any)[yField]),
  })).slice(0, 30)

  const chartConfig = {
    [yField]: {
      label: yField,
      color: chartSettings.color,
    },
  } satisfies ChartConfig

  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle>Area Chart - Interactive</CardTitle>
        <CardDescription>Customize your visualization with the sidebar controls</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={processedData}
          >
            <CartesianGrid
              vertical={chartSettings.showVerticalGrid}
              horizontal={chartSettings.showHorizontalGrid}
            />
            <XAxis
              dataKey={xField}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={(
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={yField}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                  active
                  accessibilityLayer
                />
              )}
            />
            <Area
              dataKey={yField}
              type={chartSettings.lineType}
              fill={chartSettings.color}
              fillOpacity={0.4}
              stroke={chartSettings.color}
              strokeWidth={chartSettings.strokeWidth}
              dot={chartSettings.showDots}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { InteractiveAreaChart }
