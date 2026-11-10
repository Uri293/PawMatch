export type Pet = {
  id: number
  name: string
  age: string
  breed: string
  species: 'Dogs' | 'Cats' | 'Rabbits' | 'Others'
  gender: string
  distance: string
  image: string
  owner: string
  ownerImage: string
  intro: string
  tags: string[]
  photos: string[]
}

const photo = (id: string, width = 720) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const pets: Pet[] = [
  {
    id: 1,
    name: 'Milo', age: '2 years', breed: 'Golden Retriever', species: 'Dogs', gender: 'Boy', distance: '1.2 mi away',
    image: photo('photo-1552053831-71594a27632d'), owner: 'Sophie M.', ownerImage: photo('photo-1534528741775-53994a69daeb', 96),
    intro: 'Professional tennis-ball chaser, enthusiastic swimmer, and firm believer that every stranger is a friend.',
    tags: ['Playful', 'Good with dogs', 'Loves water'],
    photos: [photo('photo-1552053831-71594a27632d'), photo('photo-1537151608828-ea2b11777ee8'), photo('photo-1548199973-03cce0bbc87b')],
  },
  {
    id: 2,
    name: 'Olive', age: '1 year', breed: 'Tabby cat', species: 'Cats', gender: 'Girl', distance: '0.8 mi away',
    image: photo('photo-1573865526739-10659fec78a5'), owner: 'Avery J.', ownerImage: photo('photo-1500648767791-00dcc994a43e', 96),
    intro: 'A tiny explorer with a big purr. Olive loves sunbeams, feather toys, and making new feline friends.',
    tags: ['Curious', 'Cuddle bug', 'Indoor explorer'],
    photos: [photo('photo-1573865526739-10659fec78a5'), photo('photo-1514888286974-6c03e2ca1dba'), photo('photo-1495360010541-f48722b34f7d')],
  },
  {
    id: 3,
    name: 'Biscuit', age: '8 months', breed: 'Mini Dachshund', species: 'Dogs', gender: 'Boy', distance: '2.4 mi away',
    image: photo('photo-1612195583950-b8fd34c87093'), owner: 'Jamie L.', ownerImage: photo('photo-1531123897727-8f129e1688ce', 96),
    intro: 'Small legs, huge personality. Biscuit is learning his manners and looking for a patient walking buddy.',
    tags: ['Silly', 'Learning tricks', 'Puppy energy'],
    photos: [photo('photo-1612195583950-b8fd34c87093'), photo('photo-1541599540903-216a46ca1dc0'), photo('photo-1517849845537-4d257902454a')],
  },
  {
    id: 4,
    name: 'Clover', age: '3 years', breed: 'Holland Lop', species: 'Rabbits', gender: 'Girl', distance: '3.1 mi away',
    image: photo('photo-1585110396000-c9ffd4e4b308'), owner: 'Morgan R.', ownerImage: photo('photo-1524504388940-b1c1722653e1', 96),
    intro: 'Clover is a gentle little gardener who likes fresh herbs, quiet afternoons, and meeting kind new people.',
    tags: ['Gentle', 'Litter trained', 'Loves herbs'],
    photos: [photo('photo-1585110396000-c9ffd4e4b308'), photo('photo-1535241749838-299277b6305f'), photo('photo-1591382386627-349b692688ff')],
  },
  {
    id: 5,
    name: 'Poppy', age: '4 years', breed: 'Cavalier Spaniel', species: 'Dogs', gender: 'Girl', distance: '1.7 mi away',
    image: photo('photo-1517849845537-4d257902454a'), owner: 'Taylor K.', ownerImage: photo('photo-1544005313-94ddf0286df2', 96),
    intro: 'Poppy is a soft-hearted cafe companion who would happily split a sunny park bench with a new friend.',
    tags: ['Easygoing', 'City walks', 'People lover'],
    photos: [photo('photo-1517849845537-4d257902454a'), photo('photo-1551717743-49959800b1f6'), photo('photo-1537151608828-ea2b11777ee8')],
  },
  {
    id: 6,
    name: 'Miso', age: '2 years', breed: 'Scottish Fold', species: 'Cats', gender: 'Boy', distance: '0.6 mi away',
    image: photo('photo-1514888286974-6c03e2ca1dba'), owner: 'Chris D.', ownerImage: photo('photo-1506794778202-cad84cf45f1d', 96),
    intro: 'Miso has perfected the art of the nap. He is looking for a calm cat friend who appreciates the finer things.',
    tags: ['Laid-back', 'Window watcher', 'Treat motivated'],
    photos: [photo('photo-1514888286974-6c03e2ca1dba'), photo('photo-1495360010541-f48722b34f7d'), photo('photo-1573865526739-10659fec78a5')],
  },
  {
    id: 7,
    name: 'Sunny', age: '1 year', breed: 'Corgi mix', species: 'Dogs', gender: 'Boy', distance: '4.2 mi away',
    image: photo('photo-1543466835-00a7907e9de1'), owner: 'Riley P.', ownerImage: photo('photo-1534528741775-53994a69daeb', 96),
    intro: 'A very good boy with a very wiggly bottom. Sunny is ready to turn every walk into a tiny adventure.',
    tags: ['Social', 'Adventure buddy', 'Good with kids'],
    photos: [photo('photo-1543466835-00a7907e9de1'), photo('photo-1551717743-49959800b1f6'), photo('photo-1548199973-03cce0bbc87b')],
  },
  {
    id: 8,
    name: 'Peaches', age: '6 months', breed: 'Netherland Dwarf', species: 'Rabbits', gender: 'Girl', distance: '2.9 mi away',
    image: photo('photo-1535241749838-299277b6305f'), owner: 'Drew A.', ownerImage: photo('photo-1544005313-94ddf0286df2', 96),
    intro: 'Peaches is a tiny ball of fluff with a curious nose and a very respectable collection of cardboard boxes.',
    tags: ['Bouncy', 'Curious', 'Young bunny'],
    photos: [photo('photo-1535241749838-299277b6305f'), photo('photo-1591382386627-349b692688ff'), photo('photo-1585110396000-c9ffd4e4b308')],
  },
  {
    id: 9,
    name: 'Otis', age: '5 years', breed: 'Bernese Mountain Dog', species: 'Dogs', gender: 'Boy', distance: '5.1 mi away',
    image: photo('photo-1564460576398-ef55d99548b2'), owner: 'Sam W.', ownerImage: photo('photo-1500648767791-00dcc994a43e', 96),
    intro: 'Big, fluffy, and convinced he is a lap dog. Otis would love to meet another gentle giant for a park stroll.',
    tags: ['Gentle giant', 'Calm', 'Hiking buddy'],
    photos: [photo('photo-1564460576398-ef55d99548b2'), photo('photo-1552053831-71594a27632d'), photo('photo-1548199973-03cce0bbc87b')],
  },
  {
    id: 10,
    name: 'Fig', age: '3 years', breed: 'Green-cheeked conure', species: 'Others', gender: 'Boy', distance: '3.7 mi away',
    image: photo('photo-1552728089-57bdde30beb3'), owner: 'Alex N.', ownerImage: photo('photo-1524504388940-b1c1722653e1', 96),
    intro: 'Fig is a cheerful chatterbox who loves music, new perches, and other birds with good taste in snacks.',
    tags: ['Chatty', 'Music fan', 'Bird friendly'],
    photos: [photo('photo-1552728089-57bdde30beb3'), photo('photo-1549608276-5786777e6587'), photo('photo-1555169062-013468b47731')],
  },
  {
    id: 11,
    name: 'Luna', age: '2 years', breed: 'Rescue mix', species: 'Dogs', gender: 'Girl', distance: '1.9 mi away',
    image: photo('photo-1551717743-49959800b1f6'), owner: 'Casey B.', ownerImage: photo('photo-1531123897727-8f129e1688ce', 96),
    intro: 'Luna has come a long way and is ready to make a few friendly introductions at her own pace.',
    tags: ['Sweet natured', 'Slow introductions', 'Treat fan'],
    photos: [photo('photo-1551717743-49959800b1f6'), photo('photo-1517849845537-4d257902454a'), photo('photo-1543466835-00a7907e9de1')],
  },
  {
    id: 12,
    name: 'Mochi', age: '1 year', breed: 'Persian mix', species: 'Cats', gender: 'Girl', distance: '2.2 mi away',
    image: photo('photo-1495360010541-f48722b34f7d'), owner: 'Jordan F.', ownerImage: photo('photo-1534528741775-53994a69daeb', 96),
    intro: 'Mochi enjoys plush blankets, gentle company, and watching birds from a very safe indoor spot.',
    tags: ['Gentle', 'Indoor cat', 'Soft blankets'],
    photos: [photo('photo-1495360010541-f48722b34f7d'), photo('photo-1514888286974-6c03e2ca1dba'), photo('photo-1573865526739-10659fec78a5')],
  },
]