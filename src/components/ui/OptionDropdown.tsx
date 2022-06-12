import Popover, {PopoverOrigin} from '@mui/material/Popover/Popover';
import React, {FC} from 'react';
import styled from "styled-components";
import {ModalProps} from "@mui/material/Modal";
import {Typography, useTheme} from '@mui/material';

interface IProps {
    id?: string,
    open?: any,
    anchorEl?: null | Element | ((element: Element) => Element),
    onClose?: ModalProps['onClose'],
    anchorOrigin?: PopoverOrigin,
    options: {
        icon?: JSX.Element,
        text: string,
        onClick: () => void
    }[]
}

const DropdownWrapper = styled.div`
    border-radius: 16px;
    padding 5px 0;
    background: ${({theme}) => theme.palette.common.white}
`;
const Option = styled.div`
    cursor: pointer;
    padding: 7px 15px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    
    &:hover {
        background: ${({theme}) => theme.palette.grey[200]}
    }
`;

const OptionDropdown: FC<IProps> = ({
                                        options,
                                        open,
                                        anchorOrigin,
                                        anchorEl,
                                        onClose,
                                        id,
}: IProps) => {
    const theme = useTheme();
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
        >
            <DropdownWrapper theme={theme}>
                {
                    options.map(option => <Option theme={theme} key={option.text} onClick={option.onClick}>
                        {option.icon ? option.icon : null}
                        <Typography>{option.text}</Typography>
                    </Option>)
                }
            </DropdownWrapper>
        </Popover>
    );
};

export default OptionDropdown;