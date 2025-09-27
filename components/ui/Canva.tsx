import { ViewContext, ViewState } from '@/app/page'
import { InteractiveLineChart } from '../charts/InteractiveLineChart'
import { Button } from './button'
import { useContext } from 'react'

const Canva = () => {
  const { dispatch } = useContext(ViewContext) || {}
  if (!dispatch) {
    throw new Error('ViewContext is not provided')
  }

  const onBackClick = () => {
    dispatch({ type: ViewState.ChartSelector })
  }

  return (
    <div className="w-2/3 flex flex-col justify-center">
      <InteractiveLineChart yField="precipitation" xField="date" />
      <div className="w-full flex justify-start mt-4"><Button variant="secondary" onClick={onBackClick}>{'<- Back'}</Button></div>
    </div>
  )
}

export { Canva }
