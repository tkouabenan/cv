/* Midjuman Store — local persistence layer (simulates PostgreSQL entities via localStorage).
   Entities: User, Resume(+Version), CoverLetter, JobApplication, Subscription/Payment, AIUsage, Export, WebResume, Notification, Analytics events. */
const DB_KEY='midjuman_db_v2';
let DB;
function sampleResume(ownerId,title,target,templateId,person,exp,skills){
 return {id:uid(),ownerId,title,targetJob:target,templateId,status:'Published',createdAt:Date.now()-86400000*6,updatedAt:Date.now()-3600000,photo:'',photoShape:'circle',
  personal:{firstName:person[0],lastName:person[1],title:person[2],email:person[3],phone:'+221 77 000 00 00',location:'Dakar, Sénégal',website:'',linkedin:'linkedin.com/in/'+person[0].toLowerCase(),github:'',portfolio:'',summary:person[4],hiddenFields:[]},
  experience:exp,education:[{degree:'Master — Management de projet',field:'',school:'Université / Grande école',location:'Dakar',start:'2016',end:'2018',desc:''}],
  skills:skills.map(s=>({name:s,level:4,cat:'Core'})),languages:[{name:'Français',level:'Native'},{name:'English',level:'Professional'}],
  certifications:[],projects:[],volunteering:[],awards:[],publications:[],interests:['Lecture','Voyage','Mentorat'],references:[],custom:[],
  sectionOrder:['summary','experience','education','skills','languages','certifications','projects','awards','interests'],hiddenSections:[],
  design:{accent:'',hFont:'',bFont:'',fontSize:100,lineHeight:115,sectionSpacing:100,margin:100,layout:''},
  web:{published:false,slug:(person[0]+'-'+person[1]).toLowerCase().replace(/\s+/g,'-'),privacy:'public',branding:true},versions:[]};}
function seed(){
 const demo={id:'user-demo',firstName:'Aïcha',lastName:'Diallo',email:'demo@midjuman.com',pass:hashPw('demo1234'),plan:'Pro',role:'admin',lang:'fr',createdAt:Date.now()-86400000*40,goal:'New job',level:'Mid-Level'};
 const r1=sampleResume(demo.id,'CV — Chef de Projet Digital','Chef de Projet Digital','meridian',['Aïcha','Diallo','Chef de Projet Digital','aicha.diallo@example.com','Chef de projet digital avec 6 ans d’expérience dans la livraison de produits web et mobiles. Pilotage d’équipes pluridisciplinaires, amélioration continue et orientation résultats mesurables.'],
  [{title:'Chef de Projet Digital',company:'Sonatel / Orange',location:'Dakar',start:'2021-03',end:'',current:true,bullets:['Pilotage d’une équipe de 8 personnes et livraison de 12 fonctionnalités majeures','Amélioration du taux de conversion du parcours client de 28% en 6 mois','Gestion d’un budget annuel et coordination des parties prenantes']} ,{title:'Chargée de Projet Web',company:'Agence Digitale',location:'Dakar',start:'2018-06',end:'2021-02',current:false,bullets:['Coordination de plus de 20 sites clients de la conception au lancement','Réduction des délais de livraison de 20% grâce à la méthode Agile Scrum']}],['Gestion de projet','Scrum / Agile','Figma','Google Analytics','Notion','Communication']);
 const r2=sampleResume(demo.id,'CV — Développeur Full-Stack (EN)','Senior Full-Stack Developer','azure',['Aïcha','Diallo','Senior Full-Stack Developer','aicha.diallo@example.com','Full-stack developer focused on reliable, measurable products.'],
  [{title:'Senior Developer',company:'TechCorp',location:'Remote',start:'2022-01',end:'',current:true,bullets:['Built microservices used by 40,000 users','Reduced API response time by 40%']}],['TypeScript','React','Node.js','PostgreSQL','Docker','AWS']); r2.templateId='azure';
 const r3=sampleResume(demo.id,'CV — Marketing & Growth','Growth Marketing Manager','growth',['Aïcha','Diallo','Growth Marketing Manager','aicha.diallo@example.com','Spécialiste growth orientée données et expérimentation.'],
  [{title:'Growth Manager',company:'ScaleUp',location:'Paris',start:'2020-01',end:'',current:true,bullets:['Acquisition de +150 000 leads qualifiés','Augmentation de l’engagement de 42% en six mois']}],['SEO / SEA','Google Analytics','HubSpot','Copywriting','A/B Testing']);
 r1.web.published=true;
 return {users:[demo],session:demo.id,resumes:[r1,r2,r3],
  letters:[{id:uid(),ownerId:demo.id,title:'Lettre — Chef de Projet, Sonatel',company:'Sonatel',position:'Chef de Projet Digital',manager:'',tone:'Professional',updatedAt:Date.now()-86400000,body:'Madame, Monsieur,\n\nVotre engagement en faveur de l’innovation digitale au Sénégal retient toute mon attention. Forte de six années d’expérience en gestion de projets digitaux, je souhaite mettre mes compétences au service de vos équipes.\n\nChez mon employeur actuel, j’ai piloté une équipe de huit personnes et amélioré le taux de conversion du parcours client de 28 % en six mois.\n\nJe serais ravie d’échanger sur la valeur que je peux apporter à vos projets.\n\nVeuillez agréer, Madame, Monsieur, l’expression de mes salutations distinguées.\n\nAïcha Diallo'}],
  jobs:[{id:uid(),ownerId:demo.id,company:'Orange Sénégal',title:'Chef de Projet Digital',location:'Dakar',status:'Interview',date:'2026-09-28',salary:'',url:'',notes:'Entretien RH prévu — préparer exemples STAR.',interview:'2026-10-20',cvId:r1.id},
        {id:uid(),ownerId:demo.id,company:'Wave',title:'Product Manager',location:'Dakar / Remote',status:'Applied',date:'2026-10-05',salary:'',url:'',notes:'Candidature envoyée via LinkedIn.',interview:'',cvId:r1.id},
        {id:uid(),ownerId:demo.id,company:'Shopify',title:'Project Lead',location:'Remote',status:'Wishlist',date:'',salary:'',url:'',notes:'Adapter le CV EN.',interview:'',cvId:r2.id},
        {id:uid(),ownerId:demo.id,company:'Free Sénégal',title:'Responsable Digital',location:'Dakar',status:'Offer',date:'2026-09-10',salary:'',url:'',notes:'Offre reçue — négociation en cours.',interview:'',cvId:r1.id}],
  invoices:[{id:'INV-2026-041',ownerId:demo.id,date:'2026-09-14',label:'Midjuman Pro — Mensuel',amount:4900,currency:'FCFA',status:'Paid'}],
  analytics:[],notifications:[],flags:{aiAssistant:true,webResume:true,jobTracker:true,newTemplates:false},published:Object.fromEntries(TEMPLATES.map(t=>[t.id,true])),aiCalls:47,exports:132};
}
function hashPw(p){let h=5381;for(let i=0;i<p.length;i++)h=((h<<5)+h+p.charCodeAt(i))>>>0;return 'h'+h.toString(16)}
function loadDB(){try{DB=JSON.parse(localStorage.getItem(DB_KEY))}catch(e){} if(!DB||!DB.users){DB=seed();saveDB()}}
function saveDB(){localStorage.setItem(DB_KEY,JSON.stringify(DB))}
function me(){return DB.users.find(u=>u.id===DB.session)||null}
function myResumes(){const u=me();return u?DB.resumes.filter(r=>r.ownerId===u.id):[]}
function track(ev,data){DB.analytics.push({ev,data:data||'',at:Date.now(),user:me()?.id||'anon'});saveDB()}
function fmtDate(ts){return new Date(ts).toLocaleDateString(me()?.lang==='en'?'en-GB':'fr-FR',{day:'numeric',month:'short',year:'numeric'})}
loadDB();
