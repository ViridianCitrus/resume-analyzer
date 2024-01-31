# Resume Analyzer

This is my submission for the frontend component of the Adanomad Tech Consulting Challenge, aka the Resume Matcher.

The approach I took was to bootstrap the project using Create React App, integrating all 3 main components of the challenge into one webpage. For the upload, I used a library called `react-pdf` to read the text from the user-uploaded resume. I then took the raw data, and for the sake of the next steps, used a library called `keyword_extractor`, which used multiple sources to identify stop words and parse out the keywords. Using the same library, the user-inputted job description was also parsed similarly.

The keywords were then compared with each other using the `jaccard-index` library, which used the Jaccard similarity coefficient index to calculate the similarity between two different arrays, which in our case, was the keywords of both the resume and the job description to ultimately create a proportional similarity score. Finally, the `wordcloud` library was used to generate a word cloud based on the most comment keywords found from the previous data formatting. To format the components, I used Tailwind CSS for its ease of use and familiarity.

Normally, the application would have used a more robust backend API to extract keywords and find match similarity. However, since this is created only as a frontend application, I was only able to use some more easily available, but simpler tools.

## Get Started

To run the application, make sure all project dependencies are installed with `npm install`. Then, launch the application in your browser using `npm start`.

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the project dependencies based on the information provided in the package.json file. This command is typically executed once, initially, or whenever new dependencies are added to the project.

After running npm install, Node Package Manager (npm) fetches and installs all the required packages and libraries listed in the dependencies and devDependencies sections of your package.json. These dependencies may include frameworks, libraries, and tools necessary for your project to function properly.


### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
