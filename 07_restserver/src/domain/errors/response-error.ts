export class ResponseError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) { super() }
}