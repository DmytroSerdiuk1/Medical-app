import React, {FC, useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {getConsultations} from "../../engine/store/consultation/consultationAction";
import {IReducerInterface} from "../../engine/store/reducerInterface";
import ConsultationCard from "../../components/consoltation/card/ConsultationCard";
import {IConsultation} from "../../engine/store/consultation/consultationReducerInterface";
import PageWrapper from "../../components/page/pageWrapper/PageWrapper";

const Content = styled.nav`
    display: flex;
    gap: 20px 45px;
    flex-wrap: wrap;
    padding: 20px 20px;
`

interface IProps {
}

const Consultation: FC<IProps> = () => {
    const dispatch = useDispatch()
    const consultations = useSelector((state: IReducerInterface) => state.consultation.consultations)
    useEffect(() => {
        dispatch(getConsultations())
    }, [dispatch])

    return (
        <PageWrapper>
            <Content>
                {
                    consultations.map((consultation: IConsultation) =>
                        <ConsultationCard key={consultation.id} data={consultation}/>
                    )
                }
            </Content>
        </PageWrapper>
    );
};

export default Consultation;