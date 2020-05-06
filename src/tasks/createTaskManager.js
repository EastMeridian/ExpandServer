const cron = require('node-cron');

const createTaskManager = ({ enabled = true }) => {
  const taskStore = {};
  let job = null;
  const listeners = [];
  const logs = [];

  if (enabled) {
    job = cron.schedule('* * * * * *', () => {
      const now = new Date();
      now.setMilliseconds(0);
      console.clear();
      console.time(['[listeners process time]']);
      listeners.map((fn) => fn(now));
      console.timeEnd(['[listeners process time]']);
      console.error('[logs]:', logs);
    });
  }

  return ({
    log: (log) => logs.push(log),
    addListener: (fn) => { listeners.push(fn); },
    subscribe: (task) => {
      const nextDate = new Date(task.date);
      nextDate.setMilliseconds(0);
      if (!taskStore[nextDate]) taskStore[nextDate] = { tasks: [] };
      taskStore[nextDate].tasks.push(task.action);
    },
    stop: () => job.stop(),
  });
};

module.exports = createTaskManager;
