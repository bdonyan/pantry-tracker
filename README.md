# Pantry Tracker

Pantry Tracker is a web application that helps users manage their pantry inventory and suggest recipes based on the ingredients they have.

## Features

- **User Authentication**: Secure user authentication using Firebase Auth.
- **Inventory Management**: Add, remove, and manage pantry items for each user.
- **Recipe Suggestions**: Generate recipe ideas based on current pantry inventory using OpenAI.

## Tech Stack

- **Next.js**: Frontend framework
- **Firebase**: Authentication and Firestore database
- **Material UI**: UI components
- **OpenAI API**: Recipe suggestions based on user input

## Time Spent Developing

I spent approximately **5 hours** developing this project, including time for research, setup, and feature implementation.

## Deployment

This project is deployed live at the following link:

**[Pantry Tracker Live Site](your-deployment-url)**

Alternatively, you can follow the instructions below to run the project locally.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/pantry-tracker.git
    cd pantry-tracker
    ```

2. **Install dependencies**: Ensure you have `npm` installed. Then run:
    ```bash
    npm install
    ```

3. **Set up Firebase**: Create a Firebase project and add your Firebase config to the `.env` file.

    Example Firebase config in `.env`:
    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
    ```

4. **Set up OpenAI API**: Create an OpenAI account and get your API key. Add it to the `.env` file.

    Example OpenAI config in `.env`:
    ```bash
    OPENAI_API_KEY=your-openai-api-key
    ```

5. **Run the development server**:
    ```bash
    npm run dev
    ```

    Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
