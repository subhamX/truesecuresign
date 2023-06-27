
export type DocumentInstance = {
    name: string;
    documentPathInStorageBucket: string;
    createdAt: Date;
    ownerId: string;
    hasBeenSigned: boolean; // if true, then the document is locked and cannot be edited
    signedAt?: Date;
    signedDocumentPathInStorageBucket?: string;
};

