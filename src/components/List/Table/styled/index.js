import styled from 'styled-components';
import { Table, TableCell } from '@material-ui/core';


export const StyledRoot = styled.div`
    overflow: hidden;
    margin: 2px;
`;

export const StyledCard = styled.div`
    height: calc(100vh - 280px);
    min-width: 100vh - 280px);
    border-bottom: 1px solid #8dbcd8;
    ${props => props.is_pagination ?
        'overflow: auto;'
        :
        'overflow-x: auto; overflow-y: visible;'
    }
`;

export const StyledTable = styled(Table)`
    min-width: 100vh!important;
`;

export const StyledTableCell = styled(TableCell)`
    font-weight: bold!important;
    font-size: 11px!important;
    color: #595d6e!important;
`;

export const StyledRowTableCell = styled(TableCell)`
    font-size: 11px!important;
    color: #595d6e!important;
`;

const status = `
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 9px;
    font-weight: bold;
    padding: 3px;
    border-radius: 4px;
    box-shadow: 4px 4px 10px -8px rgba(0,0,0,0.75);
`;

export const StyledStatusPedding = styled.div`
    ${status}
    background-color: #ff9800;
`;

export const StyledStatusInProgress = styled.div`
    ${status}
    background-color: #3f51b5;
`; 

export const StyledStatusDisregarded = styled.div`
    ${status}
    background-color: #ff1a6a;
`; 

export const StyledStatusCompleted = styled.div`
    ${status}
    background-color: #4caf50;
`; 