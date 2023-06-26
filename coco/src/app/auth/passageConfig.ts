export const passageConfig = {
    appID: process.env.NEXT_PUBLIC_PASSAGE_APP_ID as string,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "HEADER" as any,
};
