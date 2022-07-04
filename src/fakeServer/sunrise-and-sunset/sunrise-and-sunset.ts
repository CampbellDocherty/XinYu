import { rest } from 'msw';
import fakeServer from '../fakeServer';

const url = 'https://api.sunrise-sunset.org/json';

const getSunriseAndSunset = () => {
  fakeServer.use(
    rest.get(url, (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          results: {
            astronomical_twilight_begin: '12:00:01 AM',
            astronomical_twilight_end: '12:00:01 AM',
            civil_twilight_begin: '3:04:10 AM',
            civil_twilight_end: '9:06:58 PM',
            day_length: '16:33:54',
            nautical_twilight_begin: '1:53:18 AM',
            nautical_twilight_end: '10:17:51 PM',
            solar_noon: '12:05:34 PM',
            sunrise: '3:48:37 AM',
            sunset: '8:22:31 PM',
          },
          status: 'OK',
        })
      )
    )
  );
};

export { getSunriseAndSunset };
