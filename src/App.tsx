import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import LocationProvider from './Playpiem/context/LocationProvider';
import Provider from './Playpiem/context/Provider';
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
      <LocationProvider>
        <Provider>
          <Container>
            <Router />
          </Container>
        </Provider>
      </LocationProvider>
    </QueryClientProvider>
  );
};

export default App;
