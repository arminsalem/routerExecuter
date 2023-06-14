const { updateMonitoredServer } = require('./updateDatabase');
const RouterOSAPI = require('node-routeros').RouterOSAPI;

class RouterExecuter {
  constructor() {
    this.connection = null;
  }

  async connectToRouter(host, username, password) {
    try {
      this.connection = new RouterOSAPI({
        host,
        user: username,
        password,
      });
      await this.connection.connect();
      console.log('Connected to RouterOS');
    } catch (error) {
      console.error('Error connecting to RouterOS:', error);
      throw error;
    }
  }

  disconnectFromRouterOS() {
    if (this.connection) {
      this.connection.close();
      this.connection = null;
      console.log('Disconnected from RouterOS');
    }
  }

  async executeRouterCommand(command) {
    try {
      const data = await this.connection.write(command);
      console.log(`Command executed: ${command}`);
      return data;
    } catch (error) {
      console.error(`Error executing command '${command}':`, error);
      throw error;
    }
  }

  async executeRouterCommands(router, commands) {
    try {
      const serverData = {};

      for (const commandObj of commands) {
        try {
          const result = await this.executeRouterCommand(commandObj.command);
          if (commandObj.handler) {
            const processedResult = commandObj.handler(result);
            Object.assign(serverData, processedResult);
          }
        } catch (error) {
          console.error(`Error executing command '${commandObj.name}':`, error);
        }
      }

      await updateMonitoredServer(router._id, serverData);
      console.log('All commands executed successfully');
    } catch (error) {
      console.error('Error executing RouterOS commands:', error);
      throw error;
    } finally {
      this.disconnectFromRouterOS();
    }
  }

  async executeSpecificCommand(router, command) {
    try {
      await this.connectToRouter(router.ip, router.username, router.password);
      const result = await this.executeRouterCommand(command);
      return result;
    } catch (error) {
      console.error('Error executing RouterOS command:', error);
      throw error;
    } finally {
      this.disconnectFromRouterOS();
    }
  }
}

module.exports = new RouterExecuter();

// const { updateMonitoredServer } = require('./updateDatabase');
// const RouterOSAPI = require('node-routeros').RouterOSAPI;

// /**
//  * Establishes a connection to the RouterOS.
//  * @param {string} host - The host of the RouterOS.
//  * @param {string} username - The username to connect with.
//  * @param {string} password - The password to connect with.
//  * @returns {Promise} - Returns the connected RouterOS API client.
//  */
// const connectToRouter = async (host, username, password) => {
//   const conn = new RouterOSAPI({
//     host,
//     user: username,
//     password,
//   });

//   await conn.connect();
//   console.log('Connected to RouterOS');
//   return conn;
// };

// /**
//  * Closes the connection to the RouterOS.
//  * @param {object} conn - The RouterOS API client.
//  */
// const disconnectFromRouterOS = (conn) => {
//   conn.close();
//   console.log('Disconnected from RouterOS');
// };

// /**
//  * Executes a command on the RouterOS.
//  * @param {object} conn - The RouterOS API client.
//  * @param {string|array} command - The command to execute.
//  * @returns {Promise} - Returns the command's result.
//  */
// const executeRouterCommand = async (conn, command) => {
//   try {
//     const data = await conn.write(command);
//     console.log(`Command executed: ${command}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// /**
//  * Executes a series of commands on the RouterOS.
//  * @param {object} router - The router's details (ip, username, password).
//  * @param {array} commands - The commands to execute.
//  * @returns {void}
//  */
// const executeRouterCommands = async (router, conn, commands) => {
//   try {
//     const serverData = {}; // Object to store command results

//     for (const commandObj of commands) {
//       // Execute each command and log the result
//       const result = await executeRouterCommand(conn, commandObj.command);

//       if (commandObj.handler) {
//         const processedResult = commandObj.handler(result);
//         Object.assign(serverData, processedResult);
//       }
//     }
//     await updateMonitoredServer(router._id, serverData);
//     console.log('All commands executed successfully');
//   } catch (error) {
//     console.error('Error executing RouterOS commands:', error);
//     throw error;
//   }
// };

// /**
//  * Executes a command on the RouterOS and returns the result, then closes the connection.
//  * @param {object} router - The router's details (ip, username, password).
//  * @param {string|array} command - The command to execute.
//  * @returns {Promise} - Returns the command's result.
//  */
// const executeSpecificCommand = async (router, command) => {
//   try {
//     const conn = await connectToRouter(
//       router.ip,
//       router.username,
//       router.password
//     );
//     const result = await executeRouterCommand(conn, command);
//     disconnectFromRouterOS(conn);
//     return result;
//   } catch (error) {
//     console.error('Error executing RouterOS command:', error);
//     throw error;
//   }
// };

// module.exports = {
//   connectToRouter,
//   disconnectFromRouterOS,
//   executeRouterCommand,
//   executeRouterCommands,
//   executeSpecificCommand,
// };
