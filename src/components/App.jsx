import React from 'react';
import {
  App,
  Panel,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  Button,
  BlockFooter
} from 'framework7-react';

import routes from '../routes';

export default function (props) {

  const params = {
    themeDark: false,
    mainColor: 'red'
  };

  // Framework7 parameters here
  const f7params = {
    id: 'ru.bhapp.marshal', // App bundle ID
    name: 'marshal', // App name
    theme: 'md', // Automatic theme detection
    // App routes
    routes,
  };

  return (
    <App params={f7params} themeDark={params.themeDark} color={params.mainColor}>
      {/* Statusbar */}
      <Statusbar />

      {/* Left Panel */}
      <Panel left cover themeDark>
        <View url="/panel-left/" />
      </Panel>

      {/* Right Panel */}
      <Panel right reveal themeDark>
        <View url="/panel-right/"/>
      </Panel>

      {/* Main View */}
      <View id="main-view" url="/" main className="safe-areas"/>

      {/* Popup */}
      <Popup id="popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</Block>
          </Page>
        </View>
      </Popup>

      {/* Login Screen */}
      <LoginScreen id="login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Войти</LoginScreenTitle>
            <List form>
              <ListInput
                label="Email"
                name="username"
                placeholder="Email"
                type="email"
              />
              <ListInput
                label="Password"
                name="password"
                placeholder="Password"
                type="password"
              />

                <BlockFooter>
                    <Button fill loginScreenClose>Войти</Button>
                </BlockFooter>
            </List>

            <List>
                <BlockFooter>
                  <p><Link>Зарегистрироваться</Link></p>
                  <p>Для восстановления пароля нажмите <Link>ссылку</Link></p>
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>
    </App>
  );
};
