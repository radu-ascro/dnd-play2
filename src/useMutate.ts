import * as React from 'react';

const mutateFn = (delay: number, pass = true) =>
  new Promise((resolve, reject) => {
    setTimeout(pass ? resolve : reject, delay);
  });

/**
 * Mock a mutation function that takes a delay and returns a promise.
 * @param delay
 * @param pass
 */
export const useMutate = (delay: number, pass = true) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const callback = React.useCallback(
    async (data: any) => {
      setLoading(true);
      try {
        await mutateFn(delay, pass);
        setLoading(false);
        return data;
      } catch (err) {
        setLoading(false);
        setError(new Error('mutation failed'));
      }
    },
    [delay, pass]
  );

  return [callback, { loading, error }];
};
