# Aradhya Aanjna - Actor Profile Development Plan

Based on the requirements in `brief.md` and the rich content provided in `about.md`, here is a comprehensive, structured plan of development to build a premium, interactive, and manageable portfolio website for Aradhya.

## 1. Technology Stack Recommendation
To deliver a high-performance, SEO-friendly site with a modern UI and a seamless CMS for updates, I recommend:

*   **Frontend Framework**: **Next.js (React)** 
    *   *Why*: Excellent for image/video optimization, incredibly fast page loads, and great SEO out-of-the-box (essential for public profiles).
*   **Styling & Animations**: **Vanilla CSS / CSS Modules + Framer Motion / GSAP**
    *   *Why*: Pure CSS gives us maximum control over the requested "minimal and pink-purple themed" UI without bloat. Framer Motion/GSAP will power the premium micro-interactions and smooth page transitions.
*   **Backend & Content Management (CMS)**: **Sanity.io or Supabase**
    *   *Why*: A headless CMS like Sanity provides a beautiful, customizable admin dashboard out of the box. You can easily define schema for "Auditions", "Current Look", and "Projects" so a non-technical user can log in and update text/media effortlessly.
*   **Hosting**: **Vercel**
    *   *Why*: The standard for Next.js hosting, offering seamless deployment, free SSL, and excellent global performance.

## 2. Architecture & Data Modeling (CMS)
We will structure the CMS to hold the content from `about.md` dynamically:

*   **Global Settings**: Bio (9-year-old actor, etc.), Date of Birth, primary IMDB link, and social media handles.
*   **Current Look**: A singleton document with `Photo (Image)`, `Title`, and `Description`.
*   **Projects (Categorized)**: 
    *   *Fields*: `Title`, `Type` (TV Series/Movie vs. Brand Commercial), `Brand Name`, `IMDB Link`, `Poster Image`, `YouTube/Video URL`.
    *   *Usage*: This allows us to easily split projects into the requested separate tabs (e.g., "Commercials" for Brands like P&G, Jio, Cadbury vs "Film & TV" for Potluck, Guilty Minds, Nadikar).
*   **Auditions**: A list of video entries with titles and dates.

## 3. Recommended Website Structure
*   **Hero Section**: Stunning, high-quality portrait of Aradhya, dynamic text animations introducing her with a subtle pink-purple aesthetic.
*   **About Section**: The biography from `about.md`, highlighting her extensive brand experience and recent TV/Film roles.
*   **"Current Look" Module**: A dedicated, easily updatable card/section showcasing her current appearance.
*   **Projects Showcase (The Core)**:
    *   *Tab 1: Brands & Commercials*: A masonry or interactive grid of YouTube embeds for P&G, Jio, Cadbury, etc.
    *   *Tab 2: Film & Television*: Rich cards featuring movie/series posters (Kaala Paani, Potluck, etc.), descriptions, and direct IMDB links.
*   **Auditions Gallery**: A clean, distraction-free video gallery for her acting clips.
*   **Social & Connect**: A live or mocked Instagram feed viewer displaying her latest reels and posts (e.g., Jio Home BTS).

## 4. Phased Development Plan

### Phase 1: UX/UI Design & Prototyping
*   Establish the visual identity: "Minimal", "Pink-Purple theme", highly polished.
*   Design responsive layouts for all sections (Mobile is critical for social traffic).
*   Plan out micro-animations (e.g., hover effects on project posters, smooth scrolling, entrance animations for videos).

### Phase 2: CMS Setup & Content Population
*   Initialize the Next.js project.
*   Spin up the CMS (e.g., Sanity) and deploy the admin panel.
*   Create data schemas for `Projects`, `Auditions`, `Look`.
*   *Action*: Migrate all the YouTube and Instagram links from `about.md` into the new CMS database.

### Phase 3: Frontend Development (The Build)
*   Build out vanilla CSS design tokens (colors, typography, spacing).
*   Develop modular UI components: Video Cards, Tabbed Navigation for Projects, Hero Banner.
*   Integrate the CMS API to pull live data into the Next.js pages.
*   Implement custom video player wrappers/embeds for YouTube links.

### Phase 4: Polish & Animations
*   Add Framer Motion or GSAP to implement the high-quality interactive animations requested in the brief.
*   Ensure the site feels "alive" but not overwhelming.
*   Implement the Instagram Feed viewer logic.

### Phase 5: Testing, Optimization, & Launch
*   Performance testing (videos and images can slow down sites, Next.js `<Image>` and lazy loading will be used).
*   Cross-browser and mobile testing.
*   Final deployment to Vercel and handoff of the Admin Login credentials.
