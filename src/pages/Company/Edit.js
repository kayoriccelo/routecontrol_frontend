import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import LocationCityIcon from '@material-ui/icons/LocationCity';

import { FormCustom, Title } from '../../components';
import Data from './Data';
import { load, save, setTitle } from './store/ducks';


const EditCompany = ({ load, save, setTitle }) => {
    const history = useHistory();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        setTitle({
            title: <Title iconTitle={LocationCityIcon} title="Empresa" />
        });

        return () => setTitle({ title: '', subTitle: '' });
    }, [setTitle]);

    useEffect(() => {
        !company && load()
            .then(res => company !== res && setCompany(res));

        company && setTitle({ subTitle: `${company.cnpj} - ${company.business_name}` });
    }, [company, load, setTitle]);

    const handleSubmit = () => save(company, history);

    const handleCancel = () => history.push('dashboard');

    const handleChange = name => event => {
        name === 'business_name' && setTitle({
            subTitle: `${company.cnpj} - ${event.target.value}`
        });

        if (['cnpj', 'phone'].indexOf(name) > -1) {
            event.target.value = event.target.value.replace(/\D/g, '');
        };

        setCompany({ 
            ...company, 
            [name]: event.target.value 
        });
    };

    return (
        company && <FormCustom
            object={company}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            setSubTitle={company => setTitle({
                subTitle: `${company.cnpj} - ${company.business_name}`
            })}
        >
            <Data
                company={company}
                handleChange={handleChange}
            />
        </FormCustom>
    );
};


const mapStateToProps = ({ company }) => ({ instance: company.instance });
const mapDispatchToProps = dispatch => bindActionCreators({ load, save, setTitle }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EditCompany);
