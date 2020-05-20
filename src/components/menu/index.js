import React, { createElement } from 'react';
import { useSelector,  } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { useLogout, useNotify, MenuItemLink, getResources } from 'react-admin';
import { withRouter } from 'react-router-dom';
import LabelIcon from '@material-ui/icons/Assessment';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';


const Menu = ({ dispatch, onMenuClick, logout }) => {
    const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const resources = useSelector(getResources);
    const signout = useLogout();
    const notify = useNotify();
    const submit = (e) => {
        signout()
            .catch(() => notify('You are logged out'));
    };
    return (
        <div>
            {resources.map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={(resource.options && resource.options.label) || resource.name}
                    leftIcon={createElement(resource.icon)}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                />
            ))}
            <MenuItemLink
                to="/charts"
                primaryText="Charts"
                leftIcon={<LabelIcon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
            />
              <MenuItemLink
                to="/logout"
                primaryText="Logout"
                leftIcon={<ExitIcon />}
                onClick={submit}
                sidebarIsOpen={open}
        />
            {isXSmall && logout}
        </div>
    );
}

export default withRouter(Menu);
