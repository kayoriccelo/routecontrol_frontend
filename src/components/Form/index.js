import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

import useStyles from './styles';


export default function FormCustom(props) {
    const { card, cardContent, actions, button } = useStyles();

    const { object, setSubTitle } = props;

    useEffect(() => {
        !object && setSubTitle(object);
    }, [object, setSubTitle]);

    return (
        object &&
        <div className={card}>
            <div className={cardContent}>
                {props.children}
            </div>
            <div className={actions}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={button}
                    onClick={props.handleSubmit}
                >
                    Salvar
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    className={button}
                    onClick={props.handleCancel}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    );
};
