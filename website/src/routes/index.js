import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CoreLayout from '../layouts/CoreLayout'
import Papers from './Papers'
import LoginRoute from './Login'
import NotFoundRoute from './NotFound'

export default function createRoutes(store) {
  return (
    <CoreLayout>
      <Switch>
        <Route exact path={Papers.path} component={Papers.component} />
        {[LoginRoute].map((settings, index) => (
          <Route key={`Route-${index}`} {...settings} />
        ))}
        <Route component={NotFoundRoute.component} />
      </Switch>
    </CoreLayout>
  )
}
