# Notes

Branch and github pages initialized using [this tutorial](https://github.com/gitname/react-gh-pages). Additional comments:
- Instead of starting from an empty repository, created new branch gh-pages-source BEFORE starting, then created new React app and copied contents of React app into gh-pages-source.
- Then followed the rest of the tutorial, skipping any mention of initializing a Git repository.

To redeploy the app:
- Clone this repository and switch to gh-pages-source branch
- Make whatever changes, commit, and then run `npm run deploy`
- (To preview the app, just run `npm start` as mentioned below)

Demo design SUBSTANTIALLY inspired by:
- https://davidpfahler.com/fastai-in-the-browser
- https://github.com/davidpfahler/react-ml-app

Additional implementation background reading:
- https://medium.com/datadriveninvestor/running-your-deep-learning-models-in-a-browser-using-tensorflow-js-and-onnx-js-a35256d3933
- https://towardsdatascience.com/onnx-js-universal-deep-learning-models-in-the-browser-fbd268c67513
- https://github.com/microsoft/onnxjs-demo/blob/08f48958cc6fb396f7a5be7603a1929c81fbae36/src/components/models/Yolo.vue
- https://github.com/microsoft/onnxjs/blob/4085b7e61804d093e36af6a456d8c14c329f0a0a/examples/browser/resnet50/index.js#L29
- https://github.com/Microsoft/onnxjs-demo
- https://heartbeat.fritz.ai/building-an-image-recognition-app-using-onnx-js-c7147f4f291b

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
