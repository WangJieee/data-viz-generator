import { Label } from '@/components/ui/label'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '../ui/button'
import { useContext } from 'react'
import { ChartType, ViewContext, ViewState } from '@/app/page'

const AreaChartSettings = ({ fields }: { fields: string[] }) => {
  const [xField, setXField] = useState<string>('')
  const [yField, setYField] = useState<string>('')

  const { dispatch } = useContext(ViewContext) || {}
  if (!dispatch) {
    throw new Error('ViewContext is not provided')
  }

  const xSelect = (
    <Select value={xField} onValueChange={setXField}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a field" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fields.map(field => (
            <SelectItem value={field} key={field}>{field}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  const ySelect = (
    <Select value={yField} onValueChange={setYField}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a field" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fields.map(field => (
            <SelectItem value={field} key={field}>{field}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

  const onGenerateClick = () => {
    dispatch({
      type: ViewState.Canva,
      payload: {
        chartType: ChartType.Area,
        xField,
        yField,
      },
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Label htmlFor="x-axis">Select the X field: </Label>
        {xSelect}
      </div>
      <div className="flex justify-between">
        <Label htmlFor="y-axis">Select the Y field: </Label>
        {ySelect}
      </div>
      <div className="flex justify-end mt-3">
        <Button
          className="bg-teal-600"
          onClick={onGenerateClick}
          disabled={!xField || !yField}
        >
          All set, generate!
        </Button>
      </div>
    </div>
  )
}

export { AreaChartSettings }
