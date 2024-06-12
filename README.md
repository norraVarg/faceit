## Tech choices and reasons
- API: https://jsonplaceholder.typicode.com/
- Websocket<br/>
  Due to the limitation of the API, there is a need to customise Next.js server to initialize websocket for live message communications.
- Persist store<br/>
  It is not recommended to introduce a persist/global store to Next.js application. The main reason to have it here is to supplement the pagination capability which is missing from this simple API. It is essential for implementing the infinite scroll feature. Ideally, every new fetch request should trigger a new API call with queries like "page" or "size" and append the new data to the store.
- Mobile-first<br/>
  This application is implemented mobile-first approach. Verified with multiple mobile devices provided in Chrome console tool.
  
## How to run

Recommend to use node 20 and Chrome
### Step 1
```bash
npm install
npm run dev
```
### Step 2
Open [http://localhost:3000](http://localhost:3000) with your browser<br/><br/>
**NOTE**: There might be a need to refresh the page after the first page load due to an [issue](https://www.reddit.com/r/nextjs/comments/1ayw24l/uncaught_syntaxerror_invalid_or_unexpected_token/) with Next.js 14

## Run unit test
```bash
npm run test
```

## Run e2e test
```bash
npm run cy:open
```
