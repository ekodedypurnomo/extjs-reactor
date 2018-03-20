import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { launch } from '@extjs/reactor';
import App from './AppSegmentedButton'

let viewport;

const render = (Component, target) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    target
  )
}

console.log(require('react').version)
launch(target => render(App, viewport = target));

if (module.hot) {
  module.hot.accept('./AppSegmentedButton', () => render(App, viewport));
}