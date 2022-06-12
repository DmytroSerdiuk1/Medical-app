import { IAppReducerInterface } from "./app/appReducerInterface";
import {IConsultationReducerInterface} from "./consultation/consultationReducerInterface";

export interface IReducerInterface {
    app: IAppReducerInterface,
    consultation: IConsultationReducerInterface
}