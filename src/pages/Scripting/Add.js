import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import MapIcon from '@material-ui/icons/Map';

import { FormCustom, Title } from '../../components';
import Data from './Data';
import { createInstance, save, setTitle } from './store/ducks';


const Add = ({ save, setTitle }) => {
    const history = useHistory();
    const [scripting, setScripting] = useState(null);
    const [waypoints, setWaypoints] = useState([]);

    useEffect(() => {
        setTitle({
            title: <Title iconTitle={MapIcon} title="Roteirização" />
        });

        return () => setTitle({ title: '', subTitle: '' });
    }, [setTitle]);

    useEffect(() => setScripting(createInstance()), []);

    const handleSubmit = () => save(scripting, history);

    const handleCancel = () => history.push('/scripting');

    const handleChange = name => event => {
        name === 'description' && setTitle({
            subTitle: `${event.target.value}`
        });

        setScripting({
            ...scripting,
            [name]: event.target.value
        });
    };

    const handleLocalizationChange = value => {
        setWaypoints(
            value.map(item => ({
                location: item.address,
                stopover: true
            }))
        );

        setScripting({
            ...scripting,
            localizations: value
        });
    };

    const handleEmployeeChange = value => {
        setScripting({
            ...scripting,
            employees: value
        });
    };

    return (
        scripting && <FormCustom
            object={scripting}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            setSubTitle={scripting => setTitle({
                subTitle: `${scripting.description}`
            })}
        >
            <Data
                scripting={scripting}
                waypoints={waypoints}
                handleChange={handleChange}
                handleLocalizationChange={handleLocalizationChange}
                handleEmployeeChange={handleEmployeeChange}
            />
        </FormCustom>
    );
};


const mapDispatchToProps = dispatch => bindActionCreators({ save, setTitle }, dispatch);
export default connect(null, mapDispatchToProps)(Add);
