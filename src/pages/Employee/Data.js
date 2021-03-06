import React from 'react';
import { Grid } from '@material-ui/core';

import { maskCpf, maskPhone } from '../../commons/useful';
import { InputText } from '../../components';


export default function Data({ employee, handleChange }) {
    return (
        <Grid container id="common">
            <InputText
                label="Cpf"
                columns={{ md: 4, xs: 12 }}
                maxLength="14"
                value={maskCpf(employee.cpf)}
                handleChange={handleChange('cpf')}
            />

            <InputText
                label="Nome"
                columns={{ md: 8, xs: 12 }}
                maxLength="140"
                value={employee.name}
                handleChange={handleChange('name')}
            />

            <InputText
                label="Email"
                columns={{ md: 8, xs: 12 }}
                maxLength="140"
                value={employee.email}
                handleChange={handleChange('email')}
            />

            <InputText
                label="Telefone"
                columns={{ md: 4, xs: 12 }}
                maxLength="11"
                value={maskPhone(employee.phone)}
                handleChange={handleChange('phone')}
            />
        </Grid>
    );
};
