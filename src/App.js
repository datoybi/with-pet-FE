import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from './lib/styles/GlobalStyle';
import RootRoute from './routes';
import { queryClient } from './reactQuery/queryClient';
import Loading from './components/common/Loading/Loading';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Loading />
      <RootRoute />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
