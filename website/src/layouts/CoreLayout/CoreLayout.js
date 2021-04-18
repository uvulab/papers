import React, { Component } from 'react'
import { RainbowLogo } from 'static/logo'
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Notifications } from 'modules/notification'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, path, authExists, displayName } = this.props
    const { fixed } = this.state

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment inverted textAlign='center' vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item
                  as={Link}
                  to={'/'}
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                >
                  <RainbowLogo device='desktop' />
                </Menu.Item>
                <Menu.Item as={Link} to={'/'} active={path === '/'}>
                  Papers
                </Menu.Item>
                <Menu.Item
                  position='right'
                  style={{ paddingBottom: '.5714em', paddingTop: 0 }}
                >
                  {authExists ? (
                    <div>{displayName}</div>
                  ) : (
                    <Button as={Link} to={'/login'} inverted={!fixed}>
                      Log in
                    </Button>
                  )}
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

class MobileContainer extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children, authExists, displayName, path } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation='push'
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
          width='thin'
        >
          <Menu.Item>
            <RainbowLogo device='mobile' />
          </Menu.Item>
          <Menu.Item as={Link} to={'/'} active={path === '/'}>
            Papers
          </Menu.Item>
          <Menu.Item>
            {authExists ? (
              displayName
            ) : (
              <Button
                size='tiny'
                as={Link}
                to={'/login'}
                active={path === '/login'}
              >
                Log in
              </Button>
            )}
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted textAlign='center' vertical>
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  {authExists ? (
                    displayName
                  ) : (
                    <Button as={Link} to={'/login'} active={path === '/login'}>
                      Log in
                    </Button>
                  )}
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

const CoreLayout = ({ children, ...props }) => (
  <div>
    <DesktopContainer {...props}>{children}</DesktopContainer>
    <MobileContainer {...props}>{children}</MobileContainer>
  </div>
)

export default CoreLayout
