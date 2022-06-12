import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageWrapper from '../../components/page/pageWrapper/PageWrapper';
import {useDispatch, useSelector} from "react-redux";
import {getConsultation, sendAppointment, viewCalendar} from "../../engine/store/consultation/consultationAction";
import {useParams} from "react-router-dom";
import {IReducerInterface} from "../../engine/store/reducerInterface";
import {IConsultation, ISchedule} from "../../engine/store/consultation/consultationReducerInterface";
import {PATH} from '../../engine/enum/Path';
import {Button, Tab, Tabs, TextField, Typography} from "@mui/material";
import styled from "styled-components";
import {Calendar, momentLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContentWrapper = styled.div`
    display: flex;
    padding: 0 15px;
`
const RightPanel = styled.div`
    width: 40%;
    padding: 0 15px;
`
const TimesField = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`
const StyledTabs = styled(Tabs)`
   margin: 10px 0;
`

const Record = () => {
    const [times, setTimes] = useState<any>()
    const [description, setDescription] = useState<string>('')
    const {consultationsId} = useParams<any>();
    const localizer: any = momentLocalizer(moment)
    const consultation = useSelector((state: IReducerInterface): IConsultation => state.consultation.consultation)
    const doctorId = useSelector((state: IReducerInterface) => state.consultation.currentDoctorId)
    const calendarData = useSelector((state: IReducerInterface): ISchedule[] => state.consultation.consultationCalendar)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getConsultation(consultationsId))
    }, [consultationsId, dispatch])

    const handleClickEvent = useCallback((day: any) => {
        setTimes(day)
    }, [])
    const handleSetDoctorId = useCallback((event: React.SyntheticEvent, id: number) => {
        dispatch(viewCalendar(id))
    }, [dispatch])
    const handleChangeDesc = useCallback((e: any) => {
        setDescription(e.target.value)
    }, [])

    const data = useMemo(() => {
        if (consultation?.duration_minutes) {
            const min = consultation?.duration_minutes
            return calendarData.map(item => (item.receptions.map(time => (time.is_available ? {
                id: time.id,
                title: `${consultation.doctors?.[0].first_name} ${consultation.doctors?.[0].last_name}`,
                start: new Date(`${item.day} ${time.time}`),
                end: new Date(new Date(`${item.day} ${time.time}`).getTime() + min * 60000),
                resource: {
                    id: time.id
                }
            } : {})))).flat()
        }
    }, [calendarData, consultation.doctors, consultation?.duration_minutes])

    return (
        <PageWrapper backLink={PATH.CONSULTATIONS}>
            <Typography style={{padding: 15}} variant={'h3'}>
                {
                    consultation.title
                }
            </Typography>
            <ContentWrapper>
                <Calendar
                    startAccessor={'start'}
                    endAccessor={'end'}
                    events={data}
                    onSelectEvent={handleClickEvent}
                    defaultDate={new Date()}
                    style={{height: '80vh', width: '60vw'}}
                    localizer={localizer}
                    defaultView={'week'}
                />
                <RightPanel>
                    {
                        times ? <>
                            <TimesField>
                                <CalendarMonthIcon/>
                                <Typography variant={'h4'}>
                                    {moment(times?.start).format('MMMM DD ddd YYYY')}
                                </Typography>
                            </TimesField>
                            <TimesField>
                                <AccessTimeIcon/>
                                <Typography variant={'h4'}>
                                    {moment(times?.start).format('HH:mm')} по {moment(times?.end).format('HH:mm')}
                                </Typography>
                            </TimesField>
                        </> : null
                    }
                    <StyledTabs value={doctorId} onChange={handleSetDoctorId}>
                        {
                            consultation.doctors?.map(doctor => (
                                <Tab key={doctor.id} value={doctor.id}
                                     label={`${doctor.first_name} ${doctor.last_name}`}/>
                            ))
                        }
                    </StyledTabs>
                    <TextField
                        id="outlined-multiline-static"
                        label="Опис"
                        multiline
                        value={description}
                        fullWidth
                        onChange={handleChangeDesc}
                        color={'primary'}
                        sx={{marginBottom: 1}}
                        rows={4}
                    />
                    <Button variant={'outlined'} disabled={!times} onClick={() => {
                        dispatch(sendAppointment({
                            description: '',
                            day_appointment: moment(times.start).format('YYYY-MM-DD'),
                            consultation: consultation.id,
                            doctor: consultation?.doctors?.[0].id,
                            doctor_schedule: times?.resource?.id
                        }))
                    }} fullWidth={true}>Записатися</Button>
                </RightPanel>
            </ContentWrapper>
        </PageWrapper>
    );
};

export default Record;