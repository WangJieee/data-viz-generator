'use client'

import { useContext, useState } from 'react'
import { DataContext } from '@/app/page'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

type InteractiveLineChartProps = {
  xField: string
  yField: string
}

const InteractiveLineChart = ({ xField, yField }: InteractiveLineChartProps) => {
  const { data: chartData } = useContext(DataContext) || {}
  if (!chartData) {
    throw new Error('DataContext is not provided')
  }
  const processedData = chartData.map(item => ({
    ...item,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [yField]: parseFloat((item as any)[yField]), // Or parseInt() or Number()
  })).slice(0, 30)

  const chartConfig = {
    [yField]: {
      label: yField,
      color: 'var(--chart-2)',
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
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
            <Line
              dataKey={yField}
              type="linear"
              stroke={`var(--color-${yField})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { InteractiveLineChart }
