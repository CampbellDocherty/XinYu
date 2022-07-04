import { rest } from 'msw';
import fakeServer from '../fakeServer';

const url =
  'https://api.sunrise-sunset.org/json?lat=51.4790545&lng=-0.2820995&date=today';

const getSunriseAndSunset = () => {
  fakeServer.use(
    rest.get(url, (req, res, ctx) => res(ctx.status(200), ctx.json({})))
  );
};

export { getSunriseAndSunset };
