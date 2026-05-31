# Social Support Application

A front-end case study built for the Department of Government Enablement (DGE), Abu Dhabi. Citizens can apply for financial assistance through a guided multi-step form with AI writing assistance, bilingual support, and automatic progress saving.

---

## What's inside

- Landing page matching DGE's visual identity
- 4-step application wizard (Personal Info, Family & Finance, Situation, Review & Submit)
- AI-powered "Help Me Write" on all three textarea fields in Step 3
- English and Arabic (RTL) with auto language detection
- Progress saved to LocalStorage on every change
- Resume or start fresh prompt when returning to the form
- Responsive across mobile, tablet and desktop
- Accessible: ARIA roles, keyboard navigation, focus management, screen reader support

---

## Tech stack

| What | How |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 + CSS Modules |
| Form handling | React Hook Form |
| Validation | Zod |
| State | React Context API |
| Routing | React Router v6 |
| HTTP | Axios |
| i18n | react-i18next + browser language detection |
| AI | OpenAI GPT-3.5 Turbo |

---

## Getting started

You need Node.js 18+ and npm 9+.

```bash
git clone https://github.com/megha1295/social-support-app.git
cd social-support-app
npm install
```

### OpenAI API key

Copy the example env file:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your key:

```
VITE_OPENAI_API_KEY=your_key_here
```

You can get a key at https://platform.openai.com/api-keys.

If you leave the placeholder as is, the app automatically falls back to a mock response so you can still see the full AI flow without spending any credits. The mock adds a realistic 1.5 second delay so the loading state is visible.

### Run it

```bash
npm run dev
```

Open http://localhost:5173

---

## Project structure

```
src/
├── components/
│   ├── form/
│   │   ├── FormWizard.tsx          # Wizard shell, progress bar, step routing
│   │   ├── FormWizard.module.css
│   │   ├── steps/
│   │   │   ├── Step1.tsx           # Personal information
│   │   │   ├── Step2.tsx           # Family and financial info
│   │   │   ├── Step3.tsx           # Situation descriptions with AI
│   │   │   ├── Step4.tsx           # Review and submit
│   │   │   ├── Steps.module.css    # Shared button and layout styles
│   │   │   └── Step4.module.css
│   │   └── ui/
│   │       ├── InputField.tsx      # Reusable input with label and error
│   │       ├── SelectField.tsx     # Reusable select with custom arrow
│   │       ├── TextareaField.tsx   # Textarea with character count
│   │       ├── AIButton.tsx        # Help Me Write button with error handling
│   │       └── AIPopup.tsx         # Suggestion modal with focus trap
├── components/layout/
│   ├── LanguageToggle.tsx
│   └── ResumeModal.tsx             # Resume or start fresh prompt
├── context/
│   └── FormContext.tsx             # Form state and step management
├── hooks/
│   └── useFormPersist.ts           # LocalStorage utilities
├── i18n/
│   ├── config.ts
│   └── locales/
│       ├── en.json
│       └── ar.json
├── pages/
│   └── LandingPage.tsx             # DGE branded landing page
├── schemas/
│   ├── step1Schema.ts              # Zod validation for step 1
│   ├── step2Schema.ts
│   └── step3Schema.ts
├── services/
│   ├── openai.ts                   # OpenAI integration with mock fallback
│   └── submitForm.ts               # Mock form submission
└── types/
    └── form.ts                     # Shared TypeScript interfaces
```

---

## A few things worth knowing

**Why Context API and not Redux?**
Three steps, one form, one submit. Redux would add reducers, actions and action types for the same result. Context is built into React and handles this scope cleanly.

**Why Zod alongside React Hook Form?**
React Hook Form's built-in validation works fine for simple cases but Zod gives you a typed schema that generates TypeScript types automatically via `z.infer`. You define validation once and get both runtime checks and compile-time types from the same source.

**Why Tailwind v4?**
It has a first-class Vite plugin and uses a CSS-first approach. No `tailwind.config.js` needed. Custom theme values go in `index.css` inside `@theme`. CSS Modules handle component-scoped styles where Tailwind utilities are not enough.

**Why the AI button requires 10 characters before activating?**
The AI needs at least some context to generate something useful. An empty prompt produces a generic response that will not help the applicant. Ten characters is a low bar but enough for the user to give a short hint like "unemployed, two kids".

**The country field is locked to UAE.**
Based on the actual eligibility criteria for the Abu Dhabi Social Support Programme, applicants must be UAE nationals holding a family book issued by the Emirate of Abu Dhabi. Locking the country removes a field that would always have the same value.

**The mock fallback mirrors real API behavior.**
It uses the same function signature as the live call, adds a 1.5 second delay, and returns realistic field-specific responses. Switching to the real API is one environment variable change with zero code changes.

**How form persistence works.**
Progress is saved to LocalStorage when the user clicks Next on any step. Typing in a field without clicking Next does not persist the data. When a returning user clicks Apply Now, if they have completed at least one step previously, a prompt appears asking them to resume or start fresh. This was a deliberate choice: someone who typed a few characters and left has not really started an application, but someone who completed Step 1 and moved forward has real progress worth resuming.

---

## What I would add with more time

- Unit tests with Jest and React Testing Library, especially for the Zod schemas and the AI service
- A proper backend to persist submissions instead of just logging to console
- More sophisticated prompt engineering that pulls context from Steps 1 and 2 into the Step 3 AI prompts
- Document upload for supporting evidence
- An application reference number on the success screen

---

## Author

Megha Mohan
meghamohan1295@gmail.com
https://www.linkedin.com/in/meghamohan1295/
