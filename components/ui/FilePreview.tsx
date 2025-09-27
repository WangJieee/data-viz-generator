import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DialogTitle } from '@radix-ui/react-dialog'

type FilePreviewProps = {
  previewData: object[]
  fileName: string
}

const FilePreview = ({ previewData, fileName }: FilePreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Preview</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{`Previewing ${fileName}`}</DialogTitle>
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(previewData[0]).map((header, index) => (
                <TableHead
                  key={index}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export { FilePreview }
