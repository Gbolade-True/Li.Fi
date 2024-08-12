# Token Information Website - Favoriting Feature

This branch extends the `main` branch, enhancing the Token Information Website by adding a favoriting feature. Users can now add tokens to their favorites, view their favorited tokens, and remove them from the favorites list. The state of favorited tokens is persisted using local storage.

## Features

- **Favorite Tokens:** Allows users to add tokens to a favorites list and view them separately.
- **Local Storage Persistence:** Favorited tokens are stored in local storage, ensuring persistence across sessions.
- **Optimistic UI Updates:** The UI reflects favoriting actions immediately for a smooth user experience.
- **Context API:** Manages state related to favorited tokens using React's Context API.

## Tests

- Tests were richly enhanced to cover all use cases for the user favoriting feature and helper functions used in the application.

# Token Information Website

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It provides an overview of tokens, including detailed information on each token. The app fetches token data from an API, displays it on the overview page, and allows users to view more detailed information on a separate detail page.

## Features

- **Overview Page:** Displays a list of tokens with their basic information.
- **Detail Page:** Provides more detailed information about a selected token.
- **Dynamic Routing:** Tokens can be accessed via dynamic routes based on their chain ID and address.
- **Data Fetching:** Efficiently fetches token data using Next.js's data fetching methods.
- **Streaming, Server Side Rendering, SSG, ISR:** Efficiently use Next.Js techniques for optimal app performance and User Experience.

## Installation

1. Clone the repository: `git clone <repository-url>`

2. Navigate to the project directory: `cd <project-directory>`

3. For version consistency, please run `nvm use 20.13.0` before running any yarn command. The node engine was set in the package.json. You'll need a node version manager on your machine to do this.
  
4. Install dependencies: `yarn install`

## Running the App

For actual user experience, we run the app in production mode. This will also show the SSG logic implemented in the build console

1. Build the project: `yarn build`

2. Start the application: `yarn start`

3. Open your browser and navigate to: `http://localhost:3000`

## Run Tests

Run the test suite with the `yarn test` command.
_If you run into any errors in the console when you run `yarn test`, please remove `node_modules` and `yarn.lock` and run `yarn install` again_

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
