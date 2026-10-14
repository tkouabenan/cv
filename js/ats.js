/* Midjuman ATS Analyzer — real rule-based scoring (0-100). No false "guaranteed pass" claims. */
function atsAnalyze(r){
 const p=r.personal,cats=[];const push=(name,score,ok,issue,fix)=>cats.push({name,score,ok:score>=70,issue:score>=70?'':issue,fix:score>=70?'':fix});
 const contact=(p.email?25:0)+(p.phone?25:0)+(p.location?20:0)+(p.linkedin?30:0); push('Contact information',contact,'','Complétez email, téléphone, localisation et LinkedIn.','add-linkedin');
 const secs=['experience','education','skills'].filter(s=>!r.hiddenSections.includes(s)).length; push('Section structure',Math.round(secs/3*100),'','Ajoutez les sections Expérience, Formation et Compétences.','show-sections');
 const bullets=r.experience.flatMap(e=>e.bullets||[]); const withMetrics=bullets.filter(b=>/\d/.test(b)).length;
 push('Experience',bullets.length?Math.min(100,40+Math.round(withMetrics/Math.max(1,bullets.length)*60)) :10,'','Ajoutez des réalisations chiffrées à vos expériences.','add-metrics');
 const sk=r.skills.length; push('Skills',Math.min(100,sk*12),'','Ajoutez au moins 8 compétences ciblées pour le poste.','add-skills');
 const sum=(p.summary||'').length; push('Readability',sum>280?55:(sum>=80?95:(sum>0?60:15)),'','Un résumé de 80 à 280 caractères, concret et ciblé, est idéal.','fix-summary');
 const t=tpl(r.templateId); push('Formatting',t.ats, '','Ce modèle créatif peut être moins bien lu par certains ATS.','ats-template');
 const dates=r.experience.every(e=>e.start); push('Dates & consistency',dates?92:45,'','Indiquez une date de début pour chaque expérience.','fix-dates');
 const total=Math.round(cats.reduce((a,c)=>a+c.score,0)/cats.length);
 const strengths=cats.filter(c=>c.score>=80).map(c=>'✓ '+c.name+' — solide.');
 const improvements=cats.filter(c=>c.score<80).map(c=>({text:c.issue,fix:c.fix}));
 return{total,cats,strengths,improvements};}
function strengthScore(r){
 let s=0;const rec=[];const p=r.personal;
 if(p.firstName&&p.title)s+=12;else rec.push('+ Complétez votre nom et votre titre professionnel.');
 if(p.email&&p.phone)s+=10;else rec.push('+ Ajoutez un email et un téléphone professionnels.');
 if(p.linkedin)s+=8;else rec.push('+ Ajoutez votre profil LinkedIn (+8).');
 if((p.summary||'').length>=80)s+=15;else rec.push('+ Rédigez un résumé percutant avec Midjuman AI (+15).');
 if(r.experience.length>=2)s+=15;else rec.push('+ Développez au moins deux expériences (+15).');
 const m=r.experience.flatMap(e=>e.bullets||[]).filter(b=>/\d/.test(b)).length;
 if(m>=3)s+=15;else rec.push('+ Ajoutez des réalisations chiffrées (+15).');
 if(r.skills.length>=8)s+=12;else rec.push('+ Ajoutez trois compétences pertinentes (+12).');
 if(r.education.length)s+=8; if(r.languages.length)s+=5;
 return{score:Math.min(100,s),rec:rec.slice(0,4)};}
function designWarnings(r){
 const w=[];const d=r.design;
 if(d.fontSize<85)w.push('⚠ Votre taille de texte peut être trop petite pour certains recruteurs.');
 if(d.sectionSpacing>140)w.push('⚠ Espacement important : votre CV risque de dépasser 2 pages.');
 const totalChars=JSON.stringify(r.personal.summary||'').length+r.experience.flatMap(e=>e.bullets||[]).join('').length;
 if(totalChars>3200)w.push('⚠ Contenu dense : envisagez de condenser votre résumé et vos puces.');
 if((r.personal.summary||'').length>420)w.push('⚠ Votre résumé est long — pensez à le raccourcir.');
 const t=tpl(r.templateId); if(t.ats<88)w.push('⚠ Ce modèle créatif peut ne pas être optimal pour les systèmes ATS.');
 return w;}
function pageEstimate(r){const chars=JSON.stringify([r.personal.summary,r.experience,r.education]).length;return Math.max(1,Math.round(chars/2600))}
