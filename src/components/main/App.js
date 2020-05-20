import React from 'react';
import { Admin, Resource } from 'react-admin';
import { connect } from 'react-redux';
import { UserList, UserEdit} from '../getList';
import {PostList, PostEdit, PostCreate } from '../posList';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import MailIcon from '@material-ui/icons/Mail';
import Dashboard from '../dashboard';
import NotFound from '../not-found';
import Menu from '../menu';
import LoginPage from '../auth/login';

const App = ({ history, dataProvider, authProvider }) => (

    <Admin history={history} menu={Menu} loginPage={LoginPage} catchAll={NotFound} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
        {permissions => [
        // Restrict access to the edit views to admin only
        <Resource name="users" list={UserList} edit={UserEdit} icon={UserIcon} />,
        <Resource name="comments" list={PostList} edit={permissions === 'admin' ? PostEdit : null} icon={MailIcon}/>,
        // Only include the categories resource for superadmin users
        permissions === 'superadmin'
            ? <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
            : null,
    ]}
    </Admin>
);

export default App;
