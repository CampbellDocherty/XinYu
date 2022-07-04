import { setupServer } from 'msw/node';

const fakeServer = setupServer();

export default fakeServer;
