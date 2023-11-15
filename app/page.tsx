import Link from "next/link";
import { auth } from "@clerk/nextjs";

const Home = () => {
  const { userId } = auth();
  const href = userId ? "/diary" : "/new-user";

  return (
    <div className="flex justify-center items-center w-screen h-screen p-6">
      <div className="max-w-4xl">
        <h1 role="heading" className="text-8xl mb-8">
          Plant Point Tracker
        </h1>
        <p role="region" className="text-2xl mb-12">
          A diary to keep track of the variety of plant-based foods you eat and
          calculate your running total of weekly plant points. Aim for 30 for a
          healthy gut!
        </p>
        <Link
          role="link"
          className="bg-[var(--green)] text-slate-50 rounded-md px-5 py-3 text-2xl"
          href={href}
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Home;
