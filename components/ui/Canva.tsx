import { ChartConfig, ChartType, ViewContext, ViewState } from '@/app/page'
import { InteractiveLineChart } from '../charts/InteractiveLineChart'
import { Button } from './button'
import { useContext, useState } from 'react'
import { ChartSidebar, ChartSettings } from './ChartSidebar'
import { InteractiveAreaChart } from '../charts/InteractiveAreaChart'
import { InteractiveBarChart } from '../charts/InteractiveBarChart'

interface CanvaProps {
  chartConfig: ChartConfig
}

const Canva = ({ chartConfig }: CanvaProps) => {
  const [chartSettings, setChartSettings] = useState<ChartSettings>({
    color: '#8884d8',
    showVerticalGrid: true,
    showHorizontalGrid: true,
    showDots: false,
    strokeWidth: 2,
    lineType: 'linear',
  })

  const { dispatch } = useContext(ViewContext) || {}
  if (!dispatch) {
    throw new Error('ViewContext is not provided')
  }

  const onBackClick = () => {
    dispatch({ type: ViewState.ChartSelector })
  }

  const handleSettingsChange = (settings: ChartSettings) => {
    setChartSettings(settings)
  }

  const renderChart = () => {
    if (!chartConfig) {
      return <div>No chart configuration provided</div>
    }

    switch (chartConfig.chartType) {
      case ChartType.Line:
        return (
          <InteractiveLineChart
            yField={chartConfig.yField || ''}
            xField={chartConfig.xField || ''}
            chartSettings={chartSettings}
          />
        )
      case ChartType.Area:
        return (
          <InteractiveAreaChart
            yField={chartConfig.yField || ''}
            xField={chartConfig.xField || ''}
            chartSettings={chartSettings}
          />
        )
      case ChartType.Bar:
        return (
          <InteractiveBarChart
            yField={chartConfig.yField || ''}
            xField={chartConfig.xField || ''}
            yTransform={chartConfig.yTransform}
            chartSettings={chartSettings}
          />
        )
      default:
        return (
          <div>
            Chart type &quot;
            {chartConfig.chartType}
            &quot; not implemented yet
          </div>
        )
    }
  }

  return (
    <div className="w-full flex">
      {/* Fixed Sidebar */}
      <ChartSidebar onSettingsChange={handleSettingsChange} chartType={chartConfig.chartType} />

      {/* Main Chart Area - offset by sidebar width */}
      <div className="flex-1 ml-64 flex flex-col justify-center p-4">
        {renderChart()}
        <div className="w-full flex justify-start mt-4">
          <Button variant="secondary" onClick={onBackClick}>{'<- Back'}</Button>
        </div>
      </div>
    </div>
  )
}

export { Canva }
