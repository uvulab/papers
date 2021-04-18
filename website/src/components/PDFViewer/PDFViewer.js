import React from 'react'
import { Embed, Placeholder } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPaperId, selectPaperLoading } from 'store/selectors'
import { setPaperLoading } from 'store/actions'
import './PDFViewer.css'

const PDF_URL =
  'https://docs.google.com/gview?embedded=true&url=https://drive.google.com/uc?id='

function PDFViewer() {
  const paperId = useSelector(selectPaperId)
  const paperLoading = useSelector(selectPaperLoading)
  const dispatch = useDispatch()
  const paperIsLoading = paperLoading => dispatch(setPaperLoading(paperLoading))
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {paperLoading && (
        <Placeholder className='pdf-placeholder'>
          <Placeholder.Image />
        </Placeholder>
      )}
      {true && (
        <Embed
          active={true}
          iframe={{
            title: paperId,
            frameBorder: '0',
            src: PDF_URL + paperId,
            onLoad: () => paperIsLoading(false),
            id: 'pdf-iframe'
          }}
          source='youtube'
          style={{ height: '100%', width: '100%' }}
        />
      )}
    </div>
  )
}

export default PDFViewer
