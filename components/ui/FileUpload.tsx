'use client'

import { useContext, useState } from 'react'
import Papa from 'papaparse'
import { Button } from '@/components/ui/button'
import { FilePreview } from './FilePreview'
import { DataContext, ViewContext, ViewState } from '@/app/page'
import { ProgressSteps } from './ProgressSteps'

const FileUpload = () => {
  const [fileName, setFileName] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const viewContext = useContext(ViewContext)
  if (!viewContext) {
    throw new Error('ViewContext is not provided')
  }
  const { dispatch } = viewContext
  const dataContext = useContext(DataContext)
  if (!dataContext) {
    throw new Error('DataContext is not provided')
  }

  const { data, setData } = dataContext

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => {
    setDragActive(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    const file = event.dataTransfer.files?.[0]
    if (file) {
      setFileName(file.name)
      parseCsv(file)
    }
  }

  const parseCsv = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        const rows = result.data as object[]
        setData(rows)
      },
      header: true,
    })
  }

  const onDelete = () => {
    setFileName('')
    setData([])
  }

  const onNextClick = () => {
    dispatch({ type: ViewState.ChartSelector })
  }

  return (
  /* Drag-and-Drop File Upload */
    <div className="w-full flex flex-col items-center">
      <ProgressSteps currentView={ViewState.FileUpload} />
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          Bring Your Data to Life
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Drop your CSV and transform raw numbers into beautiful, interactive stories in just a few clicks.
        </p>
      </div>
      <div
        className={`border-2  rounded-lg p-10 w-full max-w-md text-center 
        ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        ${fileName ? 'border-solid' : 'border-dashed'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {fileName
          ? (
              <>
                <p className="text-sm text-gray-600 mt-2 mb-2">
                  Uploaded file:
                  {' '}
                  {fileName}
                </p>
                <div className="flex gap-2 justify-center">
                  {data.length > 0 && <FilePreview previewData={data.slice(0, 5)} fileName={fileName} />}
                  <Button className="cursor-pointer" variant="outline" onClick={onDelete}>Delete</Button>
                </div>
              </>
            )
          : (
              <>
                <p className="text-sm text-gray-600">
                  Drag and drop your CSV file here, or
                  {' '}
                  <label
                    htmlFor="file-upload"
                    className="text-blue-600 cursor-pointer underline"
                  >
                    browse
                  </label>
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
      </div>
      <div className="w-full max-w-md flex justify-end mt-4"><Button disabled={!fileName} className="bg-[#2a752a]" onClick={onNextClick}>{'Next ->'}</Button></div>
    </div>
  )
}

export { FileUpload }
