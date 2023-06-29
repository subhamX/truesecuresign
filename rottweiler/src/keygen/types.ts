declare module 'node-signpdf' {
    export function plainAddPlaceholder(options: {
        pdfBuffer: Buffer,
        reason?: string,
        signatureLength?: number
    }): Buffer;

    function sign(pdfBuffer: Buffer,p12Buffer: Buffer, args: any): Buffer;

    const _exported: { sign: typeof sign };
    export default _exported;
}
