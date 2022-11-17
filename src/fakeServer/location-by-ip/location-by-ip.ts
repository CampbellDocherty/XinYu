import { rest } from 'msw';
import fakeServer from '../fakeServer';

const url = `https://ipinfo.io/json`;

const getLocationByIp = () => {
  fakeServer.use(
    rest.get(url, (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          ip: '148.252.129.108',
          city: 'London',
          region: 'England',
          country: 'GB',
          loc: '51.5085,-0.1257',
          org: 'AS5378 Vodafone Limited',
          postal: 'EC1A',
          timezone: 'Europe/London',
        })
      )
    )
  );
};

const getLocation500 = () => {
  fakeServer.use(rest.get(url, (req, res, ctx) => res(ctx.status(500))));
};

export { getLocationByIp, getLocation500 };
