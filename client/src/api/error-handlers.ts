export interface ICustomError {
  message: string;
  statusCode: number;
}

export interface IAxiosErrorResponse {
  response: {
    data: {
      message: string;
    };
    status: number;
  };
}

const defaultApiError = (error: unknown): ICustomError => {
  if ((error as IAxiosErrorResponse).response) {
    const axiosError = error as IAxiosErrorResponse;
    return {
      message: axiosError.response.data.message || 'An error occurred',
      statusCode: axiosError.response.status,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500, // Default status code for generic errors
    };
  } else {
    return {
      message: 'An unknown error occurred',
      statusCode: 500,
    };
  }
};

export { defaultApiError };
