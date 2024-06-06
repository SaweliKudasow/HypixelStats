const { Client } = require("@zikeji/hypixel");
const client = new Client("2ba51dff-5543-4f19-8368-e3d6fd1379ee");
(async () => {
  const status = await client.status.uuid("f4b1a207-3523-421f-bc5f-ac6f93d50229");
  console.log(status);
  // {"online": false}
  const stats = await client.watchdogstats();
  console.log(stats);
  // {watchdog_lastMinute: 1, staff_rollingDaily: 2609, watchdog_total: 5591714, watchdog_rollingDaily: 4213, …}
})();