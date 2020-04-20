import {Types} from "../Enum/Types";

export interface IDataType {
    type: Types,
    value: any,
    offset?: number
}