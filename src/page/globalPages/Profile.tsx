import React, {useCallback, useState} from 'react';
import PageWrapper from "../../components/page/pageWrapper/PageWrapper";
import {PATH} from "../../engine/enum/Path";
import {
    Avatar,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useAuth} from "../../engine/hooks/useAuth";
import styled from "styled-components";
import DropZone from "../../components/ui/DropZone";
import EditIcon from '@mui/icons-material/Edit';

const ActionWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
`
const Content = styled.div`
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
const ButtonWrapper = styled.div`
    flex: 80%;
`
const EditButtonWrapper = styled.div`
    flex: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Profile = () => {
    const {userInformation} = useAuth()
    const [avatar, setAvatar] = useState<any>({})
    const onDrop = useCallback((file: any) => {
        setAvatar(file?.[0])
    }, [])

    const handleChange = (event: SelectChangeEvent) => {};

    return (
        <PageWrapper backLink={PATH.CONSULTATIONS}>
            <Content>
                <DropZone onDrop={onDrop}>
                    <Avatar sx={{height: 150, width: 150}} alt={userInformation.first_name} src={avatar.preview}/>
                </DropZone>
                <TextField name={'first_name'} fullWidth value={userInformation.first_name} size={'medium'} id="outlined-basic" label="First name"
                           variant="outlined"/>
                <TextField name={'last_name'} fullWidth value={userInformation.last_name} size={'medium'} id="outlined-basic" label="Last name"
                           variant="outlined"/>
                <TextField disabled fullWidth value={userInformation.email} size={'medium'} id="outlined-basic" label="Email"
                           variant="outlined"/>
                <TextField fullWidth value={userInformation.phone} size={'medium'} id="outlined-basic" label="Phone"
                           variant="outlined"/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userInformation.gender}
                        label="Gender"
                        onChange={handleChange}
                    >
                        <MenuItem value={'man'}>Чоловік</MenuItem>
                        <MenuItem value={'woman'}>Жінка</MenuItem>
                    </Select>
                </FormControl>
                <ActionWrapper>
                    <ButtonWrapper>
                        <Button fullWidth variant={'contained'} size={'large'}>Змінти</Button>
                    </ButtonWrapper>
                </ActionWrapper>
            </Content>
        </PageWrapper>
    );
};

export default Profile;