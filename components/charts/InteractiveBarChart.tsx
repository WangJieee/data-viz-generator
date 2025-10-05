'use client'

import { useContext } from 'react'
import { DataContext } from '@/app/page'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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
import { processChartData, getTransformedFieldName, YTransform } from '../../lib/dataTransformUtils'

type InteractiveBarChartProps = {
  xField: string
  yField: string
  chartSettings?: ChartSettings
  yTransform?: YTransform
}

const InteractiveBarChart = ({
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
  yTransform = 'Count',
}: InteractiveBarChartProps) => {
  const { data: chartData } = useContext(DataContext) || {}
  if (!chartData) {
    throw new Error('DataContext is not provided')
  }

  // Process data using the utility function
  const processedData = processChartData(chartData, xField, yField, yTransform)
  const transformedYField = getTransformedFieldName(yField, yTransform)

  const chartConfig = {
    [transformedYField]: {
      label: `${yTransform} of ${yField}`,
      color: chartSettings.color,
    },
  } satisfies ChartConfig

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bar Chart - Interactive</CardTitle>
        <CardDescription>
          {`${yTransform} of ${yField} grouped by ${xField}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={processedData}
            layout={chartSettings.horizontalBar ? 'vertical' : 'horizontal'}
          >
            <CartesianGrid
              vertical={chartSettings.showVerticalGrid}
              horizontal={chartSettings.showHorizontalGrid}
            />
            {chartSettings.horizontalBar
              ? (
                  <>
                    <XAxis
                      type="number"
                      tickLine={false}
                    />
                    <YAxis dataKey={xField} type="category" tickLine={false} axisLine={false} tickMargin={8} />
                  </>
                )
              : (
                  <>
                    <XAxis
                      dataKey={xField}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis />
                  </>
                )}

            <ChartTooltip
              cursor={false}
              content={(
                <ChartTooltipContent
                  hideLabel
                  active
                  accessibilityLayer
                />
              )}
            />
            <Bar
              dataKey={transformedYField}
              fill={chartSettings.color}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export { InteractiveBarChart }
export type { InteractiveBarChartProps }
