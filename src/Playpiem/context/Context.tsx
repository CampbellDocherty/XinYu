import { createContext } from 'react';

interface ContextType {
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
  readonly isNightTime: boolean | undefined;
  readonly sunset: string | undefined;
}

const Context = createContext<ContextType>({
  isLoading: true,
  isSuccess: false,
  isError: false,
  isNightTime: undefined,
  sunset: '',
});

export default Context;
