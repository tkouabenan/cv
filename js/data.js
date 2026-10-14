/* Midjuman — Data: templates, palettes, fonts, i18n, sample content */
const PALETTES=[
 {name:'Corporate',colors:['#5B5BD6','#1E3A5F','#0F766E','#334155','#7C3AED']},
 {name:'Minimal',colors:['#18181B','#52525B','#2563EB','#0F766E','#B45309']},
 {name:'Elegant',colors:['#7C2D3E','#9A3412','#365314','#713F12','#581C87']},
 {name:'Modern',colors:['#2563EB','#0891B2','#059669','#DB2777','#EA580C']},
 {name:'Creative',colors:['#DB2777','#7C3AED','#EA580C','#0891B2','#65A30D']},
 {name:'Dark',colors:['#18181B','#27272A','#3F3F46','#0F172A','#1E293B']},
 {name:'Luxury',colors:['#92400E','#713F12','#581C87','#7C2D3E','#134E4A']}];
const FONTS=['Inter','Montserrat','Poppins','Roboto','Open Sans','Lora','Playfair Display','Source Serif 4','Merriweather','Georgia'];
const TEMPLATES=[
 // id,name,cat,ats(0-100),premium,layout,accent,sidebar(dark?),hFont,bFont,skill:'pill|bar|dot|text'
 {id:'onyx',name:'Onyx Executive',cat:'Executive',ats:96,premium:true,layout:'sidebar-left',accent:'#18181B',sidebar:'#18181B',hFont:'Playfair Display',bFont:'Inter',skill:'bar'},
 {id:'atlas',name:'Atlas ATS',cat:'ATS Friendly',ats:99,premium:false,layout:'classic',accent:'#1E3A5F',hFont:'Inter',bFont:'Inter',skill:'text'},
 {id:'meridian',name:'Meridian',cat:'Corporate',ats:94,premium:false,layout:'header',accent:'#5B5BD6',hFont:'Montserrat',bFont:'Inter',skill:'pill'},
 {id:'slate',name:'Slate Minimal',cat:'Minimal',ats:97,premium:false,layout:'minimal',accent:'#27272A',hFont:'Inter',bFont:'Inter',skill:'text'},
 {id:'azure',name:'Azure Tech',cat:'Tech',ats:93,premium:true,layout:'sidebar-left',accent:'#2563EB',sidebar:'#0F2A52',hFont:'Poppins',bFont:'Inter',skill:'bar'},
 {id:'emerald',name:'Emerald Pro',cat:'Corporate',ats:92,premium:true,layout:'sidebar-right',accent:'#0F766E',sidebar:'#ECFDF5',hFont:'Montserrat',bFont:'Open Sans',skill:'dot'},
 {id:'rosewood',name:'Rosewood',cat:'Creative',ats:84,premium:true,layout:'header',accent:'#9D2C4A',hFont:'Playfair Display',bFont:'Lora',skill:'pill'},
 {id:'nova',name:'Nova',cat:'Modern',ats:90,premium:true,layout:'two-col',accent:'#7C3AED',hFont:'Poppins',bFont:'Inter',skill:'pill'},
 {id:'ledger',name:'Ledger Finance',cat:'Finance',ats:98,premium:true,layout:'classic',accent:'#14532D',hFont:'Source Serif 4',bFont:'Inter',skill:'text'},
 {id:'caring',name:'Care & Health',cat:'Healthcare',ats:95,premium:false,layout:'header',accent:'#0891B2',hFont:'Inter',bFont:'Open Sans',skill:'dot'},
 {id:'summit',name:'Summit',cat:'Executive',ats:95,premium:true,layout:'header',accent:'#92400E',hFont:'Merriweather',bFont:'Inter',skill:'text'},
 {id:'pixel',name:'Pixel Creative',cat:'Creative',ats:82,premium:true,layout:'sidebar-left',accent:'#DB2777',sidebar:'#2A0A1A',hFont:'Poppins',bFont:'Inter',skill:'bar'},
 {id:'campus',name:'Campus',cat:'Student',ats:96,premium:false,layout:'classic',accent:'#2563EB',hFont:'Inter',bFont:'Inter',skill:'pill'},
 {id:'horizon',name:'Horizon',cat:'International',ats:94,premium:true,layout:'two-col',accent:'#0369A1',hFont:'Montserrat',bFont:'Roboto',skill:'dot'},
 {id:'monochrome',name:'Monochrome',cat:'Minimal',ats:98,premium:false,layout:'minimal',accent:'#000000',hFont:'Roboto',bFont:'Roboto',skill:'text'},
 {id:'salesforce',name:'Impact Sales',cat:'Sales',ats:91,premium:true,layout:'header',accent:'#EA580C',hFont:'Montserrat',bFont:'Inter',skill:'bar'},
 {name:'Growth Marketer',id:'growth',cat:'Marketing',ats:90,premium:true,layout:'sidebar-right',accent:'#DB2777',sidebar:'#FDF2F8',hFont:'Poppins',bFont:'Inter',skill:'pill'},
 {id:'circuit',name:'Circuit Engineer',cat:'Engineering',ats:95,premium:true,layout:'classic',accent:'#334155',hFont:'Inter',bFont:'Inter',skill:'bar'},
 {id:'scholar',name:'Scholar',cat:'Academic',ats:97,premium:true,layout:'classic',accent:'#581C87',hFont:'Source Serif 4',bFont:'Lora',skill:'text'},
 {id:'violet',name:'Violet Studio',cat:'Creative',ats:85,premium:true,layout:'sidebar-left',accent:'#7C3AED',sidebar:'#22113F',hFont:'Playfair Display',bFont:'Inter',skill:'pill'},
 {id:'nordic',name:'Nordic Light',cat:'Minimal',ats:96,premium:false,layout:'two-col',accent:'#475569',hFont:'Inter',bFont:'Open Sans',skill:'dot'},
 {id:'goldline',name:'Goldline Luxury',cat:'Executive',ats:88,premium:true,layout:'header',accent:'#B45309',hFont:'Playfair Display',bFont:'Lora',skill:'text'},
 {id:'simpleats',name:'Pure ATS',cat:'ATS Friendly',ats:100,premium:false,layout:'classic',accent:'#111827',hFont:'Georgia',bFont:'Georgia',skill:'text'},
 {id:'wave',name:'Wave Remote',cat:'Tech',ats:92,premium:true,layout:'minimal',accent:'#0891B2',hFont:'Poppins',bFont:'Inter',skill:'pill'}];
const CATS=['All','ATS Friendly','Modern','Minimal','Executive','Creative','Corporate','Student','Tech','Finance','Healthcare','Marketing','Sales','Engineering','Academic','International'];
const SECTION_DEFS=[
 {id:'summary',icon:'✦',fr:'Résumé professionnel',en:'Professional summary'},
 {id:'experience',icon:'▣',fr:'Expérience',en:'Work experience'},
 {id:'education',icon:'🎓',fr:'Formation',en:'Education'},
 {id:'skills',icon:'◆',fr:'Compétences',en:'Skills'},
 {id:'languages',icon:'🌐',fr:'Langues',en:'Languages'},
 {id:'certifications',icon:'🏅',fr:'Certifications',en:'Certifications'},
 {id:'projects',icon:'🚀',fr:'Projets',en:'Projects'},
 {id:'volunteering',icon:'🤝',fr:'Bénévolat',en:'Volunteering'},
 {id:'awards',icon:'🏆',fr:'Distinctions',en:'Awards'},
 {id:'publications',icon:'📄',fr:'Publications',en:'Publications'},
 {id:'interests',icon:'♥',fr:'Centres d’intérêt',en:'Interests'},
 {id:'references',icon:'👥',fr:'Références',en:'References'},
 {id:'custom',icon:'＋',fr:'Section personnalisée',en:'Custom section'}];
const I18N={
 fr:{create:'Créer mon CV',templates:'Modèles',pricing:'Tarifs',login:'Connexion',signup:'Créer un compte',dashboard:'Tableau de bord',myCvs:'Mes CV',cover:'Lettres de motivation',tracker:'Suivi candidatures',ai:'Midjuman AI',billing:'Abonnement',settings:'Paramètres',admin:'Admin',home:'Accueil',welcome:'Bon retour',newCv:'+ Nouveau CV',edit:'Modifier',download:'Télécharger',saved:'Enregistré',saving:'Enregistrement…',content:'Contenu',design:'Design',preview:'Aperçu',search:'Rechercher…'},
 en:{create:'Create My CV',templates:'Templates',pricing:'Pricing',login:'Log in',signup:'Sign up',dashboard:'Dashboard',myCvs:'My CVs',cover:'Cover Letters',tracker:'Job Tracker',ai:'Midjuman AI',billing:'Billing',settings:'Settings',admin:'Admin',home:'Home',welcome:'Welcome back',newCv:'+ Create New CV',edit:'Edit',download:'Download',saved:'Saved',saving:'Saving…',content:'Content',design:'Design',preview:'Preview',search:'Search…'}};
function tpl(id){return TEMPLATES.find(t=>t.id===id)||TEMPLATES[1]}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function uid(){return 'id-'+Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
function initials(n){return (n||'?').split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase()}
