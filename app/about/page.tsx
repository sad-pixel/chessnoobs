export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50 text-amber-900">
      <section className="w-full py-20 md:py-36">
        <div className="container mx-auto px-8 md:px-10 xl:px-14">
          <div className="flex flex-col space-y-10">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-10 text-amber-900">
              About ChessNoobs
            </h1>
            <p className="text-lg text-amber-800 max-w-2xl leading-relaxed">
              Welcome to ChessNoobs! We&apos;re all about making chess training tools free and easy to use for everyone. Whether you&apos;re just starting out or have been playing for a while, we&apos;ve got something for you.
            </p>
            <p className="text-lg text-amber-800 max-w-2xl leading-relaxed">
              You can play against our AI, work on your skills with our trainers, or check out some master games. We&apos;re always adding new stuff and trying to make things better for you.
            </p>
            <p className="text-lg text-amber-800 max-w-2xl leading-relaxed">
              Join us and have fun getting better at chess!
            </p>
            <p className="text-lg text-amber-800 max-w-2xl leading-relaxed">
              I started ChessNoobs because I love making chess accessible, even though I&apos;m not a chess pro myself. You can learn more about me and my work at <a href="https://ishan.page" className="text-amber-900 underline hover:text-amber-700 transition-colors">ishan.page</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
