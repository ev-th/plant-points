const About = () => {
  return (
    <div className="m-4 md:my-6 lg:my-8 max-w-7xl xl:mx-auto">
      <h1 role="heading" className="text-4xl m-8 font-bold text-center">
        About Plant Points
      </h1>
      <a
        href="https://www.theguthealthdoctor.com/30-plant-points"
        role="link"
        target="_blank"
      >
        <blockquote
          className="bg-slate-50 rounded-lg shadow-lg p-4 hover:bg-slate-200"
          cite="https://www.theguthealthdoctor.com/30-plant-points"
        >
          <span className="text-5xl mr-4">&ldquo;</span>We&apos;ve all heard of
          the importance of getting our &lsquo;5-a-day&rsquo; — and it can be a
          good place to start — but in truth it is a little outdated as it
          totally ignores the 40 trillion microbes living in our gut, which all
          need different types of plant foods to flourish. Each type of bacteria
          (known as a strain) performs a different job, and each strain likes a
          different kind of plant food. So when we consider this, then the more
          diverse plant foods we feed our gut bacteria, the more diverse they
          can become and the more &lsquo;skills&rsquo; they have to...
          <ul className="list-disc py-8 px-12">
            <li>Train our immune cells (of which 70% live in our gut!)</li>
            <li>Increase our resilience to infection</li>
            <li>Strengthen our gut barrier</li>
            <li>Produce vitamins and help regulate our hormones</li>
            <li>Communicate with our brain</li>
            <li>
              Balance our bloodsugar, lower blood fats and help prevent against
              many diseases
            </li>
          </ul>
          And that’s only the start of the thousands of responsibilities they
          have.<span className="text-5xl mx-4">&rdquo;</span>
          <p className="text-xl m-4">- The Gut Health Doctor Team</p>
        </blockquote>
      </a>
      <p className="mt-10">
        In order to give our gut microbiomes the fuel they need to thrive, we
        should be aiming to eat a wide variety of plant based foods, and a
        number of sources<sup>*</sup> are now suggesting 30 different plant
        points per week is a good amount to aim for. Plant points consist of six
        main groups: vegetables, fruits, wholegrains, legumes, nuts and seeds,
        and herbs and spices. The more diverse the types and colours you eat,
        the better! The article quoted above from{" "}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://www.theguthealthdoctor.com/30-plant-points"
          role="link"
          target="_blank"
        >
          The Gut Health Doctor
        </a>{" "}
        gives a great rundown of what counts toward your weekly points.
      </p>
      <p className="mt-4">
        This food diary is all about tracking your plant points over the course
        of a week, to help you keep on top of what you&apos;ve been consuming
        and remind you which ingredients you&apos;ve already eaten. Just add a
        meal to your food diary, include all the ingredients that count as plant
        points, and the running total will be calculated for you.
      </p>
      <article className="mt-6">
        <h2 className="my-4">
          *<span className="text-xl underline">Additional Links</span>
        </h2>
        <ul>
          <li>
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://journals.asm.org/doi/10.1128/msystems.00031-18"
              role="link"
              target="_blank"
            >
              American Gut: an Open Platform for Citizen Science Microbiome
              Research
            </a>
          </li>
          <li>
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://zoe.com/learn/30-plants-per-week"
              role="link"
              target="_blank"
            >
              Why should you eat 30 plants a week?
            </a>
          </li>
          <li>
            <a
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              href="https://www.theguardian.com/lifeandstyle/2023/mar/19/chew-slowly-keep-moving-and-eat-30-plants-a-week-12-rules-for-gut-health"
              role="link"
              target="_blank"
            >
              Chew slowly, keep moving and eat 30 plants a week: 12 rules for
              gut health
            </a>
          </li>
        </ul>
      </article>
    </div>
  );
};

export default About;
