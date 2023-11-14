Plant Points is a web app that helps users keep track of the variety of plant-based foods they're eating. Aiming for the goal of [30 plant points per week](https://www.theguthealthdoctor.com/30-plant-points), users can record the meals they eat and stay updated on their running plant points total. It's deployed on Vercel and you can check it out [here](https://plant-points.vercel.app/).

## Getting Started

To run the app locally, clone the repository and install the dependencies.

```bash
git clone https://github.com/ev-th/plant-points.git
cd plant-points
npm install
```

Set up a database connection by adding a mysql database URL into a .env file on the root.

```bash
#.env
DATABASE_URL="your_mysql_database_url_here"
```

Plant Points uses [Clerk](https://clerk.com/) for auth. Set up an account and add a new application with them for free. They make auth very simple, 10/10 would recommend. Then create a .env.local file on the route and add your keys to the first two variables and keep the remaining four as in the snippet below.

```bash
#.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_publishable_key_here"
CLERK_SECRET_KEY="your_secret_key_here"

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/diary
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/new-user
```

Make sure your database is connected and push the prisma schema from the root.

```bash
npx prisma db push
```

Ensure the tests are passing with `npm test`. You're ready to go! Start the server and open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
npm run dev
```
