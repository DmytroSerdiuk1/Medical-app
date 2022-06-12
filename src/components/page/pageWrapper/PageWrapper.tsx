import React, {FC, ReactNode} from 'react';
import Header from "../header/Header";
import styled from "styled-components";

interface IProps {
    children: ReactNode,
    backLink?: string,
}

const Content = styled.div`
    padding-top: 20px;
`;

const PageWrapper: FC<IProps> = ({children,backLink}) => {
    return (
        <div>
            <Header backLink={backLink}/>
            <Content>
                {children}
            </Content>
        </div>
    );
};

export default PageWrapper;