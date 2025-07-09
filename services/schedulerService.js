const schedule = require('node-schedule');
const Message = require('../models/Message');

exports.scheduleMessageInsert = async ({ message, day, time }) => {
  if (!message || !day || !time) {
    return {
      success: false,
      message: 'message, day, and time are required',
      statusCode: 400
    };
  }

  const targetDateTime = new Date(`${day}T${time}`);

  if (isNaN(targetDateTime)) {
    return {
      success: false,
      message: 'Invalid date/time format',
      statusCode: 400
    };
  }

  // Schedule the job & insert the message at the scheduled time
  schedule.scheduleJob(targetDateTime, async () => {
    await Message.create({ message, scheduledFor: targetDateTime });
    console.log('Message inserted at:', new Date());
  });

  return {
    success: true,
    message: 'Message scheduled successfully',
    scheduledFor: targetDateTime,
    statusCode: 200
  };
};
