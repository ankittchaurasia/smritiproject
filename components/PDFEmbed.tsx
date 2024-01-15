import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Document, Page } from 'react-pdf'

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const pdfURL = "https://smriti.co/ielts-writing-checker/assets/assets/YOUR_IELTS_WRITING_BAND.pdf"

export default function PDFEmbed(){
return <Document  file={pdfURL} loading="Loading...">
    <Page pageNumber={1} width={window?.innerWidth * 0.9 || undefined} />
</Document>
}