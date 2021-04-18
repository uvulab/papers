import React from 'react'
import { Icon, Pagination } from 'semantic-ui-react'

export const CustomPaginator = ({ activePage, onPageChange, totalPages }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Pagination
        activePage={activePage}
        ellipsisItem={{
          content: <Icon name='ellipsis horizontal' />,
          icon: true
        }}
        firstItem={null}
        lastItem={null}
        prevItem={{ content: <Icon name='angle left' />, icon: true }}
        nextItem={{ content: <Icon name='angle right' />, icon: true }}
        totalPages={totalPages}
        onPageChange={(event, { activePage }) => onPageChange(activePage)}
        boundaryRange={1}
        siblingRange={1}
        style={{ margin: '10px 0' }}
      />
    </div>
  )
}
