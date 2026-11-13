import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, Camera, Disc3, Heart, Mail, Music2, Pause, Play, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import './styles.css';

const memories = [
  { date: 'MOMEN PERTAMA', title: 'Hari ketika semesta mempertemukan kita', note: 'Ada hal-hal indah yang datang diam-diam. Hari itu, salah satunya adalah kamu.', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=85', tint: 'rose' },
  { date: 'PETUALANGAN KECIL', title: 'Tersesat, lalu menemukan tempat pulang', note: 'Kota terasa lebih hangat kalau dilewati sambil menggenggam tanganmu.', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=85', tint: 'honey' },
  { date: 'TENTANG KITA', title: 'Tawa yang tidak pernah ingin selesai', note: 'Dari cerita paling remeh sampai mimpi paling besar, semuanya terasa cukup.', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85', tint: 'plum' },
];

const photos = [
  'photo-1516589178581-6cd7833ae3b2', 'photo-1522673607200-164d1b6ce486', 'photo-1511895426328-dc8714191300', 'photo-1511988617509-a57c8a288659', 'photo-1529333166437-7750a6dd5a70', 'photo-1517841905240-472988babdf9'
];
const imageUrl = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

function App() {
  const [page, setPage] = useState('home');
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeMemory, setActiveMemory] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (playing) audio.play().catch(() => setPlaying(false)); else audio.pause();
  }, [playing, muted]);

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (next) => { setPage(next); setEnvelopeOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const switchMusic = () => { if (!playing) setMuted(false); setPlaying(!playing); };

  return <main className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="grain" aria-hidden="true" />
    <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b23eb4e.mp3?filename=romantic-piano-124871.mp3" />
    <header className="topbar">
      <button className="brand" onClick={() => go('home')} aria-label="Kembali ke beranda"><span className="brand-mark"><Heart size={16} fill="currentColor" /></span><span>our little universe</span></button>
      <div className="topbar-right"><span className="anniversary-label">A STORY MADE OF US <i>✦</i></span><button className="sound-button" onClick={switchMusic} aria-label={playing ? 'Pause musik' : 'Putar musik'}>{playing ? <Pause size={15} /> : <Music2 size={15} />}<span>{playing ? 'PAUSE' : 'SOUND'}</span></button></div>
    </header>

    <AnimatePresence mode="wait">
      {page === 'home' && <motion.section className="home-page page" key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .7 }}>
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}><span className="eyebrow-line" /> OUR STORY, IN LITTLE MOMENTS <span className="eyebrow-line" /></motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: .9 }}>Semua yang indah<br />selalu <em>bermula</em> dari kita.</motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .75 }}>Sebuah ruang kecil untuk menyimpan tawa, cerita,<br className="desktop-break" /> dan hal-hal sederhana yang terasa seperti rumah.</motion.p>
        </div>

        <motion.div className="collage-wrap" initial={{ opacity: 0, scale: .96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .65, duration: 1 }}>
          <div className="collage-glow" />
          <div className="photo-stack">
            {photos.slice(0, 5).map((photo, index) => <motion.button key={photo} className={`polaroid polaroid-${index + 1}`} onClick={() => { setPage('gallery'); setLightbox(index); }} whileHover={{ y: -9, rotate: 0, scale: 1.035 }} transition={{ type: 'spring', stiffness: 200, damping: 16 }} aria-label={`Lihat foto kenangan ${index + 1}`}><span className="photo-image" style={{ backgroundImage: `url(${imageUrl(photo)})` }} /><span className="photo-caption">{['that first hello', 'our little escape', 'you & me', 'the golden hour', 'my favorite place'][index]} <i>♡</i></span></motion.button>)}
            <div className="pressed-flower flower-a">✿</div><div className="pressed-flower flower-b">✿</div>
            <div className="wax-seal"><Heart size={22} /></div>
          </div>
        </motion.div>

        <motion.div className="home-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}><button className="open-letter-prompt" onClick={() => setEnvelopeOpen(true)}><span className="prompt-icon"><Mail size={17} /></span><span>ada surat kecil untukmu</span><ArrowDown size={15} className="prompt-arrow" /></button><button className="explore-link" onClick={() => go('surprises')}>atau lihat semua kejutan <ArrowRight size={13} /></button></motion.div>
        <div className="home-bottom"><span>TAKE YOUR TIME, STAY A LITTLE</span><span className="bottom-date">26 <i>·</i> 09 <i>·</i> 26</span></div>
        <FloatingBits />
        <AnimatePresence>{envelopeOpen && <LetterModal onClose={() => setEnvelopeOpen(false)} />}</AnimatePresence>
      </motion.section>}

      {page === 'surprises' && <motion.section className="page inner-page" key="surprises" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .55 }}>
        <BackButton onClick={() => go('home')} /><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" /> MADE WITH ALL MY HEART <span className="eyebrow-line" /></span><h2>Pilih kejutan <em>kecilmu</em></h2><p>Tidak perlu buru-buru. Cerita yang indah paling enak dinikmati pelan-pelan.</p></div>
        <div className="surprise-grid">{[
          { id: 'journey', icon: <Camera />, title: 'Our journey', text: 'Kepingan kecil kisah kita', action: () => go('journey'), number: '01' },
          { id: 'letter', icon: <Mail />, title: 'A little letter', text: 'Kata-kata yang kusimpan', action: () => setEnvelopeOpen(true), number: '02' },
          { id: 'playlist', icon: <Disc3 />, title: 'Our soundtrack', text: 'Lagu yang terasa seperti kita', action: switchMusic, number: '03' },
          { id: 'gallery', icon: <Sparkles />, title: 'Little moments', text: 'Hal-hal yang ingin kuingat', action: () => go('gallery'), number: '04' },
        ].map((item, index) => <motion.button className={`surprise-card card-${item.id}`} key={item.id} onClick={item.action} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .1 }} whileHover={{ y: -8 }}><span className="card-number">{item.number}</span><span className="surprise-icon">{item.icon}</span><span className="surprise-title">{item.title}</span><span className="surprise-text">{item.text}</span><span className="card-enter"><ArrowRight size={16} /></span><span className="card-orbit" /></motion.button>)}</div>
        <AnimatePresence>{envelopeOpen && <LetterModal onClose={() => setEnvelopeOpen(false)} />}</AnimatePresence>
      </motion.section>}

      {page === 'journey' && <motion.section className="page inner-page story-page" key="journey" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><BackButton onClick={() => go('surprises')} /><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" /> CHAPTERS OF US <span className="eyebrow-line" /></span><h2>Pelan-pelan, menjadi <em>kita.</em></h2><p>Beberapa hari mungkin terlupa. Tapi rasanya selalu tinggal.</p></div><div className="timeline-wrap"><div className="timeline-line" />{memories.map((memory, i) => <motion.article className={`timeline-card ${i % 2 ? 'reverse' : ''}`} key={memory.date} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .7 }}><div className="timeline-image-wrap"><img src={memory.image} alt="Pasangan menikmati momen bersama" /><span className="image-index">0{i + 1}</span></div><div className="timeline-copy"><span className="eyebrow"><span className="eyebrow-line" /> {memory.date}</span><h3>{memory.title}</h3><p>{memory.note}</p><span className="timeline-heart"><Heart size={16} fill="currentColor" /></span></div></motion.article>)}</div><div className="closing-note"><span>AND EVERY DAY AFTER</span><p>To be continued, with you.</p><Heart size={19} fill="currentColor" /></div></motion.section>}

      {page === 'gallery' && <motion.section className="page inner-page gallery-page" key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BackButton onClick={() => go('surprises')} /><div className="section-heading"><span className="eyebrow"><span className="eyebrow-line" /> THE DAYS I KEEP <span className="eyebrow-line" /></span><h2>Favoritku adalah <em>kita.</em></h2><p>Beberapa potongan waktu yang ingin kusimpan sedikit lebih lama.</p></div><div className="gallery-grid">{photos.map((photo, i) => <motion.button className={`gallery-photo gallery-photo-${i + 1}`} key={photo} onClick={() => setLightbox(i)} whileHover={{ scale: 1.025 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .07 }}><img src={imageUrl(photo)} alt={`Kenangan kita ${i + 1}`} loading={i > 2 ? 'lazy' : 'eager'} /><span className="gallery-caption">a day to remember <i>♡</i></span></motion.button>)}</div><div className="gallery-signoff"><Sparkles size={16} /> a little collection of forever</div></motion.section>}
    </AnimatePresence>

    <footer className="site-footer"><span>MADE WITH <Heart size={10} fill="currentColor" /> & A LITTLE MAGIC</span><nav><button onClick={() => go('home')}>HOME</button><span>·</span><button onClick={() => go('surprises')}>SURPRISES</button></nav><span>YOURS, ALWAYS <i>✦</i></span></footer>
    <AnimatePresence>{lightbox !== null && <Lightbox index={lightbox} onClose={() => setLightbox(null)} onStep={(step) => setLightbox((lightbox + step + photos.length) % photos.length)} />}</AnimatePresence>
  </main>;
}

function FloatingBits() { return <div className="floating-bits" aria-hidden="true">{Array.from({ length: 13 }, (_, i) => <span key={i} style={{ '--i': i, '--x': `${(i * 83 + 11) % 100}%`, '--delay': `${(i % 7) * -1.7}s`, '--duration': `${15 + (i % 5) * 2}s` }}>{i % 4 === 0 ? '✦' : i % 3 === 0 ? '♡' : '·'}</span>)}</div>; }

function BackButton({ onClick }) { return <button className="back-button" onClick={onClick}><ArrowLeft size={15} /> BACK</button>; }

function LetterModal({ onClose }) { return <motion.div className="modal-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><motion.div className="letter-modal" initial={{ opacity: 0, y: 30, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .98 }} transition={{ type: 'spring', damping: 24 }} onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Tutup surat"><X size={18} /></button><div className="letter-top-mark"><span>✦</span><span>FOR YOU, ALWAYS</span><span>✦</span></div><div className="letter-icon"><Mail size={23} /></div><span className="letter-date">26 SEPTEMBER 2026</span><h2>Untuk kamu,<br /><em>rumahku.</em></h2><div className="letter-rule"><span>♡</span></div><p>Terima kasih sudah hadir di hidupku, dengan semua cara sederhana yang selalu berhasil membuatnya lebih baik. Untuk obrolan panjang, tawa kecil, dan hari-hari biasa yang terasa luar biasa karena ada kamu.</p><p>Semoga kita terus tumbuh, saling menemukan, dan memilih satu sama lain—lagi dan lagi. Aku selalu bersyukur, untuk cerita yang sudah kita tulis, dan semua halaman kosong di depan.</p><p className="letter-signature">Dengan sayang,<br /><span>aku, yang selalu memilihmu</span></p><div className="letter-wax"><Heart size={17} fill="currentColor" /></div></motion.div></motion.div>; }

function Lightbox({ index, onClose, onStep }) { return <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}><button className="lightbox-close" onClick={onClose} aria-label="Tutup galeri"><X /></button><button className="lightbox-arrow left" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Foto sebelumnya"><ArrowLeft /></button><motion.img key={index} src={imageUrl(photos[index])} alt={`Kenangan kita ${index + 1}`} initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} /><button className="lightbox-arrow right" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Foto berikutnya"><ArrowRight /></button><span className="lightbox-count">0{index + 1} <i>/</i> 0{photos.length}</span></motion.div>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
