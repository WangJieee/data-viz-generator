import { ViewState } from '@/app/page'

// Progress Steps Component
const ProgressSteps = ({ currentView }: { currentView: ViewState }) => {
  const steps = [
    { key: ViewState.FileUpload, label: 'Upload File', number: 1 },
    { key: ViewState.ChartSelector, label: 'Select Chart', number: 2 },
    { key: ViewState.Canva, label: 'Refine Chart', number: 3 },
  ]

  // const getStepStatus = (stepKey: ViewState) => {
  //   const currentIndex = steps.findIndex(step => step.key === currentView)
  //   const stepIndex = steps.findIndex(step => step.key === stepKey)

  //   if (stepIndex <= currentIndex) {
  //     return 'active' // Completed or current
  //   }
  //   return 'inactive'
  // }

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.key} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm
                   bg-[#6B7B7A]`}
              >
                {step.number}
              </div>
              <div className="ml-3">
                <p
                  className="text-sm font-medium text-[#6B7B7A]"
                >
                  {step.label}
                </p>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className="h-1 rounded bg-[#6B7B7A]"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export { ProgressSteps }
