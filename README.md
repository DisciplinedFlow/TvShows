# TV Show Dashboard

Hey there! This is my Vue 3 + Vite implementation of a TV show browser that consumes the TVMaze API. I built this as part of my application for an assignment!

## Project Setup

1. **Clone the repo:**

   ```sh
   git clone https://github.com/DisciplinedFlow/TvShows.git
   ```

2. **Jump into the project directory:**

   ```sh
   cd tv-show-dashboard
   ```

3. **Install dependencies:**

   ```sh
   npm install
   ```

4. **Fire up the dev server:**

   ```sh
   npm run dev
   ```

5. **Build for production when you're ready:**

   ```sh
   npm run build
   ```

6. **Run the tests:**

   ```sh
   npm run test:unit
   ```

7. **Keep your code clean:**
   ```sh
   npm run lint
   ```

## Node.js Version

I developed this with Node.js v20.18.3 It should work fine with newer versions too, but if you run into any issues, try rolling back to v20.18.3.

## Architecture

I went with a component-based architecture to keep things modular and maintainable. For state management, I opted for Vue's Composition API rather than Vuex, since it provides a cleaner and more flexible approach for this project's needs.

## Tech Stack

For this project, I chose:

- **Vue Router**: For client-side navigation between the dashboard and show details - crucial for a SPA like this.
- **Pinia**: For global state management - it's lighter than Vuex and plays nicely with the Composition API.
- **Vitest**: For unit testing - it runs faster than Jest and integrates perfectly with Vite.
- **ESLint + Prettier**: To catch errors early and maintain consistent code style. You'll notice I've set up custom rules that worked well for my workflow.

## Typography

I went with 'Inter' for body text and 'Proxima Nova' for headings. Inter has excellent readability at different sizes, which is crucial for the content-heavy nature of this app.

## Accessibility

After learning that the company is pushing to meet the latest accessibility standards, I made sure to build accessibility into the core of this project. Here's what I implemented:

- **Keyboard Navigation**: I've tested the entire app using only a keyboard - you can tab through all interactive elements with visible focus indicators.
- **ARIA Implementation**: I've added semantic roles and labels throughout the app. If you inspect the elements, you'll see I've used aria-labels, aria-live regions, and other ARIA attributes where appropriate.

For the key components:

- In **ShowCard**, I implemented keyboard interaction with Enter key support and added screen reader descriptions for ratings.
- The **SearchBar** has proper form controls with arrow key navigation in the dropdown results.
- For **ShowSlider**, I made the navigation buttons accessible with proper labeling and keyboard support.

I paid special attention to the views:

- The **DashboardView** has proper region landmarks and live regions that announce when content is loading.
- In **ShowDetail**, I added a keyboard-accessible back button that makes navigation more intuitive - try hitting Tab to reach it and Enter to go back

## The Smooth Scrolling Implementation

When building the sliders, I initially used native scrolling but found it wasn't giving the polished experience I wanted. So I pulled in `vue3-smooth-scroll` to create:

1. 3-tile scrolling that feels natural when clicking the arrows
2. Continuous scrolling when holding down a navigation button

The scrolling implementation was one of the trickier parts to get right. I had to fine-tune the scrolling amount (3 tiles at a time) and handle edge cases like when you reach the end of the content. Check out `ShowSlider.vue` if you're curious about the implementation details.

## Testing Philosophy

As a developer, I believe tests aren't just a safety net - they're documentation that actually runs. That's why I organized my tests into three main categories:

1. **Component Functionality Tests**: For components like `ShowCard` and `SearchBar`, I wrote focused tests that verify their core responsibilities. I didn't test every little thing - just what actually matters. For instance, with the `SearchBar` component, I'm mostly concerned that it emits events correctly when users type, since that's its primary job.

2. **Accessibility Tests**: I separated these into their own test suite because accessibility deserves special attention. These tests verify that ARIA attributes, keyboard navigation, and screen reader support work correctly. They're basically my insurance policy against accessibility regressions as I iterate on the UI.

3. **Integration Tests**: For the slider components, I focused more on the interaction between elements rather than just isolated functionality. I had to get creative when testing scroll behavior since JSDOM doesn't fully support these browser APIs.

I'm particularly proud of how the accessibility tests document the expected behavior for keyboard users and screen reader compatibility. When you read through these tests, you'll get a clear picture of not just what the component does, but how it should be experienced by all users.

## Running the App

Once you've started the dev server, head to the displayed localhost URL (usually http://localhost:xxxx) to check out the app. Try searching for your favorite shows

Let me know if you have any questions or suggestions for improvements.
