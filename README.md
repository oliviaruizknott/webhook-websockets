# webhook-websockets

This builds on [app-store-distributed-hooks](https://github.com/oliviaruizknott/app-store-distributed-hooks), but allows data to be added to the distributed app store through an HTTP API endpoint.

## Installation

Clone the repo, navigate into it, and install the dependencies:

```
git clone https://github.com/oliviaruizknott/webhook-websockets.git
cd webhook-websockets
npm install
```

### Set your environment variables:

Make a copy of `.env.sample` and name it `.env`. Replace the variables in `.env` with your own local IP address and desired ports:

```
VITE_IP_ADDRESS=<your_ip_address>
VITE_WS_PORT=8082
HTTP_PORT=3000
```

If no variables are set, `VITE_IP_ADDRESS` will default to `localhost`, the `VITE_WS_PORT` will default to `8082`, and the `HTTP_PORT` will default to `3000`. The app will work on the device where you run it, but you won’t be able to connect with other devices.

### Start the servers

First, start the websocket and web servers. In the root of the project, run:

```
node index.js
```

In another terminal window, start the Vite server. In the root of the project, run:

```
npm run dev
```

Vite will output a link to open your project in browser, something like `http://localhost:5173`.

## Testing

Using some API-request sending software (I use the Thunder Client plugin for VS Code), send a POST request to the following url, where `YOUR.IP` is replaced with your local IP, and `3000` is replaced with your web server port, if different:

```
http://YOUR.IP:3000/webhook
```

The JSON that you send should appear in \_store.state, viewable under the `CUSTOM_JSON` key. (You should see it in the debug panel, though at the time of this writing, the `CUSTOM_JSON` fields are not live-updating. 🤔 You have to close and reopen the panel to see it.)
