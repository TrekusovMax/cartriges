import { AddPrinterImage } from '@/shared/ui/add-printer-image'
import { PrinterCardImg } from '@/shared/ui/printer-card-img'

export const UsePrinterImage = ({
  showImage,
  imgUrl,
  onClick,
  showUploadList,
  setShowUploadList,
  onChange,
}: {
  showImage: boolean
  imgUrl: string
  onClick: () => void

  showUploadList: boolean
  setShowUploadList: () => boolean
  onChange: () => void
}): React.ReactNode => {
  return !showImage ? (
    <AddPrinterImage
      onChange={onChange}
      setShowUploadList={setShowUploadList}
      showUploadList={showUploadList}
    />
  ) : (
    <PrinterCardImg imgUrl={imgUrl} onClick={onClick} />
  )
}
