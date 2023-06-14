# RouterExecuter

RouterExecuter is a Node.js library designed for executing commands on MikroTik routers. It provides a convenient interface to connect to MikroTik devices, send commands, and retrieve the output, making it easier to automate network management tasks on MikroTik servers.

## Features

- Connect to MikroTik routers using SSH or Telnet protocols.
- Execute commands on remote MikroTik routers and retrieve the output.
- Supports multiple simultaneous connections.
- Configurable timeout for command execution.
- Exception handling for connection errors and command failures.

## Installation

Make sure you have Node.js installed on your system. RouterExecuter requires Node.js version 12 or higher.

Open your terminal or command prompt and navigate to your project directory.

Install the RouterExecuter package from the npm registry using npm or yarn:

```shell
npm install router-executer
```

or

```shell
yarn add router-executer
```

## Usage

To use RouterExecuter with MikroTik routers in your Node.js project, follow these steps:

Require the `RouterExecuter` class from the library:

```javascript
const RouterExecuter = require('router-executer');
```

Create an instance of `RouterExecuter`:

```javascript
const router = new RouterExecuter();
```

Connect to the MikroTik router:

```javascript
router.connectToRouter('192.168.1.1', 'admin', 'password')
  .then(() => {
    // Connection successful, execute commands or perform actions
  })
  .catch(error => {
    console.error('Error connecting to MikroTik router:', error);
  });
```

Execute commands on the remote MikroTik router:

```javascript
router.executeRouterCommand('/interface print')
  .then(output => {
    console.log(output);
  })
  .catch(error => {
    console.error('Error executing command:', error);
  });
```

You can pass any valid MikroTik router command as a string to the `executeRouterCommand` method. The output will be returned as a promise.

Disconnect from the MikroTik router when you're done:

```javascript
router.disconnectFromRouterOS();
```

Refer to the code comments for a better understanding of the individual functions and their usage.

## Contributing

Contributions to RouterExecuter are welcome! If you find any issues or have suggestions for improvements, please open an issue on the GitHub repository. Additionally, if you would like to contribute code, feel free to submit a pull request.

When contributing, please ensure you adhere to the existing code style and write clear commit messages. Your contributions will be greatly appreciated by the community.

## License

RouterExecuter is open source software licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements

RouterExecuter was developed by Armin Salem. Thanks to the open source community for their contributions and support.
