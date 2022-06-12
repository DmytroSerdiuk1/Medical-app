export interface IAction<PayloadData> {
    type: string,
    payload: PayloadData
}