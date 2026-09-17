/* Local-only API server. Data is saved to backend/data/database.json on this computer. */
const http = require('http');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 4000);
const dataDirectory = path.join(__dirname, 'data');
const databaseFile = path.join(dataDirectory, 'database.json');
const image = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;
const men = [['arjun','Arjun K.',30,'Pune','Software Engineer','B.Tech, VJTI',"5'10\"",'Sindhi'],['rohan','Rohan S.',29,'Delhi','Entrepreneur','MBA, ISB',"6'0\"",'Sindhi'],['vivaan','Vivaan M.',24,'Mumbai','Financial Analyst','B.Com, NM College',"5'9\"",'Lohana'],['karan','Karan B.',27,'Ahmedabad','Civil Engineer','B.E.',"5'11\"",'Bhatia'],['aditya','Aditya L.',32,'Bengaluru','Product Manager','MBA, IIM',"5'10\"",'Sindhi'],['rahul','Rahul J.',22,'Indore','Graphic Designer','B.Des',"5'8\"",'Sindhi'],['dev','Dev R.',35,'Hyderabad','Consultant','MBA, XLRI',"6'1\"",'Lohana'],['aman','Aman T.',28,'Jaipur','Doctor','MBBS',"5'11\"",'Sindhi'],['yash','Yash P.',26,'Surat','Business Owner','BBA',"5'9\"",'Bhatia'],['samar','Samar D.',31,'Chennai','Chartered Accountant','CA',"5'10\"",'Sindhi']];
const women = [['kavya','Kavya M.',27,'Mumbai','Product Designer','B.Des, NIFT',"5'5\"",'Sindhi'],['riya','Riya A.',26,'Bengaluru','Chartered Accountant','CA',"5'4\"",'Sindhi'],['meera','Meera T.',24,'Pune','Marketing Manager','MBA, Symbiosis',"5'3\"",'Lohana'],['ananya','Ananya R.',29,'Delhi','Lawyer','LLB, DU',"5'6\"",'Sindhi'],['isha','Isha B.',22,'Ahmedabad','Content Strategist','BA, St. Xavier’s',"5'2\"",'Bhatia'],['simran','Simran K.',31,'Jaipur','Doctor','MBBS',"5'7\"",'Sindhi'],['naina','Naina S.',28,'Hyderabad','Data Analyst','B.Tech',"5'5\"",'Lohana'],['priya','Priya J.',25,'Indore','Teacher','M.A., B.Ed',"5'4\"",'Sindhi'],['tara','Tara P.',33,'Chennai','Architect','B.Arch',"5'6\"",'Bhatia'],['sonal','Sonal D.',30,'Surat','Business Owner','B.Com',"5'3\"",'Sindhi']];
const malePhotos = ['photo-1500648767791-00dcc994a43e','photo-1507003211169-0a1dd7228f2d','photo-1501196354995-cbb51c65aaea','photo-1504593811423-6dd665756598','photo-1502823403499-6ccfcf4fb453'];
const femalePhotos = ['photo-1534528741775-53994a69daeb','photo-1494790108377-be9c29b29330','photo-1517841905240-472988babdf9','photo-1524504388940-b1c1722653e1','photo-1544005313-94ddf0286df2'];
const createSeedProfiles = () => [...women.map((item, index) => makeProfile(item, 'Woman', femalePhotos[index % femalePhotos.length])), ...men.map((item, index) => makeProfile(item, 'Man', malePhotos[index % malePhotos.length]))];
function makeProfile([id, name, age, city, occupation, education, height, caste], gender, photoId) { return { id, name, age, city, occupation, education, height, caste, gender, religion: gender === 'Woman' && name === 'Simran K.' ? 'Sikh' : 'Hindu', income: age > 30 ? '25–30 LPA' : '12–18 LPA', image: image(photoId), verified: true, completion: 90, about: 'A verified member who values family, honesty and a meaningful partnership.', isSeed: true }; }
function initialDatabase() { return { users: [], sessions: {}, profiles: createSeedProfiles(), favourites: {}, interests: [], memberships: {}, notifications: [] }; }
function readDatabase() { if (!fs.existsSync(databaseFile)) { fs.mkdirSync(dataDirectory, { recursive: true }); fs.writeFileSync(databaseFile, JSON.stringify(initialDatabase(), null, 2)); } return JSON.parse(fs.readFileSync(databaseFile, 'utf8')); }
function writeDatabase(database) { fs.writeFileSync(databaseFile, JSON.stringify(database, null, 2)); }
function send(response, status, body) { response.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS' }); response.end(JSON.stringify(body)); }
function readBody(request) { return new Promise((resolve, reject) => { let body = ''; request.on('data', chunk => body += chunk); request.on('end', () => { try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('Invalid JSON body')); } }); }); }
function currentUser(request, database) { const token = request.headers.authorization?.replace('Bearer ', ''); const userId = token && database.sessions[token]; return database.users.find(user => user.id === userId); }
function requireUser(request, response, database) { const user = currentUser(request, database); if (!user) { send(response, 401, { error: 'Please sign in first.' }); return null; } return user; }
function uniqueProfiles(values) { return [...new Set(values)].sort(); }
function matchRange(age, range) { if (!range) return true; const [min, max] = range.split('-').map(Number); return age >= min && age <= max; }
function ageFromDob(dob) { if (!dob) return 25; const birth = new Date(dob); const today = new Date(); let age = today.getFullYear() - birth.getFullYear(); if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--; return age; }

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, 204, {});
  const url = new URL(request.url, `http://${request.headers.host}`);
  const database = readDatabase();
  try {
    if (request.method === 'GET' && url.pathname === '/') return send(response, 200, { ok: true, message: 'Sindhi Match Making local API is running.', health: '/api/health' });
    if (request.method === 'GET' && url.pathname === '/api/health') return send(response, 200, { ok: true, storage: databaseFile });
    if (request.method === 'POST' && url.pathname === '/api/auth/login') {
      const { phone = '' } = await readBody(request); const normalizedPhone = String(phone).trim() || 'demo-user';
      let user = database.users.find(item => item.phone === normalizedPhone);
      if (!user) { user = { id: crypto.randomUUID(), phone: normalizedPhone, profileId: null, createdAt: new Date().toISOString() }; database.users.push(user); }
      const token = crypto.randomUUID(); database.sessions[token] = user.id; writeDatabase(database);
      return send(response, 200, { token, user, profile: user.profileId ? database.profiles.find(profile => profile.id === user.profileId) : null });
    }
    if (request.method === 'GET' && url.pathname === '/api/auth/me') { const user = requireUser(request, response, database); if (!user) return; return send(response, 200, { user, profile: user.profileId ? database.profiles.find(profile => profile.id === user.profileId) : null }); }
    if (request.method === 'POST' && url.pathname === '/api/profiles/me') {
      const user = requireUser(request, response, database); if (!user) return; const details = await readBody(request); const existing = user.profileId && database.profiles.find(profile => profile.id === user.profileId);
      const profile = { ...(existing || {}), ...details, id: existing?.id || crypto.randomUUID(), name: details.name || 'New member', gender: details.gender === 'Man' ? 'Man' : 'Woman', image: existing?.image || image(details.gender === 'Man' ? malePhotos[0] : femalePhotos[0]), verified: false, completion: 100, religion: details.religion || 'Hindu', caste: details.caste || 'Sindhi', income: details.income || 'Prefer not to say', about: details.about || '', height: details.height || '', city: details.city || '', occupation: details.occupation || '', education: details.education || '', age: ageFromDob(details.dob), isSeed: false };
      if (existing) Object.assign(existing, profile); else database.profiles.push(profile); user.profileId = profile.id; database.notifications.unshift({ id: crypto.randomUUID(), userId: user.id, text: 'Your profile has been saved successfully.', time: 'Just now' }); writeDatabase(database); return send(response, 200, profile);
    }
    if (request.method === 'GET' && url.pathname === '/api/discover') {
      const user = currentUser(request, database); const ownProfile = user?.profileId && database.profiles.find(profile => profile.id === user.profileId); const viewerGender = ownProfile?.gender || url.searchParams.get('viewerGender') || 'Woman'; const lookingFor = viewerGender === 'Woman' ? 'Man' : 'Woman';
      const query = (url.searchParams.get('q') || '').toLowerCase(); const city = (url.searchParams.get('city') || '').toLowerCase();
      const list = database.profiles.filter(profile => profile.gender === lookingFor && profile.id !== ownProfile?.id && matchRange(profile.age, url.searchParams.get('age')) && (!query || `${profile.name} ${profile.city} ${profile.occupation}`.toLowerCase().includes(query)) && (!city || profile.city.toLowerCase().includes(city)) && ['height','religion','caste','education','occupation'].every(field => !url.searchParams.get(field) || profile[field] === url.searchParams.get(field)));
      return send(response, 200, { profiles: list, lookingFor, filters: { height: uniqueProfiles(list.map(profile => profile.height)), religion: uniqueProfiles(database.profiles.map(profile => profile.religion)), caste: uniqueProfiles(database.profiles.map(profile => profile.caste)), education: uniqueProfiles(database.profiles.map(profile => profile.education)), occupation: uniqueProfiles(database.profiles.map(profile => profile.occupation)) } });
    }
    if (request.method === 'GET' && url.pathname === '/api/profiles') return send(response, 200, database.profiles);
    if (request.method === 'GET' && url.pathname.startsWith('/api/profiles/')) { const profile = database.profiles.find(item => item.id === url.pathname.split('/').pop()); return profile ? send(response, 200, profile) : send(response, 404, { error: 'Profile not found.' }); }
    if (request.method === 'POST' && url.pathname.startsWith('/api/favourites/')) { const user = requireUser(request, response, database); if (!user) return; const profileId = url.pathname.split('/').pop(); const favourites = new Set(database.favourites[user.id] || []); favourites.has(profileId) ? favourites.delete(profileId) : favourites.add(profileId); database.favourites[user.id] = [...favourites]; writeDatabase(database); return send(response, 200, { favouriteIds: database.favourites[user.id] }); }
    if (request.method === 'GET' && url.pathname === '/api/favourites') { const user = requireUser(request, response, database); if (!user) return; return send(response, 200, { favouriteIds: database.favourites[user.id] || [] }); }
    if (request.method === 'POST' && url.pathname.startsWith('/api/interests/')) { const user = requireUser(request, response, database); if (!user) return; database.interests.push({ id: crypto.randomUUID(), fromUserId: user.id, profileId: url.pathname.split('/').pop(), createdAt: new Date().toISOString() }); writeDatabase(database); return send(response, 201, { success: true }); }
    if (request.method === 'GET' && url.pathname === '/api/notifications') { const user = requireUser(request, response, database); if (!user) return; return send(response, 200, database.notifications.filter(item => item.userId === user.id)); }
    if (request.method === 'GET' && url.pathname === '/api/plans') return send(response, 200, [{ name: 'For Her', price: 'Free', note: 'Always complimentary for women', features: ['Create your detailed profile', 'Discover verified matches', 'Express your interest', 'Private & secure'] }, { name: 'For Him', price: '₹200', note: 'per month, cancel anytime', featured: true, features: ['Everything in Free', 'View contact details', 'Unlimited interests', 'Priority visibility'] }]);
    if (request.method === 'POST' && url.pathname === '/api/memberships') { const user = requireUser(request, response, database); if (!user) return; const { plan } = await readBody(request); database.memberships[user.id] = { plan, updatedAt: new Date().toISOString() }; writeDatabase(database); return send(response, 200, { success: true, plan }); }
    return send(response, 404, { error: 'API route not found.' });
  } catch (error) { return send(response, 400, { error: error.message || 'Request failed.' }); }
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. The local backend is probably already running—open http://localhost:${PORT}/api/health to verify it.`);
    process.exitCode = 1;
    return;
  }
  throw error;
});
server.listen(PORT, () => console.log(`Sindhi Match Making local API running at http://localhost:${PORT}`));
