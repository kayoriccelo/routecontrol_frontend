import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { Message } from '../../components';
import { updateDimensions } from '../../commons/useful';
import Form from './Form';
import { StyledContainer, StyledImageBanner } from './styled';


const SignIn = () => {
    const history = useHistory();
    const [screen, setScreen] = useState({ width: 0 });
    
    useEffect(() => {
        updateDimensions(setScreen)();
        window.addEventListener('resize', updateDimensions(setScreen));

        return () => window.removeEventListener('resize', updateDimensions(setScreen));
    }, []);

    return (
        <StyledContainer>
            <StyledImageBanner
                screen={screen}
                src={require('../../assets/images/banner.jpg')}
                alt="banner"
            />
            
            <Form
                screen={screen}
                history={history}
            />

            <Message />
        </StyledContainer>
    );
};


export default SignIn;
