import React from 'react'
import { Responsive } from 'semantic-ui-react'
import PDFSearch from 'components/PDFSearch'
import PDFViewer from 'components/PDFViewer'
import SplitPane from 'react-split-pane'
import Pane from 'react-split-pane/lib/Pane'
import './PaperPage.css'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

function Paper() {
  const setDragging = isDragging => {
    const pdf = document.getElementById('pdf-iframe')
    if (pdf) pdf.style.pointerEvents = isDragging ? 'none' : 'all'
  }
  return (
    <Responsive
      getWidth={getWidth}
      minWidth={Responsive.onlyTablet.minWidth}
      className='responsive'
    >
      <SplitPane
        split='vertical'
        onResizeStart={() => setDragging(true)}
        onResizeEnd={() => setDragging(false)}
        className='resizer vertical'
      >
        <Pane minSize='442px' maxSize='50%' initialSize='33%'>
          <PDFSearch />
        </Pane>
        <SplitPane
          split='horizontal'
          onResizeStart={() => setDragging(true)}
          onResizeEnd={() => setDragging(false)}
        >
          <PDFViewer />
          <Pane
            className='pdf-description'
            minSize='25%'
            maxSize='50%'
            initialSize='33%'
          >
            testing
          </Pane>
        </SplitPane>
      </SplitPane>
    </Responsive>
  )
}

export default Paper
