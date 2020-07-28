export interface queryInput {
    id: string;
    type: string;
    subType: string;
    status: string;
    operationName: string;
    operator?: string;
    value?: string;
    lookbackHour?: number;
    lookbackMinute?: number;
}

export interface queryGroupLinkedList {
    [id: string] : {
        inputValues: queryInput[];
        parentId: string;
        childIds: string[];
        isAnd?: boolean;
    }
}

export interface queryString {
    [id: string] : string
}