# **App Name**: IEEE Connect

## Core Features:

- Home Page: Display a centered hero section with the IEEE Student Branch name and a 'Learn More' call to action.
- Events Management: Enable users to view upcoming and past events through a tabbed interface. Each event card displays event details and registration CTA. Connect with Firestore for event data storage and retrieval.
- Gallery: Categorize albums into a grid layout. Enable hover captions, lightbox view, and infinite scroll. Implement member-only downloads. Images stored using Cloud Storage.
- Team Directory: Showcase team members in a grid layout with photos, names, and roles. Include a hover bio reveal and links to LinkedIn/GitHub. Store Team data using Firestore.
- Admin Content Generation Tool: An AI-powered tool to streamline content creation, suggesting engaging text and descriptions for events and team member profiles, tailored to the IEEE Student Branch's style and audience. The tool assists with formulating suitable content such as catchy title and brief text for events to promote attendance. Admins will always be able to overwrite/correct the suggestion before commiting.
- Contact Form: Implement a contact form with a form on one side, and an info panel (address, phone, email, socials) on the other side
- Firebase Integration: Integrate Firebase Authentication, Firestore (events, gallery, team, members), Cloud Storage (images), and Hosting.

## Style Guidelines:

- Primary color: IEEE blue (#1f5582), providing a strong and recognizable identity. Accent colors drawn from MGM's palette for highlights. The analogous accent color will be chosen from the range near #1f8255.
- Background color: Clean white (#FFFFFF) for a crisp and modern look. The white color allows content to take center stage and keeps users focused on the application
- Headlines: 'Poppins', sans-serif. The combination provides a balance between modernity and legibility, ideal for headings that need to be both visually appealing and easy to read. Body: 'PT Sans', sans-serif
- Responsive layout with a focus on clear information hierarchy and easy navigation.
- Use professional, consistent icons for navigation and actions throughout the site.
- Subtle transitions and hover effects to enhance user experience.