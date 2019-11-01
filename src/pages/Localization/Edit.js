import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { FormCustom } from '../../components';
import Data from './Data';
import { load, save, setTitle } from './store/ducks';


const Edit = ({ instance, load, save, setTitle, id, history }) => {
    const [localization, setLocalization] = useState(null);

    useEffect(() => {
        setTitle({ title: 'Localização' });

        return () => setTitle({ title: '', subTitle: '' });
    }, [setTitle]);

    useEffect(() => {
        !localization && load(id)
            .then(res => localization !== res && setLocalization(res));

        localization && setTitle({ subTitle: `${localization.code} - ${localization.description}` });
    }, [localization, id, load, setTitle]);

    const handleSubmit = () => save(localization, history);

    const handleCancel = () => history.push('/registration/localization');

    const handleChange = name => event => {
        name === 'description' && setTitle({
            subTitle: `${localization.code} - ${event.target.value}`
        });

        setLocalization({
            ...localization, [name]: event.target.value
        });
    };

    return (
        localization && <FormCustom
            object={localization}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            setSubTitle={localization => setTitle({
                subTitle: `${localization.code} - ${localization.description}`
            })}
        >
            <Data
                localization={localization}
                handleChange={handleChange}
            />
        </FormCustom>
    );
};


const mapStateToProps = ({ localization }) => ({ instance: localization.instance });
const mapDispatchToProps = dispatch => bindActionCreators({ load, save, setTitle }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
