import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Playpiem from './Playpiem';

const App: FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
      mutations: {},
    },
  });
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <Playpiem />
    </QueryClientProvider>
  );
};

export default App;
