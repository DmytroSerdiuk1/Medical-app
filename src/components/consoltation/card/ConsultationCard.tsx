import React, {FC} from 'react';
import styled from "styled-components";
import {IConsultation} from "../../../engine/store/consultation/consultationReducerInterface";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {Button, Typography} from "@mui/material";
import moment from "moment";
import {Link} from 'react-router-dom';

const CardWrapper = styled.div`
    width: 280px;
    box-shadow: -2px 4px 15px 3px rgba(0,0,0,0.24);
    padding: 20px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 10px;
`;
const CardHeader = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;
const CardMark = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;
const TimeWrapper = styled.div`
`;
const ActionWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #000;
    padding-top: 10px; 
    margin-top: 20px;s
`;
const TimeItems = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
`;
const CardImage = styled.img`
    width: 90px;
    height: 90px;
`;
const TimeLabel = styled(Typography)`
    display: inline-block;
    padding: 5px;
    border: 1px solid #000;
    border-radius: 5px;
`;

interface IProps {
    data: IConsultation
}

const ConsultationCard: FC<IProps> = ({data}) => {
    return (
        <CardWrapper>
            <CardHeader>
                <CardImage src={data.image} alt={data.title}/>
                <Typography>
                    {data.title}
                </Typography>
            </CardHeader>
            <CardMark>
                <AccessTimeIcon/>
                <Typography>
                    {data.duration_minutes}хв
                </Typography>
            </CardMark>
            <Typography>
                {data.description}
            </Typography>
            <TimeWrapper>
                <Typography>
                    Найближчий прийом {moment(data?.available_time?.day).locale('fr').format('MMMM DD')}
                </Typography>
                <TimeItems>
                    {
                        data?.available_time?.receptions?.map(time => (
                            <TimeLabel key={time}>
                                <Typography key={time}>
                                    {time}
                                </Typography>
                            </TimeLabel>
                        ))
                    }
                </TimeItems>
            </TimeWrapper>
            <ActionWrapper>
                <Link style={{textDecoration: 'none'}} to={`/consultations/${data.id}/record`}>
                    <Button variant="contained">
                        Записатися
                    </Button>
                </Link>
            </ActionWrapper>
        </CardWrapper>
    );
};

export default ConsultationCard;