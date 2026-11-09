import { useEffect, useMemo, useState } from 'react'
import { articles, categories } from './data/articles'

const tiles = [
  { name: 'Skincare Notes', text: 'Ingredients, routines, product discoveries, and skincare discussions.', filter: 'Skincare' },
  { name: 'Makeup & Beauty', text: 'Makeup inspiration, product recommendations, techniques, and beauty discoveries.', filter: 'Makeup' },
  { name: 'Beauty Culture', text: 'Conversations about beauty standards, trends, personal experiences, and the beauty industry.', filter: 'Beauty Culture' },
  { name: 'The Beauty Edit', text: 'Interesting observations, personal essays, and other beauty-related reads.', filter: 'Beauty Trends' },
]
const social = ['Instagram', 'Pinterest', 'Substack'] // replace '#' links in <Follow /> with your own

const Cover = ({ a }) => a.coverImage
  ? <img className="cover" src={a.coverImage} alt="" loading="lazy" decoding="async" />
  : <div className={'cover ph ph' + (categories.indexOf(a.category) % 6)}><span>{a.category}</span></div>

const ReadLink = ({ a }) => a.originalUrl
  ? <a className="btn" href={a.originalUrl} target="_blank" rel="noopener noreferrer">Read on Substack</a>
  : <span className="muted">Link coming soon</span>

export default function App() {
  const [cat, setCat] = useState('All Reads')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)
  const [menu, setMenu] = useState(false)

  const sorted = useMemo(() => [...articles].sort((x, y) => y.dateAdded.localeCompare(x.dateAdded)), [])
  const picks = sorted.filter(a => a.featured).slice(0, 4)
  const shown = sorted.filter(a => {
    const hay = [a.title, a.author, a.publication, a.category, a.shortDescription, a.whyRecommend].join(' ').toLowerCase()
    return (cat === 'All Reads' || a.category === cat) && hay.includes(q.trim().toLowerCase())
  })
  useEffect(() => {
    const k = e => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])
  const go = id => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  const pickCat = c => { setCat(c); go('shelf') }
  const links = [['Home', 'top'], ['Latest Reads', 'shelf'], ['Categories', 'categories'], ['About', 'about'], ['Contact', 'follow']]

  return (<div id="top">
    <header className="nav">
      <a className="logo" href="#top">The Beauty Reading Edit</a>
      <button className="menu-btn" aria-expanded={menu} aria-controls="links" onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'}</button>
      <nav id="links" className={menu ? 'open' : ''} aria-label="Main">
        {links.map(([t, id]) => <a key={id} href={'#' + id} onClick={e => { e.preventDefault(); go(id) }}>{t}</a>)}
        <input type="search" aria-label="Search reads" placeholder="Search reads" value={q}
          onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && go('shelf')} />
      </nav>
    </header>

    <main>
      <section className="hero">
        <div>
          <p className="muted">The Beauty Reading Edit</p>
          <h1>Your Next Good Read Starts Here.</h1>
          <p className="lede">A little corner of the internet for discovering thoughtful reads about beauty, skincare, makeup, and the culture surrounding them.</p>
          <button className="btn" onClick={() => go('shelf')}>Explore the Reads</button>
        </div>
        <div className="collage" aria-hidden="true">
          {['Skincare', 'Makeup', 'Beauty Culture'].map((c, i) => <div key={c} className={'cover ph ph' + i}><span>{c}</span></div>)}
        </div>
      </section>

      <section className="sec">
        <h2>Currently on My Reading List</h2>
        <p className="lede">Articles that caught my attention and deserve a little space on your reading list.</p>
        <div className="picks">
          {picks.map(a => (
            <article key={a.id} className="pick">
              <Cover a={a} />
              <div>
                <p className="muted">{a.category}{a.sample && ' (sample content)'}</p>
                <h3><button className="linkish" onClick={() => setOpen(a)}>{a.title}</button></h3>
                <p className="muted">{a.publication}, by {a.author}</p>
                <p>{a.shortDescription}</p>
                <p className="why"><em>Why I recommend it:</em> {a.whyRecommend}</p>
                <ReadLink a={a} />
              </div>
            </article>))}
        </div>
      </section>

      <section id="shelf" className="sec">
        <h2>The Reading Shelf</h2>
        <div className="filters" role="group" aria-label="Filter by category">
          {['All Reads', ...categories].map(c => <button key={c} aria-pressed={cat === c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
        </div>
        <input className="search" type="search" aria-label="Search by title, publication, author or keyword" placeholder="Search by title, publication, author, or keyword" value={q} onChange={e => setQ(e.target.value)} />
        <p className="muted" aria-live="polite">{shown.length} {shown.length === 1 ? 'read' : 'reads'}</p>
        {shown.length === 0 && <p>Nothing matches yet. Try another category or a different keyword.</p>}
        <div className="masonry">
          {shown.map(a => (
            <article key={a.id} className="card">
              <button className="cardbtn" onClick={() => setOpen(a)} aria-label={'Open ' + a.title}><Cover a={a} /></button>
              <p className="muted">{a.category}{a.sample && ' (sample)'}</p>
              <h3><button className="linkish" onClick={() => setOpen(a)}>{a.title}</button></h3>
              <p className="muted">{a.publication}, by {a.author}</p>
              <p>{a.shortDescription}</p>
              <p className="why">{a.whyRecommend}</p>
            </article>))}
        </div>
      </section>

      <section id="categories" className="sec">
        <h2>Browse by Topic</h2>
        <div className="tiles">
          {tiles.map(t => <button key={t.name} className="tile" onClick={() => pickCat(t.filter)}><strong>{t.name}</strong><span>{t.text}</span></button>)}
        </div>
      </section>

      <section className="sec narrow">
        <h2>A Little More Than Just Reading</h2>
        <p>I enjoy discovering thoughtful perspectives on beauty, skincare, makeup, and the culture surrounding them.</p>
        <p>This space is where I collect the articles that make me pause, learn something new, or see familiar topics differently.</p>
        <p>Not everything I read makes it onto the list. These are the reads I find interesting enough to pass along.</p>
      </section>

      <section id="about" className="sec narrow">
        <h2>Behind the Reading List</h2>
        <p>Hello! I'm the person behind The Beauty Reading Edit.</p>
        <p>I created this space to collect and share interesting Substack readings about beauty, skincare, makeup, and related topics.</p>
        <p>I enjoy exploring different perspectives, discovering new writers, and finding articles that are genuinely worth recommending.</p>
        <p>Think of this website as a little reading corner where you can find something interesting for your next coffee break.</p>
      </section>

      <section id="follow" className="sec narrow">
        <h2>Stay in the Reading Loop</h2>
        <p>Discover new reads, interesting perspectives, and little things worth adding to your reading list.</p>
        <p className="socials">{social.map(s => <a key={s} href="#follow" className="btn ghost">{s}</a>)}</p>
      </section>
    </main>

    <footer>
      <strong>The Beauty Reading Edit</strong>
      <p>Good reads for your beauty-obsessed mind.</p>
      <p>{links.map(([t, id]) => <a key={id} href={'#' + id}>{t}</a>)}</p>
      <p className="muted">All articles belong to their respective authors and publications. Recommendations link to the original sources.</p>
      <p className="muted">© {new Date().getFullYear()} The Beauty Reading Edit</p>
    </footer>

    {open && (
      <div className="overlay" onClick={() => setOpen(null)}>
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="mt" onClick={e => e.stopPropagation()}>
          <button className="close" autoFocus onClick={() => setOpen(null)}>Close</button>
          <Cover a={open} />
          <div>
            <p className="muted">{open.category}{open.sample && ' (sample content)'}</p>
            <h3 id="mt">{open.title}</h3>
            <p className="muted">{open.publication}, by {open.author}</p>
            <p>{open.shortDescription}</p>
            <p className="why"><em>Why I recommend it:</em> {open.whyRecommend}</p>
            <ReadLink a={open} />
          </div>
        </div>
      </div>)}
  </div>)
}
