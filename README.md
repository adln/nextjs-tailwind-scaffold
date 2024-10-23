# Next.js / ShadCN / Jest kickstarter with Authentication Admin Dashboard

An **Admin dashboard** scafold that uses best practices, uses latest versions of:
- Next.js
- Tailwind
- Shadcn
- Jest (for testing)
## Dashboard interface
The dashboard interface uses ShadCN, can easily be modified.
##### Layout file 
path: `@/components/structure/Layout.js`

	The layout file contains all code for fixing the **Layout**, to change the layout of a newly created project, start with this file.
###### API
to connect the system to an API, just add a env variable of the name: 
```
NEXT_PUBLIC_API=http://localhost:3000/api/v1
GOOGLE_API_KEY=6a5s4d6a5sd4a5sd6a54sds
FACEBOOK_API_KEY=6a5s4d6a5sd4a5sd6a54sd
```
## Testing
The application uses **Jest** with **@testing-library/react** for testing, pages are tested using the `__tests__` folder.
```bash
# run test
yarn test
# run tests and watch
run test --watch
```
###### \_\_tests__ folder structure
📦\_\_tests__
 ┣ 📂pages
 ┣ 📂components
 ┣ 📂services
 ┣ 📂hooks
 ┣ 📂context
    ┗ 📜index.test.jsx

# Home page (Dashboard)
## requirements
### UI requirements
- has a title
- has at least 3 cards
 