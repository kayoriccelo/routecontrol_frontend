import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from "react-router-dom";
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

import { SearchCustom, TableCustom, Title } from '../../components';
import { maskCnpj } from '../../commons/useful';
import { getList, remove, setTitle } from './store/ducks';


export const List = props => {
    const history = useHistory();
    const { data, page, pageSize } = props;
    const { getList, remove, setTitle } = props;
    
    const columns = [
        { field: 'cnpj', label: 'CNPJ', is_edit: true, mask: maskCnpj },
        { field: 'business_name', label: 'Razão social' },
        { field: 'actions', label: 'Ações' }
    ];
    let timer = null;
    let search = '';

    useEffect(() => {
        getList(page, pageSize);
    }, [page, pageSize, getList]);

    useEffect(() => {
        setTitle({
            title: <Title iconTitle={EmojiTransportationIcon} title="Listagem de Clientes" />
        });

        return () => {
            setTitle({ title: '', subTitle: '' });
            clearTimeout(timer);
        };
    }, [timer, setTitle]);

    const onSearch = event => {
        clearTimeout(timer);

        search = event.target.value;
        timer = setTimeout(() => getList(page, pageSize, search), 1500);
    };

    const clickAdd = () => history.push('/registration/client/new');

    const clickDelete = id => {
        return (
            <IconButton size="small" onClick={() => remove(id, 0, pageSize)}>
                <DeleteIcon fontSize="small" color="secondary" />
            </IconButton>
        )
    };

    return (
        <>
            <SearchCustom
                onSearch={onSearch}
                clickAdd={clickAdd}
            />
            <TableCustom
                columns={columns}
                data={data}
                actions={[
                    { action: clickDelete, method: 'delete' }
                ]}
                path='/registration/client'
            />
        </>
    )
};


const mapStateToProps = ({ client, pagination }) => ({
    data: client.data,
    page: pagination.page,
    pageSize: pagination.pageSize
});
const mapDispatchToProps = dispatch => bindActionCreators({ getList, remove, setTitle }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(List);
