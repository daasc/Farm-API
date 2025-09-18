export interface AppError extends Error {
    status?: number;
    
}

export function createError(message: string, status: number = 500): AppError {
    const error = new Error(message) as AppError;
    error.status = status;
    return error;
}

export function handleError(error: unknown): { status: number; message: string } {
    if (typeof error === 'object' && error !== null && 'message' in error) {
        const status = (error as AppError).status || 500;
        const message = (error as Error).message || 'Internal server error';
        return { status, message };
    }
    return { status: 500, message: 'Internal server error' };
}