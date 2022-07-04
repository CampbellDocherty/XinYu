import { fakeServer, setDefaultResponses } from './fakeServer';

beforeAll(() => {
  fakeServer.listen({
    onUnhandledRequest(req) {
      console.warn(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href
      );
    },
  });
});

afterAll(() => fakeServer.close());

beforeEach(() => {
  setDefaultResponses();
});

afterEach(() => {
  jest.clearAllMocks();
  fakeServer.resetHandlers();
});
