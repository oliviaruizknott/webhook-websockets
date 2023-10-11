# color-tapping

This builds on [app-store-distributed-hooks](https://github.com/oliviaruizknott/app-store-distributed-hooks), allowing url hash parameters to be set to state in the distributed app store. In this particular example, tapping prepared NFC tags with a phone will change the background color of the app for all connected clients.

## Installation

Clone the repo, navigate into it, and install the dependencies: 
```
git clone https://github.com/oliviaruizknott/color-tapping.git
cd color-tapping
npm install
```

### Set your environment variables:
Make a copy of `.env.sample` and name it `.env`. Replace the variables in `.env` with your own local IP address and desired port:

```
VITE_IP_ADDRESS=<your_ip_address>
VITE_WS_PORT=8082
```

If no variables are set, `VITE_IP_ADDRESS` will default to `localhost`, and the `VITE_WS_PORT` will default to `8082`. The app will work on the device where you run it, but you won’t be able to connect with other devices.

### Start the servers
First, start the websocket server. In the root of the project, run:
```
node index.js
```

In another terminal window, start the Vite server. In the root of the project, run:
```
npm run dev
```

Vite will output a link to open your project in browser, something like `http://localhost:5173`.

## Extra: Preparing NFC Tags
If you want to follow along at home with the full experience, prepare some NFC tags with the following URLs, where `<YOUR.IP>` is replaced with your local IP address, and `5173` is replaced with your port, if different:
```
http://<YOUR.IP>:5173/#COLOR=e84855
http://<YOUR.IP>:5173/#COLOR=f9dc5c
http://<YOUR.IP>:5173/#COLOR=3185fc
http://<YOUR.IP>:5173/#COLOR=<any hex code you want, without the #>
```
You will tap these tags with your phone. Make sure your phone is on the same wifi as your computer (or the device where you are running the servers).

Then:
1. Open the webapp in your computer browser.
2. Tap your phone to one of the NFC tags.

You should see the webapp open on your phone with the given color as the background color, and should also see the background color of the webapp change on your computer.