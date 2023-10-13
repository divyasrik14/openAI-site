### Approach

Here in the app SmartPDF , we have two screens, i being Home screen and the other being Chat screen, Home screen is where user uploads the PDF to be read, and the chat screen, where the user can provide the questions and get the answers.

I have used Fetch API for the frontend to communicate with backend.

In the home page, when the user uploads the pdf, a request will be sent to the backend /upload route, the backend route handle the uploading process.

When the user clicks on the Start button, the backend makes itself ready for the chat process. i.e., loading vectors, creating documents etc.

And once Start button is clicked, the user will be directed to the /chat screen, where he can enter his questions and accordingly the backend api will provide the answers

### Steps to setup

For setting up the app

** 1. Install dependencies **
** - npm install **

** 2. To start the app **
** - npm start **

### Brief Explaination and Challenges

I have selected React, ANT Design, and the Fetch API for the frontend of my project. This choice is rooted in my strong familiarity with these technologies, which will expedite development and help meet the one-week deadline. Additionally, React and ANT Design offer excellent performance and facilitate the creation of a responsive user interface. These advantages make them the ideal choice for a rapid development environment."

There were problems while creating the app, such as alignments, rendering, loading, querying etc but logging, debugging, surfing internet helped me a lot, and i could achieve the intended functionality.
