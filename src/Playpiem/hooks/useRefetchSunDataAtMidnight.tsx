import { UseQueryResult } from 'react-query';
import { MIDNIGHT_WITHOUT_SECONDS } from '../constants';
import { Time } from '../schemas';

const useRefetchSunDataAtMidnight = (
  time: Time | null,
  refetch: (options?: {
    readonly throwOnError: boolean;
    readonly cancelRefetch: boolean;
  }) => Promise<UseQueryResult>
) => {
  if (time) {
    const { readableTime } = time;
    const timeWithoutSeconds = readableTime.split(':').slice(0, -1).join(':');

    const currentTimeIsMidnight =
      timeWithoutSeconds === MIDNIGHT_WITHOUT_SECONDS;

    if (currentTimeIsMidnight) {
      refetch();
    }
  }
};

export default useRefetchSunDataAtMidnight;
