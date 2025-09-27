import { Label } from '@/components/ui/label'

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
import { ViewContext, ViewState } from '@/app/page'

const LineChartSettings = ({ fields }: { fields: string[] }) => {
  const { dispatch } = useContext(ViewContext) || {}
  if (!dispatch) {
    throw new Error('ViewContext is not provided')
  }
  const select = (
    <Select>
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
    dispatch({ type: ViewState.Canva })
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <Label htmlFor="x-axis">Select the time field: </Label>
        {select}
      </div>
      <div className="flex justify-between">
        <Label htmlFor="y-axis">Select the data to plot: </Label>
        {select}
      </div>
      <div className="flex justify-end">
        <Button className="bg-teal-600" onClick={onGenerateClick}>All set, generate!</Button>
      </div>
    </div>
  )
}

export { LineChartSettings }
