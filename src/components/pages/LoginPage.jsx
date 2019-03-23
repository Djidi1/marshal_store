import React from 'react';
import {
    Page,
    List,
    ListInput,
    Button,
    BlockFooter,
    Link,
    LoginScreenTitle
} from 'framework7-react';

export default () => (
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
                <Button fill href={"/"}>Войти</Button>
            </BlockFooter>
        </List>

        <List>
            <BlockFooter>
                <p><Link>Зарегистрироваться</Link></p>
                <p>Для восстановления пароля нажмите <Link>ссылку</Link></p>
            </BlockFooter>
        </List>
    </Page>
);