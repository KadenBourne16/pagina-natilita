import Navbar from "@/app/components/navbar"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gradient-to-br from-violet-200 via-pink-200 to-violet-300">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col items-center lg:grid lg:grid-cols-2 lg:items-center">
              {/* Image - Shown first on mobile, right on desktop */}
              <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] mx-auto mb-8 lg:mb-0 lg:order-2 lg:ml-auto">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-pink-500 shadow-xl">
                  <Image
                    src="/homeimage/joselovenobackground.png"
                    alt="Joselove"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-4 text-center lg:text-left lg:pr-8">
                <div className="mt-4">
                  <h1 className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-tighter lg:text-6xl text-balance">
                    Happy Birthday, 
                  </h1>
                  <span className="text-fuchsia-500 font-bold text-5xl sm:text-6xl animate-bounce block mt-2">Joselove</span>
                </div>
                <p className="text-slate-700 text-base font-normal leading-relaxed lg:text-lg text-pretty">
                  Join us in celebrating Joselove, a vibrant and talented soul who brings joy to everyone around her. Known
                  for her infectious laughter, artistic passion, and unwavering kindness, she's a true gem. This website
                  is a collection of our love—wishes, memories, and fun moments—to make her day unforgettable as she
                  embarks on a new chapter.
                </p>
                <Link
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-bold text-white bg-fuchsia-500 hover:bg-fuchsia-600 transition-all duration-300 shadow-lg hover:shadow-xl w-fit mx-auto lg:mx-0"
                  href="/wish-me"
                >
                  <span>View More Messages</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
