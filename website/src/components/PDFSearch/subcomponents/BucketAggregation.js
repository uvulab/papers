import React from 'react'
import _get from 'lodash/get'
import { Scrollbar } from 'react-scrollbars-custom'
import { Card, Checkbox, Grid, List } from 'semantic-ui-react'

const BucketAggregationContainer2 = ({ valuesCmp }) => {
  const Wrapper = ({ children }) =>
    valuesCmp.length > 5 ? (
      <Scrollbar style={{ height: 109 }}>{children}</Scrollbar>
    ) : (
      <>{children}</>
    )
  return (
    <Wrapper>
      <List>{valuesCmp}</List>
    </Wrapper>
  )
}
// 263 is width of list with scrollbar

export const CustomBucketAggregationContainer = ({ valuesCmp }) => {
  const Wrapper = ({ children }) =>
    valuesCmp.length > 5 ? (
      <Scrollbar style={{ height: 109 }}>{children}</Scrollbar>
    ) : (
      <>{children}</>
    )
  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Wrapper>
            <List>{valuesCmp.slice(0, Math.ceil(valuesCmp.length / 3))}</List>
          </Wrapper>
        </Grid.Column>
        <Grid.Column>
          <Wrapper>
            <List>
              {valuesCmp.slice(
                Math.ceil(valuesCmp.length / 3),
                Math.ceil((2 * valuesCmp.length) / 3)
              )}
            </List>
          </Wrapper>
        </Grid.Column>
        <Grid.Column>
          <Wrapper>
            <List>
              {valuesCmp.slice(
                Math.ceil((2 * valuesCmp.length) / 3),
                valuesCmp.length
              )}
            </List>
          </Wrapper>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export const CustomBucketAggregation = ({ title, containerCmp }) => (
  <Card style={{ width: '100%' }}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
    </Card.Content>
    <Card.Content>{containerCmp}</Card.Content>
  </Card>
)
