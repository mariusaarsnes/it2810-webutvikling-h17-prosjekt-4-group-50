export interface SearchHistoryResponse {
    _id: string;
    type: string;
    type_id: string;
    typeData; //Not defining any explicit data, since it can be one of three classes
    date: string;
}
