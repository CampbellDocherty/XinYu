import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './routers/Router';

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
      <Router />
    </QueryClientProvider>
  );
};

export default App;
