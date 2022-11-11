import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Holding from './Playpiem';

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
      <Holding />
    </QueryClientProvider>
  );
};

export default App;
