import { Users, BookOpen, Heart, Church, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function About() {
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <div className="bg-bg min-h-screen">
      {/* Header */}
      <section className="bg-primary-dark text-white py-12 px-4 text-center">
        <h2 className="text-sm font-bold text-accent-light tracking-widest uppercase mb-2">
          Who We Are
        </h2>
        <h1 className="text-5xl md:text-6xl font-serif italic mb-4 max-w-4xl mx-auto leading-tight">
          Where Faith Takes Root And Love Bears Fruit
        </h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-300 font-light">
          Discover the history, beliefs, and people that make PCEA Thing'ati a
          spiritual home for so many in Ngecha.
        </p>
      </section>

      {/* History & Beliefs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="https://i.postimg.cc/Mx9StnJH/Whats-App-Image-2026-04-17-at-01-17-23.jpg" alt="Our History Logo" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-primary-dark">
              Our History
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              The history of PCEA Thingati is a testament to the power of vision, the grace of sacrifice, and the unwavering faithfulness of God. From a distant district of commuters to a thriving center of spiritual and physical development, this journey spans over 3 decades of growth.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isHistoryExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-6 pt-4">
                <p className="text-gray-600 leading-relaxed text-lg">
                  In 1993, the leadership of the PCEA Mother Church recognized a spiritual burden within the Thingati District of Kamandura Parish. Two critical factors necessitated the birth of a local church:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 text-lg">
                  <li><strong>The Burden of Distance:</strong> Residents of Thingati had to travel approximately 3km to attend services at the mother church.</li>
                  <li><strong>The Strength of Numbers:</strong> The Thingati District was more populous than other districts in the parish, signaling a harvest that was ready for its own granary.</li>
                </ul>

                <p className="text-gray-600 leading-relaxed text-lg">
                  The late Elder Peter Kimani Kamweru, then Chairman of Ngecha Church and Elder of Thingati District, was tasked with finding land. The task seemed impossible; no land was available for purchase, and no donors emerged.
                </p>

                <h4 className="text-xl font-bold text-primary-dark mt-6 border-b pb-2">The Miracle of the Tithe (1993)</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  The breakthrough came when Elder Saphiah K. Mburu and his family offered 0.27 acres of their land as a tithe to honor the Lord. This selfless act provided the physical foundation the community had prayed for.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  On November 30, 1993, the first Building Committee was formed to steward this gift. They met every Friday at 7:00 PM, rotating through members' houses to plan the future.
                </p>
                <div className="bg-primary/5 p-4 rounded-xl">
                  <p className="font-bold text-primary-dark mb-2">The First Committee:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    <li>• Elder Peter Kimani Kamweru (Chairman)</li>
                    <li>• Samuel Njau Nganga (Treasurer)</li>
                    <li>• George Njuguna Chege (Secretary)</li>
                    <li>• Margaret Mumbi Njenga</li>
                    <li>• Lucy Muthoni Kariuki (late)</li>
                    <li>• Jackson Mungai Njau (late)</li>
                    <li>• Lenah Wangari (late)</li>
                    <li>• Eunice Wangari Wairimu</li>
                  </ul>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg font-medium mt-4">The committee made two prophetic decisions:</p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-600 text-lg">
                  <li>Because of the limited land size, they would build a massive foundation with reinforced columns to maximize space.</li>
                  <li>The architectural plan would resemble a Fish—symbolizing the vessel God chose to transport Jonah to Nineveh—with a capacity to seat 600 people.</li>
                </ol>

                <h4 className="text-xl font-bold text-primary-dark mt-6 border-b pb-2">The Anointing and the First Congregation (1995)</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  On October 29, 1995, despite torrential rains, the Kamandura Kirk Session led by Rev. Samuel Muchuga and Elder Julius Nganga Githinji officially brought the district from Ngecha to Thingati. The day featured three landmark ceremonies:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-gray-600 text-lg">
                  <li>Anointing of the ground.</li>
                  <li>Mapping and foundation preparation.</li>
                  <li>The First Fundraiser: An incredible Ksh. 1,056,000 was raised.</li>
                </ol>
                <p className="text-gray-600 leading-relaxed text-lg mt-2">
                  By December 3, 1995, the first service was held in a humble structure made of polythene. The late Rev. E.N.S. Njoroge served the first Holy Communion to a congregation of 123 members children included. On this day, the first children were baptized: Teddy Mwihia Njuguna and Grace Waithera Waweru.
                </p>

                <h4 className="text-xl font-bold text-primary-dark mt-6 border-b pb-2">Builders and Stewards</h4>
                <p className="text-gray-600 leading-relaxed text-lg">The physical sanctuary was a communal effort:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600 text-lg">
                  <li><strong>Architect:</strong> Elder Samuel Njau Nganga.</li>
                  <li><strong>Main Builder:</strong> Mr. Asaph Ngia (late).</li>
                  <li><strong>Roofing:</strong> Mr. Muigai Ngirita (late) and the youth, led by Mr. John Njau Ayub.</li>
                  <li><strong>Supervisors:</strong> James Njau Mwaura (late) and Mr. Henry Nyaga Gataama.</li>
                </ul>

                <h4 className="text-xl font-bold text-primary-dark mt-6 border-b pb-2">Growth, Subdivision, and the Fruits of the Spirit</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  As the church grew, so did the administrative needs. The three original districts were subdivided and renamed after the Fruits of the Holy Spirit:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-600 text-lg mt-2 font-medium">
                  <div>• Gatina → Uaminifu</div>
                  <div>• Riumba → Amani</div>
                  <div>• Central → Furaha</div>
                  <div>• Gitwe → Fadhili</div>
                  <div>• Mugumo → Wema</div>
                  <div>• Mukurwe → Upendo</div>
                </div>

                <h4 className="text-xl font-bold text-primary-dark mt-6 border-b pb-2">Thirty Years of Milestones (2025)</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Under the Development Committee led by Mr. Joel Mburu Kimani, PCEA Thingati stands as a beacon of progress. The church has successfully:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 text-lg">
                  <li>Constructed a sanctuary valued at over Ksh. 7 Million.</li>
                  <li>Built a Kitchen Complex with meeting rooms and classrooms (Ksh. 7 Million).</li>
                  <li>Invested in infrastructure, including a road connecting Thingati A and B for Ksh. 2 Million, and a plot in Manjiri for Ksh. 2 Million.</li>
                  <li>Bought an additional 0.5 hectares of land; now the church sits on 1 acre of land from the initial 0.27 acres.</li>
                  <li>Expanded the congregation to over 600 members and 160 children.</li>
                  <li>Modernized with full pews, sound systems, and tech infrastructure.</li>
                </ul>

                <div className="bg-accent/10 border-l-4 border-accent p-6 mt-8 rounded-r-xl italic">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    "Reflecting on the last 30 years, we see the mighty hand of God in every milestone. From a small group meeting in homes to a massive 'Fish' sanctuary, we continue to witness His work among us. We look to the future with hope and the conviction of scripture: <strong>'Not by might nor by power, but by my Spirit,' says the Lord Almighty. — Zechariah 4:6</strong>"
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-bold text-primary-dark border-b pb-2 mb-4">30th Anniversary Vlog</h4>
                  <div className="aspect-video w-full rounded-xl overflow-hidden shadow-sm">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/b9YAgnOpSaM?si=2gHH1SoUzetZzFWT" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>

                {/* History Images Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  {[
                    "https://i.postimg.cc/8fdxwh92/Whats-App-Image-2026-05-22-at-21-31-53.jpg",
                    "https://i.postimg.cc/0KGhZpFF/Whats-App-Image-2026-05-22-at-21-31-54.jpg",
                    "https://i.postimg.cc/kRNLwxLm/Whats-App-Image-2026-05-22-at-21-31-54-(1).jpg",
                    "https://i.postimg.cc/wR5nFhnz/Whats-App-Image-2026-05-22-at-21-31-54-(2).jpg"
                  ].map((imgSrc, idx) => (
                    <img 
                      key={idx}
                      src={imgSrc} 
                      alt={`Historical moment ${idx + 1}`} 
                      className="w-full h-64 object-cover rounded-xl shadow-sm cursor-pointer hover:opacity-90 transition-opacity" 
                      referrerPolicy="no-referrer" 
                      onClick={() => setExpandedImage(imgSrc)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
              className="mt-4 flex items-center gap-2 text-accent hover:text-accent-light font-bold transition-colors w-full justify-center md:justify-start"
            >
              {isHistoryExpanded ? (
                <>Read Less <ChevronUp size={20} /></>
              ) : (
                <>Read The Full History <ChevronDown size={20} /></>
              )}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
              <img src="https://i.postimg.cc/c0NdrpW9/Whats-App-Image-2026-04-17-at-01-17-23-(1).jpg" alt="Our Beliefs Logo" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-primary-dark">
              Our Beliefs
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              As part of the Presbyterian Church of East Africa, we hold to the
              Reformed theological tradition. We believe in:
            </p>
            <ul className="space-y-4 text-gray-600 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1 shrink-0">•</span>
                <span>
                  <strong>The Authority of Scripture:</strong> The Bible is the
                  inspired, infallible Word of God.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1 shrink-0">•</span>
                <span>
                  <strong>Salvation by Grace:</strong> We are saved entirely by
                  God's grace through faith in Jesus Christ, not by our own works.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1 shrink-0">•</span>
                <span>
                  <strong>The Sovereignty of God:</strong> God is supreme ruler
                  over all creation.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Church Districts */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-100 mt-12">
        <div className="text-center mb-20">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-4 block">Communities</span>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-6">
            Church Districts
          </h3>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            We are organized into fellowships to ensure everyone is cared for, connected, and growing in their faith.
          </p>
        </div>

        <div className="flex justify-center max-w-sm mx-auto">
          <ol className="text-left space-y-4 text-gray-700 text-xl md:text-2xl font-serif">
            {[
              "Amani",
              "Fadhili",
              "Furaha",
              "Uaminifu",
              "Upendo",
              "Wema"
            ].map((district, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <span className="text-accent font-bold">{idx + 1}.</span>
                <span>{district}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      
      {/* Our Church */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-serif font-bold text-primary-dark">
            Our Church
          </h3>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {[
              {
                name: "PCEA Thing'ati",
                img: "https://i.postimg.cc/VNPLwQ7Q/Whats-App-Image-2026-05-30-at-00-55-45.jpg",
              }
            ].map((group, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-[2rem] aspect-square shadow-sm border border-gray-100 cursor-pointer" onClick={() => setExpandedImage(group.img)}>
                <img
                  src={group.img}
                  alt={group.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="font-serif font-bold text-2xl text-white">
                    {group.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {expandedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button 
              onClick={() => setExpandedImage(null)}
              className="absolute top-0 right-0 p-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={expandedImage} 
              alt="Expanded view" 
              className="w-full h-full max-h-[90vh] object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
