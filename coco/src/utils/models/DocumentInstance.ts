
export type DocumentInstance = {
    name: string;
    documentPathInStorageBucket: string;
    createdAt: Date;
    ownerEmail: string;
    hasBeenSigned: boolean; // if true, then the document is locked and cannot be edited
};

