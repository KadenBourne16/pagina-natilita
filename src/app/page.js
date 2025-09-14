import Navbar from "@/app/components/navbar"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gradient-to-br from-violet-200 via-pink-200 to-violet-300">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6 text-left">
                <h1 className="text-slate-900 text-5xl font-black leading-tight tracking-tighter lg:text-6xl text-balance">
                  Happy Birthday, Joselove!
                </h1>
                <p className="text-slate-700 text-base font-normal leading-relaxed lg:text-lg text-pretty">
                  Join us in celebrating Sarah, a vibrant and talented soul who brings joy to everyone around her. Known
                  for her infectious laughter, artistic passion, and unwavering kindness, she's a true gem. This website
                  is a collection of our love—wishes, memories, and fun moments—to make her day unforgettable as she
                  embarks on a new chapter.
                </p>
                <Link
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-bold text-white bg-fuchsia-500 hover:bg-fuchsia-600 transition-all duration-300 shadow-lg hover:shadow-xl w-fit"
                  href="#messages"
                >
                  <span>View More Messages</span>
                </Link>
              </div>

              <div className="w-full h-auto aspect-square bg-cover bg-center rounded-2xl shadow-2xl bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🎂</span>
                  </div>
                  <p className="text-lg font-semibold">Joselove's Special Day</p>
                  <p className="text-sm opacity-90">Celebrating 30 amazing years!</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
