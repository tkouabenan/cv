/* Midjuman AI — local AI service layer (provider-abstracted: replace callAI() with an API later).
   Rule/knowledge-based engine that genuinely transforms user text. */
const STRONG_VERBS={managed:'Piloté et optimisé',responsible:'Piloté',worked:'Contribué à',helped:'Accompagné et renforcé',did:'Réalisé',made:'Conçu et livré',created:'Conçu et lancé',developed:'Développé et déployé',led:'Dirigé',improved:'Amélioré',increased:'Augmenté',géré:'Piloté et optimisé',travaillé:'Contribué à',aidé:'Accompagné'};
const SKILL_BANK=[[/develop|dévelop|software|tech|full.?stack|frontend|backend/i,['JavaScript / TypeScript','React','Node.js','API REST','PostgreSQL','Docker','CI/CD','Tests automatisés']],[/market|growth|brand|communication/i,['SEO / SEA','Google Analytics 4','Stratégie de contenu','HubSpot','A/B Testing','Copywriting','Social Media','Email Marketing']],[/project|chef de projet|product/i,['Gestion de projet Agile','Scrum','Roadmap produit','Jira','Gestion des risques','Coordination d’équipes','Notion','Figma']],[/financ|comptab|audit|bank/i,['Analyse financière','Excel avancé','Modélisation','Budgétisation','Reporting','SAP','Gestion des risques','Conformité']],[/sales|commercial|vente/i,['Prospection B2B','Négociation','CRM (Salesforce)','Closing','Gestion de portefeuille','Prévision des ventes']],[/design|ux|ui|graphi/i,['Figma','Design System','Prototypage','Recherche utilisateur','Adobe Creative Suite','Accessibilité']],[/data|analy/i,['SQL','Python','Power BI','Tableau','Statistiques','Machine Learning','Excel','Data Storytelling']],[/ressources|rh|hr|recrut/i,['Recrutement','Onboarding','Gestion des talents','Droit du travail','SIRH','Formation']]];
function suggestSkills(role){for(const[re,s]of SKILL_BANK)if(re.test(role||''))return s;return['Communication','Organisation','Résolution de problèmes','Travail d’équipe','Gestion du temps','Adaptabilité','Esprit d’analyse','Autonomie']}
function improveBullet(text){
 let t=(text||'').trim().replace(/\s+/g,' '); if(!t)return t; t=t.charAt(0).toUpperCase()+t.slice(1);
 const first=t.split(' ')[0].toLowerCase().replace(/[^a-zàâäéèêëîïôöùûüç-]/gi,'');
 if(STRONG_VERBS[first])t=STRONG_VERBS[first]+t.slice(t.split(' ')[0].length);
 if(!/\d/.test(t)){
   if(/social|réseaux|community/i.test(t))t+=', augmentant l’engagement de l’audience de 42 % en six mois';
   else if(/sales|vente|commercial|client/i.test(t))t+=', contribuant à une croissance du chiffre d’affaires de 18 %';
   else if(/support|service client/i.test(t))t+=', avec un taux de satisfaction client de 96 %';
   else if(/web|site|app|logiciel|dévelop/i.test(t))t+=', améliorant les performances de 40 % pour plus de 10 000 utilisateurs';
   else if(/équipe|team|projet|project/i.test(t))t+=', livré dans les délais pour une équipe de 8 personnes';
   else if(/market|campagne|campaign/i.test(t))t+=', générant +35 % de leads qualifiés';
   else t+=', avec des résultats mesurables et reconnus par la direction';
 }
 if(!/[.!]$/.test(t))t=t.replace(/[,;]$/,'');
 return t;}
function generateSummary(p){
 const role=p.role||'Professionnel',yrs=p.years||'plusieurs années',skills=(p.skills||[]).slice(0,4).join(', ')||'la gestion de projet',ind=p.industry?` dans le secteur ${p.industry}`:'';
 const tone=p.tone||'Professional';
 const v=[
 `${role} avec ${yrs} d’expérience${ind}. Expert en ${skills}, je transforme les objectifs en résultats mesurables grâce à une approche rigoureuse, collaborative et orientée impact. Reconnu pour ma fiabilité et ma capacité à livrer dans les délais.`,
 `Spécialiste ${role} fort de ${yrs} d’expérience${ind}, je combine ${skills} pour concevoir des solutions efficaces et durables. Mon approche : analyser, prioriser, exécuter — puis mesurer pour progresser en continu.`,
 `${role} orienté résultats, avec ${yrs} d’expérience${ind}. Compétences clés : ${skills}. Je cherche aujourd’hui à mettre cette expertise au service d’une organisation ambitieuse où la qualité d’exécution fait la différence.`];
 if(tone==='Executive')v[0]=`${role} expérimenté (${yrs})${ind}, reconnu pour transformer la stratégie en performance mesurable. Leadership éprouvé en ${skills}, pilotage d’équipes pluridisciplinaires et création de valeur durable à grande échelle.`;
 if(tone==='Concise')v[0]=`${role} — ${yrs} d’expérience${ind}. ${skills}. Résultats mesurables, exécution fiable, esprit d’équipe.`;
 if(tone==='Creative')v[0]=`${role} curieux et créatif, avec ${yrs} d’expérience${ind}. J’allie ${skills} pour imaginer des solutions utiles, belles et efficaces — et je mesure leur impact pour toujours faire mieux.`;
 return v;}
function grammarFix(t){return (t||'').replace(/\s+/g,' ').replace(/\s+([.,;!?»])/g,'$1').replace(/(^\s*[a-zàâäéèêë])|([.!?]\s+[a-zàâäéèêë])/g,m=>m.toUpperCase()).replace(/\bi\b/g,'I').replace(/(\w)\1{3,}/g,'$1$1')}
function toneRewrite(t,tone){let x=grammarFix(t);if(tone==='Concise')x=x.split(/[.!?]/).filter(Boolean).slice(0,2).join('. ')+'.';if(tone==='Confident')x=x.replace(/je pense que /gi,'').replace(/je crois que /gi,'');if(tone==='Executive')x=x.replace(/j’ai fait/gi,'j’ai piloté').replace(/mon travail/gi,'mon périmètre');return x}
function jobMatch(resume,jd){
 const words=[...new Set((jd.toLowerCase().match(/[a-zàâäéèêëîïôöùûüç][a-zàâäéèêëîïôöùûüç+#./-]{2,}/g)||[]))].filter(w=>w.length>3);
 const cvText=JSON.stringify(resume).toLowerCase();
 const bank=suggestSkills(jd+' '+resume.targetJob);
 const missing=bank.filter(s=>!cvText.includes(s.toLowerCase().split(' ')[0].toLowerCase()));
 const present=bank.filter(s=>!missing.includes(s));
 const kw=words.filter(w=>cvText.includes(w));
 const score=Math.min(96,Math.max(18,Math.round(30+present.length*8+Math.min(30,kw.length))));
 return{score,present,missing:missing.slice(0,6),keywordHits:kw.length};}
function aiLog(kind){DB.aiCalls=(DB.aiCalls||0)+1;track('ai_used',kind);saveDB()}
