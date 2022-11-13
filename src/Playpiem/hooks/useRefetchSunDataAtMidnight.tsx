import { UseQueryResult } from 'react-query';
import { MIDNIGHT_WITHOUT_SECONDS } from '../constants';
import { Time } from '../schemas';

const getTimeWithoutSeconds = (time: string) => {
  return time.split(':').slice(0, -1).join(':');
};

const useRefetchSunDataAtMidnight = (
  time: Time | null,
  refetch: (options?: {
    readonly throwOnError: boolean;
    readonly cancelRefetch: boolean;
  }) => Promise<UseQueryResult>
) => {
  if (time) {
    const { readableTime } = time;
    const timeWithoutSeconds = getTimeWithoutSeconds(readableTime);

    const currentTimeIsMidnight =
      timeWithoutSeconds === MIDNIGHT_WITHOUT_SECONDS;

    if (currentTimeIsMidnight) {
      refetch();
    }
  }
};

export default useRefetchSunDataAtMidnight;
