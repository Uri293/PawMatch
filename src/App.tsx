import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import {
  ArrowDown, ArrowRight, Bell, Bookmark, Check, ChevronDown, Heart,
  Home, MapPin, MessageCircle, PawPrint, Plus, Search, Send, Sparkles,
  X, Cat, Rabbit, Dog, BadgeCheck,
} from 'lucide-react'
import { pets, type Pet } from './pets'

type Category = 'All Pets' | Pet['species']
type NavItem = 'Home' | 'Discover' | 'Match' | 'Chats' | 'Profile'

const categories: { label: Category; Icon: typeof PawPrint }[] = [
  { label: 'All Pets', Icon: PawPrint },
  { label: 'Dogs', Icon: Dog },
  { label: 'Cats', Icon: Cat },
  { label: 'Rabbits', Icon: Rabbit },
  { label: 'Others', Icon: Sparkles },
]

function Logo() {
  return <a className="brand" href="#home" aria-label="PawMatch home"><span className="brand-mark"><PawPrint size={21} strokeWidth={2.2} /></span><span>paw<span>match</span></span></a>
}

function Navbar({ active, onNavigate, likedCount }: { active: NavItem; onNavigate: (item: NavItem) => void; likedCount: number }) {
  const nav: { label: NavItem; Icon: typeof Home }[] = [
    { label: 'Home', Icon: Home }, { label: 'Discover', Icon: Search }, { label: 'Match', Icon: Heart },
    { label: 'Chats', Icon: MessageCircle },
  ]
  return (
    <header className="topbar">
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map(({ label, Icon }) => <button key={label} className={`nav-link ${active === label ? 'active' : ''}`} onClick={() => onNavigate(label)}>
          <Icon size={17} strokeWidth={1.9} /><span>{label}</span>{label === 'Match' && likedCount > 0 && <span className="nav-count">{likedCount}</span>}
        </button>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-button notification-button" aria-label="Recent conversations" title="Recent conversations" onClick={() => onNavigate('Chats')}><Bell size={18} /><i /></button>
        <button className="nav-avatar" onClick={() => onNavigate('Profile')} aria-label="Open profile"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80" alt="Your profile" /></button>
      </div>
    </header>
  )
}

function HeroSection({ onDiscover }: { onDiscover: () => void }) {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> A little more tail-wagging, together</div>
        <h1>Good friends.<br /><span>Great walks.</span></h1>
        <p>Find your pet's perfect match.</p>
        <div className="hero-actions"><button className="button button-dark" onClick={onDiscover}>Start discovering <ArrowRight size={17} /></button><span className="hero-note"><span className="mini-avatars"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80" alt="" /><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&q=80" alt="" /><img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=64&q=80" alt="" /></span>Good pets, good people</span></div>
      </div>
      <div className="hero-visual" aria-label="Pets ready to meet">
        <div className="hero-photo hero-photo-main"><img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=88" alt="A happy dog enjoying the sunshine" /></div>
        <div className="hero-photo hero-photo-small"><img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=500&q=85" alt="A curious cat" /></div>
        <div className="hero-sticker"><Heart size={15} fill="currentColor" /><span>made for<br />meeting</span></div>
        <span className="hero-sparkle sparkle-one">✳</span><span className="hero-sparkle sparkle-two">✳</span>
        <div className="hero-caption"><span className="caption-dot" /> Local pets, lovely connections</div>
      </div>
      <a className="hero-scroll" href="#discover"><span>Take a look around</span><ArrowDown size={15} /></a>
    </section>
  )
}

function DiscoverPage({ onLike, onOpen }: { onLike: (id: number) => void; onOpen: (pet: Pet) => void }) {
  const [species, setSpecies] = useState<Category>('Dogs')
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const swipeTimer = useRef<number | null>(null)
  const ignoreCardClick = useRef(false)
  const filteredPets = pets.filter((pet) => species === 'All Pets' || pet.species === species)
  const activePet = filteredPets[cardIndex]
  const nextPet = filteredPets[(cardIndex + 1) % filteredPets.length]
  const lastPet = filteredPets[(cardIndex + 2) % filteredPets.length]
  const category = categories.find((item) => item.label === species) ?? categories[0]
  const CategoryIcon = category.Icon
  const advance = (liked: boolean) => {
    if (activePet && liked) onLike(activePet.id)
    setCardIndex((current) => current + 1)
  }
  useEffect(() => () => { if (swipeTimer.current !== null) window.clearTimeout(swipeTimer.current) }, [])
  const finishSwipe = (direction: 'left' | 'right') => {
    if (!activePet || swipeDirection) return
    ignoreCardClick.current = true
    setIsDragging(false)
    setSwipeDirection(direction)
    setDragOffset((direction === 'right' ? 1 : -1) * Math.max(window.innerWidth, 450))
    swipeTimer.current = window.setTimeout(() => {
      if (direction === 'right') onLike(activePet.id)
      setCardIndex((current) => current + 1)
      setDragOffset(0)
      setSwipeDirection(null)
      ignoreCardClick.current = false
      swipeTimer.current = null
    }, 190)
  }
  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (swipeDirection || (event.pointerType === 'mouse' && event.button !== 0)) return
    dragStart.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }
  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current) return
    const deltaX = event.clientX - dragStart.current.x
    const deltaY = event.clientY - dragStart.current.y
    if (Math.abs(deltaY) > 14 && Math.abs(deltaY) > Math.abs(deltaX)) {
      dragStart.current = null
      setDragOffset(0)
      setIsDragging(false)
      return
    }
    setDragOffset(deltaX)
  }
  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!dragStart.current) return
    const deltaX = event.clientX - dragStart.current.x
    dragStart.current = null
    if (Math.abs(deltaX) >= 90) finishSwipe(deltaX > 0 ? 'right' : 'left')
    else { setDragOffset(0); setIsDragging(false) }
  }
  const handleCardClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (ignoreCardClick.current) { event.preventDefault(); ignoreCardClick.current = false; return }
    if (activePet) onOpen(activePet)
  }
  const shortAge = activePet?.age.replace(' years', ' yrs').replace(' year', ' yr').replace(' months', ' mos').replace(' month', ' mo')

  return <section className="match-discover" id="discover">
    <PawPrint className="discover-paw discover-paw-left" aria-hidden="true" />
    <PawPrint className="discover-paw discover-paw-right" aria-hidden="true" />
    <PawPrint className="discover-paw discover-paw-bottom" aria-hidden="true" />
    <div className="discover-title"><h1>Find your pet's<br />perfect match!</h1><Heart className="title-heart" size={43} strokeWidth={2.2} /></div>
    <div className="species-picker">
      <button className={`species-trigger ${categoryOpen ? 'is-open' : ''}`} onClick={() => setCategoryOpen(!categoryOpen)} aria-expanded={categoryOpen} aria-label={`Pet type: ${species}`}><CategoryIcon size={20} /><span>{species}</span><ChevronDown size={16} /></button>
      {categoryOpen && <div className="species-menu" role="group" aria-label="Choose a pet type">{categories.map(({ label, Icon }) => <button key={label} className={species === label ? 'selected' : ''} onClick={() => { setSpecies(label); setCardIndex(0); setCategoryOpen(false) }}><Icon size={16} /><span>{label}</span>{species === label && <Check size={14} />}</button>)}</div>}
    </div>
    {activePet ? <>
      <div className="match-card-stage">
        {lastPet && <div className="match-card match-card-back match-card-back-two" aria-hidden="true"><img src={lastPet.image} alt="" /></div>}
        {nextPet && <div className="match-card match-card-back match-card-back-one" aria-hidden="true"><img src={nextPet.image} alt="" /></div>}
        <article className={`match-card match-card-front ${isDragging ? 'is-dragging' : ''} ${swipeDirection ? `is-swiping-${swipeDirection}` : ''}`} style={dragOffset ? { transform: `translateX(${dragOffset}px) rotate(${2.2 + dragOffset * 0.025}deg)`, transition: isDragging ? 'none' : undefined } : undefined}>
          <button className="match-card-open" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={() => { dragStart.current = null; setDragOffset(0); setIsDragging(false) }} onClick={handleCardClick} aria-label={`Open ${activePet.name}'s profile`}>
            <img className="match-card-image" src={activePet.image} alt={`${activePet.name}, ${activePet.breed}`} />
            <span className="match-card-shade" />
            <span className="match-card-info"><span className="match-name-row"><strong>{activePet.name}</strong><BadgeCheck size={20} fill="#61a8ea" stroke="white" /></span><span className="match-facts"><span><PawPrint size={13} />{shortAge}</span><i />{activePet.gender}<i />{activePet.distance}</span><span className="match-tags">{activePet.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</span></span>
            <span className={`swipe-stamp stamp-like ${dragOffset > 24 ? 'is-visible' : ''}`}>LIKE</span>
            <span className={`swipe-stamp stamp-pass ${dragOffset < -24 ? 'is-visible' : ''}`}>PASS</span>
          </button>
          <button className={`match-card-heart ${'liked'}`} onClick={(event) => { event.stopPropagation(); onLike(activePet.id) }} aria-label={`Like ${activePet.name}`} title={`Like ${activePet.name}`}><Heart size={30} /></button>
        </article>
      </div>
      <div className="match-controls" aria-label="Choose an action">
        <button className="match-control control-pass" onClick={() => advance(false)} aria-label={`Pass on ${activePet.name}`} title="Pass"><X size={31} /></button>
        <button className="match-control control-paw" onClick={() => advance(true)} aria-label={`Send ${activePet.name} a super like`} title="Super like"><PawPrint size={31} fill="currentColor" /></button>
        <button className="match-control control-heart" onClick={() => advance(true)} aria-label={`Like ${activePet.name}`} title="Like"><Heart size={28} fill="currentColor" /></button>
      </div>
    </> : <div className="match-empty"><span><PawPrint size={29} /></span><h2>That's everyone for now.</h2><p>Try another kind of pet or take another look around.</p><button className="button button-dark" onClick={() => setCardIndex(0)}>Start over <ArrowRight size={16} /></button></div>}
  </section>
}

function PetCategories({ category, setCategory }: { category: Category; setCategory: (category: Category) => void }) {
  return <div className="category-row" role="group" aria-label="Filter by pet type">
    <div className="category-intro"><span>THE NEIGHBORHOOD</span><strong>Find your kind</strong></div>
    <div className="category-options">{categories.map(({ label, Icon }) => <button key={label} className={`category-button ${category === label ? 'selected' : ''}`} onClick={() => setCategory(label)} aria-pressed={category === label}><Icon size={16} strokeWidth={1.9} /><span>{label}</span></button>)}</div>
    <button className="filter-button" title="Show all pet types" aria-label="Show all pet types" onClick={() => setCategory('All Pets')}><X size={15} /></button>
  </div>
}

function PetImageCard({ pet, liked, saved, onLike, onSave, onOpen, index }: {
  pet: Pet; liked: boolean; saved: boolean; onLike: () => void; onSave: () => void; onOpen: () => void; index: number
}) {
  return <article className="pet-card" style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}>
    <button className="pet-photo-button" onClick={onOpen} aria-label={`View ${pet.name}'s profile`}>
      <img className="pet-photo" src={pet.image} alt={`${pet.name}, ${pet.breed}`} loading="lazy" />
      <span className="photo-shade" />
      <span className="photo-location"><MapPin size={12} />{pet.distance}</span>
    </button>
    <button className={`card-like ${liked ? 'liked' : ''}`} onClick={onLike} aria-label={liked ? `Unlike ${pet.name}` : `Like ${pet.name}`} aria-pressed={liked}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /></button>
    <button className={`card-save ${saved ? 'saved' : ''}`} onClick={onSave} aria-label={saved ? `Unsave ${pet.name}` : `Save ${pet.name}`} title={saved ? 'Saved' : 'Save'}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /></button>
    <button className="pet-card-info" onClick={onOpen}>
      <span className="pet-card-title"><strong>{pet.name}</strong><span>{pet.age}</span></span>
      <span className="pet-card-breed">{pet.breed}</span>
    </button>
  </article>
}

function PetMasonryGrid({ list, likedIds, savedIds, onLike, onSave, onOpen }: {
  list: Pet[]; likedIds: Set<number>; savedIds: Set<number>; onLike: (id: number) => void; onSave: (id: number) => void; onOpen: (pet: Pet) => void
}) {
  if (!list.length) return <div className="empty-state"><span className="empty-icon"><Heart size={22} /></span><h3>No new introductions yet</h3><p>Like a few pets and your mutual matches will show up here.</p><button className="button button-dark" onClick={() => document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' })}>Meet some pets <ArrowRight size={16} /></button></div>
  return <div className="masonry-grid">{list.map((pet, index) => <PetImageCard key={pet.id} pet={pet} index={index} liked={likedIds.has(pet.id)} saved={savedIds.has(pet.id)} onLike={() => onLike(pet.id)} onSave={() => onSave(pet.id)} onOpen={() => onOpen(pet)} />)}</div>
}

function PetDetailModal({ pet, liked, saved, onLike, onSave, onClose }: { pet: Pet; liked: boolean; saved: boolean; onLike: () => void; onSave: () => void; onClose: () => void }) {
  const [activePhoto, setActivePhoto] = useState(pet.photos[0])
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.classList.remove('modal-open') }
  }, [onClose])
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="pet-modal" role="dialog" aria-modal="true" aria-label={`${pet.name}'s profile`}>
      <button className="modal-close" onClick={onClose} aria-label="Close profile"><X size={20} /></button>
      <div className="modal-gallery">
        <img className="modal-main-image" src={activePhoto} alt={`${pet.name}`} />
        <div className="modal-thumbnails">{pet.photos.map((image, index) => <button key={image} className={activePhoto === image ? 'thumb-active' : ''} onClick={() => setActivePhoto(image)} aria-label={`View photo ${index + 1}`}><img src={image} alt="" /></button>)}</div>
      </div>
      <div className="modal-content">
        <div className="modal-kicker">A new friend nearby <span className="online-dot" /></div>
        <div className="modal-title-row"><div><h2>{pet.name}<span className="pet-gender"> · {pet.gender}</span></h2><p>{pet.age} <span>·</span> {pet.breed}</p></div><button className={`round-action ${saved ? 'is-saved' : ''}`} onClick={onSave} aria-label={saved ? 'Remove bookmark' : 'Bookmark profile'}><Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /></button></div>
        <div className="detail-facts"><span><PawPrint size={15} />{pet.species.slice(0, -1) || pet.species}</span><span><MapPin size={15} />{pet.distance}</span></div>
        <div className="detail-divider" />
        <h3>A little about {pet.name}</h3><p className="pet-intro">{pet.intro}</p>
        <div className="tag-list">{pet.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="owner-row"><img src={pet.ownerImage} alt={pet.owner} /><div><strong>{pet.owner}</strong><span>Pet parent since 2023</span></div><button className="owner-follow" aria-label={`View ${pet.owner}'s profile`}><ArrowRight size={16} /></button></div>
        <div className="modal-actions"><button className={`button ${liked ? 'button-liked' : 'button-yellow'}`} onClick={onLike}><Heart size={17} fill={liked ? 'currentColor' : 'none'} />{liked ? 'Liked' : 'Send a like'}</button><button className="button button-outline" onClick={() => window.dispatchEvent(new CustomEvent('pawmatch-chat', { detail: pet }))}><MessageCircle size={17} />Say hello</button></div>
        <p className="modal-footnote"><Check size={13} /> Kind connections start with a hello.</p>
      </div>
    </section>
  </div>
}

function HowItWorks() {
  const steps = [
    { icon: <PawPrint size={21} />, number: '01', title: 'Make a little profile', copy: 'Show the neighborhood who your pet is and what makes them wonderful.' },
    { icon: <Search size={21} />, number: '02', title: 'Find your kind', copy: 'Meet nearby pets with the right energy, interests, and walk pace.' },
    { icon: <Heart size={21} />, number: '03', title: 'Let friendship happen', copy: 'Send a like, say hello, and plan your first tail-wagging meetup.' },
  ]
  return <section className="how-section" id="how"><div className="section-heading"><span className="section-eyebrow">A FRIENDLY LITTLE ROUTINE</span><h2>Three steps to <span>more playdates.</span></h2></div><div className="steps-row">{steps.map((step) => <article className="step" key={step.number}><div className="step-top"><span className="step-icon">{step.icon}</span><span className="step-number">{step.number}</span></div><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div></section>
}

function CommunityCTA({ onJoin }: { onJoin: () => void }) {
  return <section className="community-cta"><div className="cta-mark"><PawPrint size={25} /></div><div><span className="section-eyebrow">A GOOD THING IS GROWING</span><h2>Every pet deserves<br /><span>a friend.</span></h2><p>Join a neighborhood full of happy hellos and really good sniff walks.</p></div><button className="button button-dark" onClick={onJoin}>Join the neighborhood <ArrowRight size={17} /></button><span className="cta-flower flower-a">✳</span><span className="cta-flower flower-b">✳</span></section>
}

function Footer({ onNavigate }: { onNavigate: (item: NavItem) => void }) {
  return <footer className="footer"><div className="footer-top"><div className="footer-brand"><Logo /><p>Good friends, great walks, and a little more joy in every day.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#discover">Discover pets</a><a href="#how">How it works</a><a href="#home">About PawMatch</a></div><div><span>THE LITTLE THINGS</span><a href="#footer">Community guidelines</a><a href="#footer">Privacy & terms</a><a href="mailto:hello@pawmatch.pet">Say hello</a></div></div><div className="footer-social"><span>FOLLOW THE PAWS</span><div><a href="#footer" aria-label="Instagram">ig</a><a href="#footer" aria-label="TikTok">tk</a><a href="#footer" aria-label="Facebook">f</a></div></div></div><div className="footer-bottom" id="footer"><span>© 2025 PawMatch Social Club</span><span>Made for the love of pets <Heart size={12} fill="currentColor" /></span><button onClick={() => onNavigate('Profile')}>Your account <ArrowRight size={13} /></button></div></footer>
}

function SidePanel({ type, onClose, likedCount, chatPet }: { type: 'Chats' | 'Profile' | 'Join'; onClose: () => void; likedCount: number; chatPet: Pet | null }) {
  const [message, setMessage] = useState('')
  const [sentMessages, setSentMessages] = useState<string[]>([])
  const [joined, setJoined] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [addingPet, setAddingPet] = useState(false)
  const [profileName, setProfileName] = useState('Alex Morgan')
  const [newPetName, setNewPetName] = useState('')
  const [newPetBreed, setNewPetBreed] = useState('')
  const [addedPet, setAddedPet] = useState<{ name: string; breed: string } | null>(null)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.classList.remove('modal-open') }
  }, [onClose])
  const title = type === 'Chats' ? 'Your conversations' : type === 'Join' ? 'Join the neighborhood' : 'Your little corner'
  return <div className="modal-backdrop side-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="side-panel" role="dialog" aria-modal="true" aria-label={title}><button className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button><div className="panel-topline"><span className="section-eyebrow">PAWMATCH SOCIAL CLUB</span><h2>{title}</h2></div>
    {type === 'Chats' ? <div className="chat-list"><p className="panel-description">The start of a lovely friendship.</p>{chatPet && <div className="chat-intro"><img src={chatPet.image} alt={chatPet.name} /><span><strong>Say hello to {chatPet.name}</strong><small>{chatPet.owner} will see your message</small></span></div>}{['Milo & Sophie', 'Olive & Avery', 'Clover & Morgan'].map((name, index) => <button className="chat-item" key={name}><span className="chat-avatar"><img src={pets[index].image} alt="" /><i /></span><span className="chat-text"><strong>{name}</strong><span>{index === 0 ? 'Milo would love a park playdate!' : index === 1 ? 'Olive says hello' : 'You: That sounds lovely!'}</span></span><span className="chat-time">{index === 0 ? '2m' : index === 1 ? '1h' : '1d'}</span></button>)}{sentMessages.map((sentMessage, index) => <div className="sent-message" key={`${sentMessage}-${index}`}>{sentMessage}</div>)}<form className="chat-compose" onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setSentMessages([...sentMessages, message.trim()]); setMessage('') } }}><input aria-label="Message" placeholder="Write a little hello..." value={message} onChange={(event) => setMessage(event.target.value)} /><button aria-label="Send message" type="submit"><Send size={17} /></button></form></div> : type === 'Profile' ? <div className="profile-panel-content"><div className="profile-cover"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Your profile" /><button className="profile-edit" onClick={() => setEditingProfile(!editingProfile)}>{editingProfile ? 'Cancel' : 'Edit profile'}</button></div>{editingProfile ? <form className="profile-edit-form" onSubmit={(event) => { event.preventDefault(); setEditingProfile(false) }}><label>Name<input value={profileName} onChange={(event) => setProfileName(event.target.value)} /></label><button className="button button-dark" type="submit">Save changes <Check size={15} /></button></form> : <><h3>{profileName}</h3><p className="profile-location"><MapPin size={14} /> Portland, OR</p><p className="panel-description">Proud human to a very good dog. Always up for a new walking route.</p></>}<div className="profile-stats"><div><strong>{addedPet ? 2 : 1}</strong><span>Pet profile</span></div><div><strong>{likedCount}</strong><span>Likes sent</span></div><div><strong>3</strong><span>New friends</span></div></div><div className="my-pet-row"><img src={pets[0].image} alt="Milo" /><div><strong>Milo</strong><span>Golden Retriever · 2 years</span></div><button aria-label="View Milo's profile" onClick={() => window.dispatchEvent(new CustomEvent('pawmatch-open-pet', { detail: pets[0] }))}><ArrowRight size={16} /></button></div>{addedPet && <div className="my-pet-row added-pet-row"><span className="added-pet-icon"><PawPrint size={18} /></span><div><strong>{addedPet.name}</strong><span>{addedPet.breed}</span></div></div>}{addingPet && <form className="add-pet-form" onSubmit={(event) => { event.preventDefault(); setAddedPet({ name: newPetName.trim(), breed: newPetBreed.trim() }); setAddingPet(false); setNewPetName(''); setNewPetBreed('') }}><label>Pet's name<input placeholder="e.g. Poppy" value={newPetName} onChange={(event) => setNewPetName(event.target.value)} required /></label><label>Breed<input placeholder="e.g. Beagle mix" value={newPetBreed} onChange={(event) => setNewPetBreed(event.target.value)} required /></label><button className="button button-dark" type="submit">Save pet profile <Check size={15} /></button></form>}{!addingPet && <button className="button button-yellow profile-add" onClick={() => setAddingPet(true)}><Plus size={17} />Add a pet profile</button>}</div> : <div className="join-content">{joined ? <><span className="join-illustration"><Check size={34} /></span><h3 className="join-success">You're on the list!</h3><p className="panel-description">We'll be in touch soon. Your pet's next best friend could be just around the corner.</p></> : <><span className="join-illustration"><PawPrint size={38} /></span><p className="panel-description">A little more connection makes the neighborhood better. Set up your pet's profile and start meeting your kind.</p><label>Your name<input placeholder="e.g. Alex Morgan" required /></label><label>Your email<input type="email" placeholder="you@example.com" required /></label><button className="button button-dark join-submit" onClick={() => setJoined(true)}>Create your account <ArrowRight size={17} /></button><span className="join-note"><Check size={13} /> Free to join. Made for pet people.</span></>}</div>}
  </section></div>
}

function App() {
  const [category, setCategory] = useState<Category>('All Pets')
  const [activeNav, setActiveNav] = useState<NavItem>('Discover')
  const [likedIds, setLikedIds] = useState<Set<number>>(() => new Set())
  const [savedIds, setSavedIds] = useState<Set<number>>(() => new Set())
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [panel, setPanel] = useState<'Chats' | 'Profile' | 'Join' | null>(null)
  const [showMatches, setShowMatches] = useState(false)
  const [sortNearest, setSortNearest] = useState(true)
  const [chatPet, setChatPet] = useState<Pet | null>(null)

  useEffect(() => {
    const handleChat = (event: Event) => { setSelectedPet(null); setChatPet((event as CustomEvent<Pet>).detail); setPanel('Chats') }
    const handleOpenPet = (event: Event) => { setPanel(null); setSelectedPet((event as CustomEvent<Pet>).detail) }
    window.addEventListener('pawmatch-chat', handleChat)
    window.addEventListener('pawmatch-open-pet', handleOpenPet)
    return () => { window.removeEventListener('pawmatch-chat', handleChat); window.removeEventListener('pawmatch-open-pet', handleOpenPet) }
  }, [])

  const toggleSet = (current: Set<number>, setCurrent: (next: Set<number>) => void, id: number) => {
    const next = new Set(current)
    next.has(id) ? next.delete(id) : next.add(id)
    setCurrent(next)
  }
  const handleNavigate = (item: NavItem) => {
    setActiveNav(item)
    setPanel(null)
    setChatPet(null)
    if (item === 'Home') { setShowMatches(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    if (item === 'Discover') { setShowMatches(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
    if (item === 'Match') { setShowMatches(true); document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' }) }
    if (item === 'Chats' || item === 'Profile') setPanel(item)
  }
  const visiblePets = pets.filter((pet) => (category === 'All Pets' || pet.species === category) && (!showMatches || likedIds.has(pet.id)))
    .sort((first, second) => sortNearest ? parseFloat(first.distance) - parseFloat(second.distance) : first.name.localeCompare(second.name))

  return <>
    <Navbar active={activeNav} onNavigate={handleNavigate} likedCount={likedIds.size} />
    <main>{activeNav === 'Discover' ? <DiscoverPage onLike={(id) => setLikedIds((current) => new Set(current).add(id))} onOpen={setSelectedPet} /> : <>
      <div className="page-shell"><HeroSection onDiscover={() => { handleNavigate('Discover') }} />
        <section className="discover-section" id="discover"><PetCategories category={category} setCategory={(next) => { setCategory(next); setShowMatches(false); setActiveNav('Discover') }} />
          <div className="gallery-heading"><div><span className="section-eyebrow">{showMatches ? 'THE LIKES ARE MUTUAL' : 'GOOD PETS, JUST AROUND THE CORNER'}</span><h2>{showMatches ? 'Your kind of people.' : 'Meet the neighborhood.'}</h2></div><div className="gallery-heading-right"><span>{visiblePets.length} lovely {visiblePets.length === 1 ? 'pet' : 'pets'}</span><button className="sort-button" onClick={() => setSortNearest(!sortNearest)}>{sortNearest ? 'Near me' : 'A to Z'} <ChevronDown size={15} /></button></div></div>
          <PetMasonryGrid list={visiblePets} likedIds={likedIds} savedIds={savedIds} onLike={(id) => toggleSet(likedIds, setLikedIds, id)} onSave={(id) => toggleSet(savedIds, setSavedIds, id)} onOpen={setSelectedPet} />
          {!showMatches && <button className="load-more" onClick={() => setCategory('All Pets')}>That's everyone nearby <span>✳</span></button>}
        </section>
        <HowItWorks /><CommunityCTA onJoin={() => setPanel('Join')} />
      </div>
      <Footer onNavigate={handleNavigate} />
    </>}
    </main>
    <nav className="mobile-nav" aria-label="Mobile navigation">{([['Home', Home], ['Discover', Search], ['Match', Heart], ['Chats', MessageCircle]] as const).map(([label, Icon]) => <button key={label} className={activeNav === label ? 'active' : ''} onClick={() => handleNavigate(label)}><Icon size={20} strokeWidth={1.9} /><span>{label}</span>{label === 'Match' && likedIds.size > 0 && <i>{likedIds.size}</i>}</button>)}</nav>
    {selectedPet && <PetDetailModal key={selectedPet.id} pet={selectedPet} liked={likedIds.has(selectedPet.id)} saved={savedIds.has(selectedPet.id)} onLike={() => toggleSet(likedIds, setLikedIds, selectedPet.id)} onSave={() => toggleSet(savedIds, setSavedIds, selectedPet.id)} onClose={() => setSelectedPet(null)} />}
    {panel && <SidePanel key={panel} type={panel} likedCount={likedIds.size} chatPet={chatPet} onClose={() => { setPanel(null); setChatPet(null) }} />}
  </>
}

export default App