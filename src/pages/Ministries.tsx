import { Users, Music, HandHeart, Baby, UserPlus, Heart, Shield, BookOpen, HeartPulse, Scale, Globe, Mic, Briefcase } from 'lucide-react';

export default function Ministries() {

  const ministries: { title: string; imgUrl?: string; desc: string; link?: string; icon?: any }[] = [
    { title: "Church School", imgUrl: "https://i.postimg.cc/NsYxyGd8/Whats-App-Image-2026-05-04-at-17-21-32.jpg", desc: "A fun, safe environment where kids learn about Jesus at their level." },
    { title: "Youth Fellowship", imgUrl: "https://i.postimg.cc/nn42nQkh/Whats-App-Image-2026-05-04-at-17-28-49.jpg", desc: "Empowering teens to navigate life's challenges grounded in faith.", link: "https://www.tiktok.com/@thingati_pulse?_r=1&_t=ZS-96uPh6EBu0j" },
    { title: "Woman's Guild", imgUrl: "https://i.postimg.cc/Z41sbmhz/p-c-e-a-womans-guild-logo-png-seeklogo-532028.png", desc: "A fellowship of women dedicated to serving the church, community, and growing in Christ." },
    { title: "PCMF", imgUrl: "https://i.postimg.cc/wHXSb7K9/the-presbyterian-church-men-fellowship-logo-png-seeklogo-522978.png", desc: "Presbyterian Church Men's Fellowship, empowering men to lead in faith and serve the community." },
    { title: "Brigade (Boys and Girls Brigade)", imgUrl: "https://i.postimg.cc/XXXRCCsk/maxresdefault.jpg", desc: "A ministry dedicated to developing the physical, mental, and spiritual well-being of young boys and girls." },
    { title: "Christian Education", imgUrl: "https://i.postimg.cc/gj7M1BKM/ce-logo.png", desc: "Fostering spiritual growth through systematic teaching and study of God's Word." },
    { title: "Health", icon: HeartPulse, desc: "Promoting physical wellness and providing health-related guidance to the congregation." },
    { title: "JPRC", imgUrl: "https://i.postimg.cc/Lsv3rb9h/mqdefault.jpg", desc: "Justice, Peace, Reconciliation, and Creation – championing social justice and environmental stewardship." },
    { title: "BSR", icon: HandHeart, desc: "Board for Social Responsibility – reaching out to our community with Christ's love through practical action." },
    { title: "Evangelism", icon: Globe, desc: "Fulfilling the Great Commission by sharing the Gospel and reaching the unreached." },
    { title: "Church Choir", icon: Music, desc: "Leading the congregation in timeless hymns, anthems, and special musical ministrations." },
    { title: "Praise and Worship", icon: Mic, desc: "Leading dynamic, Spirit-filled contemporary worship during our services." },
    { title: "Planning and Development", icon: Briefcase, desc: "Overseeing church projects, infrastructural growth, and strategic planning." }
  ];

  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-accent tracking-widest uppercase mb-2">Get Involved</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-6">Serve, Grow, Belong.</h1>
          <p className="text-lg text-gray-600">
            We are a body with many parts. Discover where God is calling you to plug in, serve, or receive ministry.
          </p>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          
          {/* Ministries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ministries.map((min, idx) => (
              <div key={idx} className="card-soft p-6 flex gap-4 hover:border-primary/20 border border-transparent transition-colors">
                <div className="bg-primary/5 p-3 rounded-xl shrink-0 h-fit flex items-center justify-center min-w-[50px]">
                  {min.imgUrl ? (
                    <img src={min.imgUrl} alt={min.title} className="w-8 h-8 object-contain rounded" />
                  ) : (
                    min.icon && <min.icon className="text-primary w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-primary-dark mb-2">{min.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{min.desc}</p>
                  {min.link && (
                    <a href={min.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-sm font-bold text-accent hover:text-accent-light uppercase tracking-wider">Visit TikTok Page &rarr;</a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

