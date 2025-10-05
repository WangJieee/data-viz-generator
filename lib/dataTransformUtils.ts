import groupBy from 'lodash/groupBy'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import mean from 'lodash/mean'
import sumBy from 'lodash/sumBy'
import sortBy from 'lodash/sortBy'
import { ChartDataPoint } from '@/app/page'

export type YTransform = 'Count' | 'Min' | 'Max' | 'Average' | 'Sum'

export function processChartData(
  chartData: ChartDataPoint[],
  xField: string,
  yField: string,
  yTransform: YTransform = 'Count',
): ChartDataPoint[] {
  if (!chartData || chartData.length === 0) {
    return []
  }

  // Group data by xField
  const groupedData = groupBy(chartData, item => item[xField])

  // Process each group based on yTransform
  const processedData = Object.entries(groupedData).map(([xValue, group]) => {
    let transformedValue: number

    switch (yTransform) {
      case 'Count':
        transformedValue = group.length
        break

      case 'Min':
        const minItem = minBy(group, item => parseFloat(String(item[yField] || 0)))
        transformedValue = minItem ? parseFloat(String(minItem[yField] || 0)) : 0
        break

      case 'Max':
        const maxItem = maxBy(group, item => parseFloat(String(item[yField] || 0)))
        transformedValue = maxItem ? parseFloat(String(maxItem[yField] || 0)) : 0
        break

      case 'Average':
        const values = group.map(item => parseFloat(String(item[yField] || 0))).filter(v => !isNaN(v))
        transformedValue = values.length > 0 ? mean(values) : 0
        break

      case 'Sum':
        transformedValue = sumBy(group, item => parseFloat(String(item[yField] || 0)))
        break

      default:
        transformedValue = group.length // Default to count
    }

    return {
      [xField]: xValue,
      [`${yTransform.toLowerCase()}_${yField}`]: Math.round(transformedValue * 100) / 100, // Round to 2 decimal places
    }
  })

  // Sort by xField for consistent ordering
  return sortBy(processedData, xField)
}

// Helper function to get the transformed field name
export function getTransformedFieldName(yField: string, yTransform: YTransform): string {
  return `${yTransform.toLowerCase()}_${yField}`
}
