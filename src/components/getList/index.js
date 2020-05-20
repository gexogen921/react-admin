import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { List, Datagrid, TextField, 
    EmailField, ReferenceInput, SelectInput,
    EditButton, SimpleForm,TextInput, Edit, Filter,
    SimpleList } 
    from 'react-admin';

const UserTitle = ({ record }) => {
    return <span>User Id: {record ? `"${record.id}"` : ''}</span>;
};

export const UserList = (props) => {
return (
    
<List filters={<UserFilter />} {...props}>
    <Datagrid>
           <TextField source="id" />
           <TextField source="lastName" />
           <TextField source="firstName" />
           <TextField source="userName" />
           <EmailField source="email" />
           <TextField source="birthdayDate" />
           <TextField source="role" />
           <TextField source="status" />
           <TextField source="avatarId" />
        <EditButton />
    </Datagrid>
</List>
)
};


export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="avatarId" />
            <TextInput source="firstName" />
            <TextInput source="userName" />
            <TextInput source="lastName" />
            <TextInput source="email" />
            <TextInput source="role" />
            <TextInput source="status" />
            <TextInput source="birthdayDate" />
            <TextInput source="createdAt" />
        </SimpleForm>
    </Edit>
);

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="id" reference="users" allowEmpty>
            <SelectInput optionText="lastNname" />
        </ReferenceInput>
    </Filter>
);