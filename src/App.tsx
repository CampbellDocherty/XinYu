import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './routers/Router';
import { Container } from './styles';

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
      <Container>
        <Router />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
