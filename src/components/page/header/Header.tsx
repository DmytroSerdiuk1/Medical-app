import React, {FC, useCallback} from 'react';
import styled from "styled-components";
import {Avatar, IconButton, Typography, useTheme} from "@mui/material";
import {useAuth} from "../../../engine/hooks/useAuth";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OptionDropdown from "../../ui/OptionDropdown";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut} from "../../../engine/store/app/appAction";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const HeaderWrapper = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    background: ${({theme}) => theme.palette.common.white};
    box-shadow: 0px 11px 21px 5px rgba(0,0,0,0.19);
    padding: 20px;
    justify-content: space-between;
`
const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`
const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`

interface IProps {
    backLink?: string,
}

const Header: FC<IProps> = ({backLink}) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const {userInformation} = useAuth()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <HeaderWrapper theme={theme}>
           <LogoWrapper>
               {backLink ? <Link to={backLink}>
                   <IconButton>
                       <KeyboardBackspaceIcon/>
                   </IconButton>
               </Link> : null}

                   <Typography variant={'h5'}>
                       <b>Medical</b> records
                   </Typography>
           </LogoWrapper>
            <ActionWrapper>
                <Avatar alt={userInformation.first_name} src={userInformation.avatar}/>
                <IconButton aria-describedby={id} onClick={handleClick}>
                    <MoreHorizIcon/>
                </IconButton>
            </ActionWrapper>
            <OptionDropdown
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                options={[
                    {
                        onClick: () => {
                            history.push('/my-profile')
                        },
                        icon: <PersonIcon/>,
                        text: 'Мій профіль'
                    }, {
                        onClick: () => {
                            dispatch(logOut())
                            history.push('/login')
                        },
                        icon: <ExitToAppIcon/>,
                        text: 'Вийти'
                    },
                ]}/>
        </HeaderWrapper>
    );
};

export default Header;