import { PlayCircle, MessageCircle, Share2, Heart } from "lucide-react";

export default function WatchLive() {
  return (
    <div className="bg-[#0f172a] min-h-[calc(100vh-80px)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Video Area */}
          <div className="lg:w-2/3 xl:w-3/4 flex flex-col">
            <div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-2xl flex items-center justify-center bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed?listType=user_uploads&list=@pceathingatichurch7316"
                title="PCEA Thing'ati Church YouTube Service"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-800 pb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                  Sunday Worship Service
                </h1>
                <p className="text-gray-400">PCEA Thing'ati • Oct 15, 2023</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-colors">
                  <Heart size={18} /> Like
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-colors">
                  <Share2 size={18} /> Share
                </button>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">
                Today's Order of Service
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">10:00</span> Praise &
                  Worship
                </li>
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">10:30</span> Intimations
                  & Welcoming Visitors
                </li>
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">10:45</span> Scripture
                  Reading: Psalm 23
                </li>
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">11:00</span> Sermon
                </li>
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">11:45</span> Tithes &
                  Offerings
                </li>
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">12:00</span> Benediction
                </li>
              </ul>
            </div>
          </div>

          {/* Live Chat */}
          <div className="lg:w-1/3 xl:w-1/4 h-[500px] lg:h-auto flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-black/20 flex items-center gap-2 font-bold">
              <MessageCircle size={18} /> Live Chat
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              <div className="text-xs text-center text-gray-500 border-b border-white/10 pb-2 mb-4">
                Welcome to the live chat! Remember to keep it respectful.
              </div>

              <div className="mb-3">
                <span className="font-bold text-sm text-accent-light mr-2">
                  Esther M:
                </span>
                <span className="text-sm text-gray-300">
                  Good morning everyone! Tuning in from home today.
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm text-blue-400 mr-2">
                  James K:
                </span>
                <span className="text-sm text-gray-300">
                  Amen! Ready for the word.
                </span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm text-green-400 mr-2">
                  Lucy W:
                </span>
                <span className="text-sm text-gray-300">Praise God.</span>
              </div>
              <div className="mb-3">
                <span className="font-bold text-sm text-purple-400 mr-2">
                  Moderator:
                </span>
                <span className="text-sm text-gray-300">
                  Welcome Esther, James, and Lucy. Service starts shortly.
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Say something..."
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-light text-white"
                />
                <button className="bg-accent text-white p-2 rounded-full shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
