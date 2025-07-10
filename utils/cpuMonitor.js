const os = require('os-utils');

// monitor CPU usage and restart server if usage exceeds threshold
function monitorCPU(threshold = 70, interval = 5000) {
  setInterval(() => {
    os.cpuUsage((usage) => {
      const percent = usage * 100;
      console.log(`CPU Usage: ${percent.toFixed(2)}%`);

      if (percent > threshold) {
        console.warn(`CPU usage crossed ${threshold}%! Restarting server...`);

        process.exit(1);
      }
    });
  }, interval);
}

module.exports = monitorCPU;
