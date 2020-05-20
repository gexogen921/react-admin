import React from 'react';
import style from './link.scss';
import LaunchIcon from '@material-ui/icons/Launch';

const MyUrlField = ({ record = {}, source }) =>
    <a href={record[source]} className={style.link}>
    {record[source]}
        <LaunchIcon className={style.icon} />
    </a>

export default MyUrlField;