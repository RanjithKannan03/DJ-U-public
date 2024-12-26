import Hero from "@/components/Hero";
import MobileQueueTrigger from "@/components/MobileQueueTrigger";
import songs from "@/utils/songs";


export default async function Home() {

  return (


    <>
      <div className="flex flex-col w-full h-full gap-4 px-6 py-8 md:px-8 md:gap-6 lg:gap-8 xl:gap-10 lg:px-20 font-montserrat">


        <h1 className="text-3xl font-medium text-white md:text-4xl lg:text-5xl xl:text-6xl">Library</h1>

        {/* Hero */}

        <Hero songs={songs} />


        <div className="lg:hidden">
          <MobileQueueTrigger />
        </div>

      </div>

    </>
  );
}
