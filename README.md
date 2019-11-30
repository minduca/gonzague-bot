# Gonzague

(Under development)
Chatbot that runs on a Raspberry PI and controls an Arduino robot to do random useless stuff.

## Getting Started

Install Microsoft Bot Framework requirements:

* Node.js version 10.14 or higher.
* [Bot Framework Emulator](https://github.com/microsoft/botframework-emulator).

### Build

Navigate to the project root directory and run the command below.

```bash
npm install
npm run build
npm start
```

### Run

If using VS Code, you can debug using the configuration provided with the project.

Alternatively, you can run the command below on the project root directory.

```bash
npm start
```

The bot accepts messages on the following endpoint:

```bash
http://localhost:3978/api/messages
```

### Debug the bot Using Bot Framework Emulator

To debug the bot running locally, see Microsoft official documentation [Debug with the emulator](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0&tabs=csharp#run-a-bot-locally).

The bot can run on any platform, but Raspberry PI dependent features will be disabled if a different hardware is used.

To debug the bot running on the Raspberry PI from a remote machine, configure [Tunneling (ngrok)](https://github.com/Microsoft/BotFramework-Emulator/wiki/Tunneling-(ngrok)).

### Running on a Raspberry PI

You will need a working Raspberry PI 2 or higher with any camera module compatible with [Raspistill](https://www.raspberrypi.org/documentation/raspbian/applications/camera.md) connected, enabled on the OS and minimally tested.

No particular setup is required though. There is no OS restriction either.

### Connect to Arduino

1. Install [gonzague-arduino](https://github.com/minduca/gonzague-arduino) on the Arduino.
2. Connect the Raspberry PI to the Arduino via USB port.
3. Start the application.
