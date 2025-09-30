'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartSidebarProps {
  onSettingsChange: (settings: ChartSettings) => void
}

interface ChartSettings {
  color: string
  showVerticalGrid: boolean
  showHorizontalGrid: boolean
  showDots: boolean
  strokeWidth: number
  lineType: 'linear' | 'monotone' | 'step'
}

const ChartSidebar = ({ onSettingsChange }: ChartSidebarProps) => {
  const [settings, setSettings] = useState<ChartSettings>({
    color: '#8884d8',
    showVerticalGrid: true,
    showHorizontalGrid: true,
    showDots: false,
    strokeWidth: 2,
    lineType: 'linear',
  })

  const colors = [
    { name: 'Blue', value: '#8884d8' },
    { name: 'Green', value: '#82ca9d' },
    { name: 'Purple', value: '#e9a2ff' },
    { name: 'Orange', value: '#ffc658' },
    { name: 'Red', value: '#ff6b6b' },
    { name: 'Teal', value: '#4ecdc4' },
  ]

  const strokeWidths = [1, 2, 3]

  const lineTypes = [
    { name: 'Linear', value: 'linear' as const },
    { name: 'Natural', value: 'monotone' as const },
    { name: 'Step', value: 'step' as const },
  ]

  const updateSettings = (newSettings: Partial<ChartSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    onSettingsChange(updatedSettings)
  }

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4 space-y-4 overflow-y-auto z-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chart Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Color Picker */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Line Color</Label>
            <div className="grid grid-cols-3 gap-2">
              {colors.map(color => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full border-2 ${
                    settings.color === color.value
                      ? 'border-gray-800'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => updateSettings({ color: color.value })}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Line Type */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Line Type</Label>
            <div className="flex flex-col gap-2">
              {lineTypes.map(type => (
                <button
                  key={type.value}
                  className={`px-3 py-2 text-sm rounded border text-left ${
                    settings.lineType === type.value
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => updateSettings({ lineType: type.value })}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          {/* Stroke Width */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Line Width</Label>
            <div className="flex gap-2">
              {strokeWidths.map(width => (
                <button
                  key={width}
                  className={`px-3 py-1 text-sm rounded border ${
                    settings.strokeWidth === width
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => updateSettings({ strokeWidth: width })}
                >
                  {width}
                  px
                </button>
              ))}
            </div>
          </div>

          {/* Grid Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="vertical-grid" className="text-sm font-medium">
                Vertical Grid
              </Label>
              <Switch
                id="vertical-grid"
                checked={settings.showVerticalGrid}
                onCheckedChange={checked =>
                  updateSettings({ showVerticalGrid: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="horizontal-grid" className="text-sm font-medium">
                Horizontal Grid
              </Label>
              <Switch
                id="horizontal-grid"
                checked={settings.showHorizontalGrid}
                onCheckedChange={checked =>
                  updateSettings({ showHorizontalGrid: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-dots" className="text-sm font-medium">
                Show Data Points
              </Label>
              <Switch
                id="show-dots"
                checked={settings.showDots}
                onCheckedChange={checked =>
                  updateSettings({ showDots: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export { ChartSidebar }
export type { ChartSettings }
