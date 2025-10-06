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
import { YTransform } from '@/lib/dataTransformUtils'

const PieChartSettings = ({ fields }: { fields: string[] }) => {
  const [xField, setXField] = useState<string>('')
  const [yField, setYField] = useState<string>('')
  const [transformFunction, setTransformFunction] = useState<string>('')

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
    <div className="flex gap-2">
      <Select value={transformFunction} onValueChange={setTransformFunction}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Transform" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="None">None</SelectItem>
            <SelectItem value="Count">Count</SelectItem>
            <SelectItem value="Min">Min</SelectItem>
            <SelectItem value="Max">Max</SelectItem>
            <SelectItem value="Average">Average</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={yField} onValueChange={setYField}>
        <SelectTrigger className="w-[120px]">
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
    </div>
  )

  const onGenerateClick = () => {
    dispatch({
      type: ViewState.Canva,
      payload: {
        chartType: ChartType.Pie,
        xField,
        yField,
        yTransform: transformFunction === 'None' ? undefined : transformFunction as YTransform,
      },
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Label htmlFor="name-field">Split the pie by: </Label>
        {xSelect}
      </div>
      <div className="flex justify-between">
        <Label htmlFor="data-field">Size of slice is: </Label>
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

export { PieChartSettings }
