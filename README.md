# Midjuman — Build a CV that gets you noticed

**Midjuman — Créez un CV qui vous fait remarquer.** Plateforme SaaS complète de création de CV : modèles professionnels, Midjuman AI, analyse ATS, lettres de motivation, suivi de candidatures, CV web public et exports PDF / Word / PowerPoint.

## Lancer le projet

Aucune étape de build : ouvrez `index.html` via un serveur statique.

```bash
python3 -m http.server 8000
# http://localhost:8000
```

**Compte démo** (données réalistes pré-chargées) : `demo@midjuman.com` / `demo1234` (bouton « Essayer le compte démo » sur la page de connexion).

## Ce qui est fonctionnel

| Domaine | Implémentation |
|---|---|
| Landing | Hero avec aperçu CV interactif (couleurs en direct), compteurs animés, 3 étapes, modèles, démo AI avant/après, score ATS, témoignages, tarifs FR/EN, FAQ |
| Auth | Inscription, connexion, mot de passe oublié, Google/Apple (simulés), hachage des mots de passe, session persistée |
| Onboarding | 3 étapes (objectif → niveau → démarrage : zéro / import .txt / LinkedIn / AI) |
| Dashboard | Statistiques, recherche, cartes CV avec mini-aperçu + score ATS, éditer/dupliquer/aperçu/PDF/partager/renommer/supprimer, état vide guidé |
| **Éditeur (3 panneaux)** | Contenu (toutes les sections, ajout/suppression/masquage/renommage/réordonnancement par glisser-déposer et flèches) · Aperçu A4 en direct avec zoom · Design (24 modèles, 7 palettes, couleurs, polices, layouts, espacements). Onglets mobiles Contenu/Design/Aperçu |
| Autosave | Débouncé avec états « Enregistrement… / Enregistré », undo/redo (Ctrl+Z), historique de versions restaurable (Ctrl+S) |
| Templates | **24 modèles** (ATS 82–100 affichés, catégorie, PRO). Le moteur sépare strictement **contenu** et **présentation** : changer de modèle ne perd jamais de données |
| Midjuman AI | Générateur de résumé (3 propositions, 6 tons), amélioration de puces avec métriques contextuelles, génération de réalisations, correction grammaticale, suggestions de compétences par métier, optimisation par offre (Match Score + mots-clés manquants ajoutés en 1 clic) |
| ATS Analyzer | Score 0–100 calculé par règles (contact, sections, métriques, compétences, lisibilité, format, dates) — forces, améliorations et boutons **« Fix with AI »** qui appliquent réellement la correction. Aucune fausse promesse de « passage garanti » |
| Assistant design | Alertes en direct : texte trop petit, CV dense, résumé trop long, modèle peu ATS, estimation du nombre de pages + **Resume Strength %** avec recommandations |
| Lettres | Génération AI depuis le CV sélectionné, édition, PDF / Word / copie |
| Job Tracker | Kanban 5 colonnes en glisser-déposer (Wishlist → Offer/Rejected), fiches complètes, date d'entretien |
| CV Web | Publication `midjuman.com/u/prénom-nom`, QR code, confidentialité public/privé/mot de passe (`demo`), bouton téléchargement + contact, badge Midjuman retirable |
| Exports | **PDF** (fenêtre d'impression A4 fidèle), **.docx** et **.pptx réels** (générateur ZIP/OOXML maison dans `js/export.js`), texte brut, lien de partage |
| Facturation | Free / Pro / Career Pro (FCFA, EUR, USD) + **tarif unique 3 000 FCFA par CV** sans abonnement, checkout simulé (carte / Mobile Money), factures, annulation |
| Admin | Utilisateurs, revenus, entonnoir de conversion (événements réellement journalisés), appels AI, feature flags, codes promo, publication des modèles |
| i18n | Interface **Français / English** (bouton FR/EN), la langue du CV reste indépendante |
| Paramètres | Profil, langue, notifications, export JSON de toutes ses données, suppression de compte |

## Architecture

Architecture front-end modulaire sans dépendance, pensée pour migrer vers la pile recommandée (Next.js + PostgreSQL/Prisma) sans changer les modèles :

```
index.html          Coquille SPA + SEO
css/app.css         Design system Midjuman (#5B5BD6, Inter, cartes arrondies)
js/data.js          24 templates, 7 palettes, polices, dictionnaire FR/EN, définitions de sections
js/store.js         Couche de persistance (localStorage) modélisant les entités du cahier des charges :
                    User, Resume, ResumeVersion (embarquée), CoverLetter, JobApplication,
                    Subscription/Payment (invoices), AIUsage, Export, WebResume, Notification, Analytics
js/ai.js            Service AI abstrait — remplacer callAI interne par un fournisseur (OpenAI, …)
                    sans toucher l'UI ; moteur local actuel : règles + banques de compétences par métier
js/ats.js           Analyseur ATS & Resume Strength & assistant design (fonctions pures, testables)
js/render-cv.js     Moteur de templates : renderCV(resume) → HTML. Contenu ≠ présentation.
js/export.js        PDF print, générateur ZIP stocké + OOXML pour de vrais .docx/.pptx, liens de partage
js/app.js           Routeur (hash) + toutes les vues et interactions
```

### Décisions importantes

1. **Sécurité > intégrité > utilisabilité > accessibilité > performance > esthétique** (ordre du cahier des charges). Mots de passe hachés côté client (démonstration — en production : bcrypt/argon2 côté serveur), échappement systématique des contenus (`esc()`), aucune donnée vendue, export/suppression RGPD intégrés.
2. ** provider** : toute l'IA passe par `js/ai.js` ; brancher une API distante ne change que ce fichier. Même principe pour les paiements (`checkout/payNow`) : carte, Mobile Money et passerelles locales sont des méthodes interchangeables.
3. **Honnêteté ATS** : le score est un indicateur fondé sur des règles publiques, jamais une garantie — c'est un argument de confiance.
4. **Modèle économique hybride conservé** : abonnements Free/Pro/Career Pro **et** tarif historique unique de 3 000 FCFA par CV, adapté au marché (Mobile Money).

## Feuille de route (architecture prête)

Optimisation LinkedIn, simulateur d'entretien, coach carrière AI, recommandations d'offres, CV multilingues, domaines personnalisés pour les CV web, analytics de consultation des CV publiés.
