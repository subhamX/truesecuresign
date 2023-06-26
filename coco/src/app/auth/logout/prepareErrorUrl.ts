
export const prepareErrorUrl = (error: Error, requestUrl: string) => {
    const errorMessageBase64 = Buffer.from(error.message).toString('base64');
    return new URL(`/error?message=${errorMessageBase64}`, requestUrl);
};
