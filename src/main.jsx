import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Music2, Play, Sparkles, X } from 'lucide-react';
import './styles.css';
import './reference.css';

const photos = [
  'photo-1516589178581-6cd7833ae3b2', 'photo-1522673607200-164d1b6ce486',
  'photo-1511895426328-dc8714191300', 'photo-1511988617509-a57c8a288659',
  'photo-1529333166437-7750a6dd5a70', 'photo-1517841905240-472988babdf9',
];
const photoUrl = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=88`;
const youtubeId = 'lY5V4hSLWY8';

function App() {
  const [page, setPage] = useState('home');
  const [lightbox, setLightbox] = useState(null);

  const go = (next) => { setPage(next); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const surprise = (kind) => {
    if (kind === 'letter') go('envelope');
    else go(kind);
  };

  return <main className="reference-app">
    <div className="curtain curtain-left" /><div className="curtain curtain-right" />
    <div className="sparkle-field" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ '--x': `${(i * 47 + 7) % 100}%`, '--y': `${(i * 61 + 9) % 100}%`, '--delay': `${(i % 8) * -.7}s` }}>✦</i>)}</div>
    <div className="edge-frame" aria-hidden="true"><span>❧</span><span>❧</span><span>❧</span><span>❧</span></div>

    <AnimatePresence mode="wait">
      {page === 'home' && <motion.section className="scene home-scene" key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65 }}>
        <div className="home-title"><span className="scene-kicker">✦ &nbsp; A LITTLE CELEBRATION OF US &nbsp; ✦</span><h1>Happy <em>Anniversary</em></h1><span className="title-flourish">────────── ❦ ──────────</span></div>
        <div className="anniversary-collage">
          <div className="paper-diamond" />
          <div className="main-parchment"><span className="pressed-bloom bloom-top">✿</span><span className="pressed-bloom bloom-side">❀</span><span className="paper-small">26 · 09 · 26</span><span className="paper-script">Love</span><span className="paper-names">Nayyyy &amp; Keillaa</span><span className="paper-note">another year of choosing each other</span><div className="wax-heart"><Heart size={33} /></div></div>
          {photos.slice(0, 4).map((photo, i) => <motion.button className={`scrap-photo scrap-${i + 1}`} key={photo} onClick={() => setLightbox(i)} whileHover={{ scale: 1.06, rotate: 0, y: -7 }} aria-label={`Buka foto kenangan ${i + 1}`}><img src={photoUrl(photo, 520)} alt={`Momen bersama ${i + 1}`} /><span>♡</span></motion.button>)}
          <div className="paper-flower paper-flower-one">✿</div><div className="paper-flower paper-flower-two">❀</div><div className="paper-flower paper-flower-three">✿</div>
          <div className="monarch">🦋</div><div className="loose-petal petal-one" /><div className="loose-petal petal-two" /><div className="loose-petal petal-three" />
        </div>
        <motion.button className="surprise-ribbon" onClick={() => go('surprises')} whileHover={{ scale: 1.04, y: -3 }}><span>TAP FOR SURPRISE</span><ArrowRight size={16} /></motion.button>
        <div className="scene-date"><span>OUR STORY</span><i>✦</i><span>26 SEPTEMBER 2026</span><i>✦</i><span>AND FOREVER AFTER</span></div>
      </motion.section>}

      {page === 'surprises' && <motion.section className="scene surprise-scene" key="surprises" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
        <div className="scene-heading"><span className="scene-kicker">✦ &nbsp; FOUR LITTLE PIECES OF US &nbsp; ✦</span><h2>Choose the <em>Surprise</em></h2><span className="title-flourish">──────── ❦ ────────</span></div>
        <div className="surprise-menu">{[
          { id: 'journey', title: 'Journey', subtitle: 'our story, chapter by chapter', picture: photos[1], decor: '📷' },
          { id: 'moment', title: 'Moment', subtitle: 'little moments, forever kept', picture: photos[2], decor: '◷' },
          { id: 'playlist', title: 'Playlist', subtitle: 'the song that feels like us', picture: null, decor: '♫' },
          { id: 'gift', title: 'Gift', subtitle: 'a little something, with love', picture: photos[4], decor: '🎁' },
        ].map((item, index) => <motion.button className={`surprise-choice choice-${item.id}`} key={item.id} onClick={() => surprise(item.id)} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .12 }} whileHover={{ y: -9, rotate: index % 2 ? 1 : -1 }}><span className="choice-number">0{index + 1}</span><span className="choice-object">{item.picture ? <img src={photoUrl(item.picture, 500)} alt="" /> : <span className="record-art"><i /><i /><i /><b>♫</b></span>}<span className="choice-decor">{item.decor}</span></span><span className="choice-title">{item.title}</span><span className="choice-subtitle">{item.subtitle}</span><span className="choice-underline" /></motion.button>)}</div>
        <button className="return-ribbon" onClick={() => go('envelope')}>TAP FOR SURPRISE <span>♡</span></button>
        <BackButton onClick={() => go('home')} />
      </motion.section>}

      {page === 'envelope' && <motion.section className="scene envelope-scene" key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <BackButton onClick={() => go('surprises')} /><div className="scene-heading"><span className="scene-kicker">A NOTE, SEALED WITH LOVE</span><h2>Press the <em>Envelope</em></h2><span className="title-flourish">──────── ❦ ────────</span></div>
        <motion.button className="envelope-art" onClick={() => go('letter')} whileHover={{ y: -8, scale: 1.025 }}><span className="envelope-flap" /><span className="envelope-seal"><Heart size={33} /></span><span className="envelope-stamp">FOR YOU</span></motion.button>
        <button className="continue-script" onClick={() => go('letter')}>tap to continue <ArrowRight size={14} /></button>
      </motion.section>}

      {page === 'letter' && <motion.section className="scene letter-scene" key="letter" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }}>
        <BackButton onClick={() => go('surprises')} /><h2 className="couple-heading">Nayyyy <i>&amp;</i> Keillaa</h2>
        <div className="letter-layout"><article className="love-letter"><div className="rose-border">✿　❀　✿　❀　✿</div><span className="letter-date">26 SEPTEMBER 2026</span><p>Happy anniversary, sayang. Terima kasih ya sudah mau berjalan sejauh ini sama aku, melewati banyak hal baik dan sulit sama-sama.</p><p>Hadirmu bikin hari-hariku jauh lebih berarti dan berwarna. Aku bersyukur banget bisa punya kamu di hidupku. Semoga kita bisa terus saling jaga, terus tumbuh, dan selalu pulang ke satu sama lain.</p><p className="letter-end">I would choose you,<br />in every lifetime. <span>♡</span></p><div className="rose-border bottom-border">✿　❀　✿　❀　✿</div></article><div className="letter-memory"><div className="gold-frame"><img src={photoUrl(photos[0], 800)} alt="Foto kenangan kita" /></div><div className="red-roses">🌹<br />🌹</div><button className="vinyl-play" onClick={() => go('playlist')} aria-label="Buka playlist YouTube"><span className="vinyl-grooves" /><span className="vinyl-label"><Play size={29} fill="currentColor" /></span></button></div></div>
      </motion.section>}

      {page === 'moment' && <motion.section className="scene moment-scene" key="moment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BackButton onClick={() => go('surprises')} /><div className="scene-heading"><span className="scene-kicker">OUR DAYS, PRESERVED IN LITTLE FRAMES</span><h2>Happy <em>Anniversary</em></h2></div><div className="memory-board">{photos.map((photo, i) => <motion.button key={photo} className={`memory-photo memory-${i + 1}`} onClick={() => setLightbox(i)} whileHover={{ scale: 1.06, rotate: 0, zIndex: 3 }}><img src={photoUrl(photo, 700)} alt={`Kenangan ${i + 1}`} /><span>{['the first hello', 'our little escape', 'my favorite day', 'golden hours', 'just us', 'always you'][i]}</span></motion.button>)}<span className="board-heart board-heart-one">♥</span><span className="board-heart board-heart-two">♡</span><span className="planet planet-one">🪐</span><span className="planet planet-two">🪐</span></div><p className="memory-date">26 · 09 · 26</p></motion.section>}

      {page === 'journey' && <motion.section className="scene journey-scene" key="journey" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BackButton onClick={() => go('surprises')} /><div className="scene-heading"><span className="scene-kicker">FROM OUR FIRST HELLO, TO HERE</span><h2>Our <em>Journey</em></h2></div><div className="journey-content"><img src={photoUrl(photos[1], 1000)} alt="Petualangan bersama" /><div className="journey-caption"><span>CHAPTER ONE · 2023</span><p>Semua berawal dari sapaan sederhana. Lalu hari demi hari, kamu jadi bagian paling indah dari setiap ceritaku.</p><span className="journey-sign">to be continued, with you <Heart size={15} /></span></div></div></motion.section>}

      {page === 'gift' && <motion.section className="scene gift-scene" key="gift" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BackButton onClick={() => go('surprises')} /><div className="scene-heading"><span className="scene-kicker">A LITTLE SOMETHING JUST FOR YOU</span><h2>With all my <em>Love</em></h2></div><div className="gift-card"><div className="gift-photo"><img src={photoUrl(photos[4], 900)} alt="Kenangan istimewa" /></div><div className="gift-copy"><Sparkles size={22} /><p>Hadiah terbaikku bukan sesuatu yang bisa dibungkus. Tapi semua hari yang masih bisa kita jalani bersama.</p><span>open whenever you miss me</span><button onClick={() => go('letter')}>Buka surat kecil <ArrowRight size={14} /></button></div></div></motion.section>}

      {page === 'playlist' && <motion.section className="scene playlist-scene" key="playlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><BackButton onClick={() => go('surprises')} /><div className="scene-heading"><span className="scene-kicker">OUR SOUNDTRACK · A SONG THAT FEELS LIKE US</span><h2>A song for <em>us</em></h2><span className="title-flourish">──────── ❦ ────────</span></div><div className="playlist-showcase"><div className="youtube-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`} title="Bruno Mars - Risk It All (Official Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div><div className="playlist-photo-stack" aria-label="Foto kenangan berbingkai"><div className="playlist-gold-frame playlist-frame-main"><img src={photoUrl(photos[0], 650)} alt="Foto kenangan kita" /><span>you &amp; me</span></div><div className="playlist-gold-frame playlist-frame-side"><img src={photoUrl(photos[4], 500)} alt="Kenangan kecil bersama" /><span>our little days</span></div><div className="playlist-gold-frame playlist-frame-mini"><img src={photoUrl(photos[5], 400)} alt="Momen favorit kita" /></div><span className="playlist-stack-heart">♡</span></div><div className="playlist-details"><span className="playlist-eyebrow"><Music2 size={13} /> OUR LITTLE PLAYLIST</span><h3>Risk It All</h3><p className="playlist-artist">Bruno Mars</p><p className="playlist-note">Satu lagu yang terdengar seperti janji kita.</p><a className="youtube-link" href={`https://www.youtube.com/watch?v=${youtubeId}`} target="_blank" rel="noreferrer">Buka di YouTube ↗</a></div></div></motion.section>}
    </AnimatePresence>

    <footer className="scene-footer"><span>MADE WITH <Heart size={12} fill="currentColor" /> FOR US</span><button onClick={() => go('home')}>OUR LITTLE UNIVERSE</button><span>26 · 09 · 26</span></footer>
    <AnimatePresence>{lightbox !== null && <motion.div className="memory-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} aria-label="Tutup"><X /></button><img src={photoUrl(photos[lightbox], 1500)} alt={`Foto kenangan ${lightbox + 1}`} onClick={(event) => event.stopPropagation()} /></motion.div>}</AnimatePresence>
  </main>;
}

function BackButton({ onClick }) { return <button className="back-control" onClick={onClick}><ArrowLeft size={15} /> BACK</button>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
