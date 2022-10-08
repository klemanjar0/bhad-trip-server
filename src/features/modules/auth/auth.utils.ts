import { ERROR } from '../../errors/ErrorCodes';

export const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
);
export const validatePayload = (payload: any) => {
  if (!payload.password || !payload.username) {
    throw new Error(ERROR.INCOMPLETE_REQUEST_DATA);
  }

  if (
    typeof payload.password !== 'string' ||
    typeof payload.username !== 'string'
  ) {
    throw new Error(ERROR.TYPE_ERROR);
  }

  const password = payload.password as string;
  const username = payload.username as string;

  if (!passwordRegex.test(password)) {
    throw new Error(ERROR.WEAK_PASSWORD);
  }

  if (username.length < 3) {
    throw new Error(ERROR.MINIMUM_CHARS);
  }
};
