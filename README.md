# Complete Amplify + React authentication

A repository for an article on
[bobbyhadz.com](https://bobbyhadz.com/blog/aws-amplify-react-auth) that shows
how to implement amplify authentication in a react.js application and manage the
infrastructure using CDK.

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm run setup
```

3. Create the CDK stack

```bash
npm run cdk-create-stack
```

4. Open the AWS Console and the stack should be created in your default region

5. Start the react application and open `http://localhost:3000`. Note: it's
   important that you run the react application on `http://localhost:3000`,
   because that's the url we've set up CORS for.

```bash
npm run dev
```

6. Cleanup

```bash
npm run cdk-destroy
```
