const { parentPort, workerData } = require('worker_threads');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Agent = require('../models/Agent');
const User = require('../models/User');
const Account = require('../models/Account');
const LOB = require('../models/LOB');
const Carrier = require('../models/Carrier');
const Policy = require('../models/Policy');

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const data = workerData;

    for (const item of data) {
      const agent = await Agent.findOneAndUpdate(
        { name: item.agent },
        { name: item.agent },
        { upsert: true, new: true }
      );

      const user = await User.findOneAndUpdate(
        { email: item.email },
        {
          firstName: item.first_name,
          dob: item.dob,
          address: item.address,
          phone: item.phone,
          state: item.state,
          zip: item.zip,
          email: item.email,
          gender: item.gender,
          userType: item.userType,
        },
        { upsert: true, new: true }
      );

      const account = await Account.findOneAndUpdate(
        { accountName: item.account_name },
        { accountName: item.account_name },
        { upsert: true, new: true }
      );

      const lob = await LOB.findOneAndUpdate(
        { categoryName: item.category_name },
        { categoryName: item.category_name },
        { upsert: true, new: true }
      );

      const carrier = await Carrier.findOneAndUpdate(
        { companyName: item.company_name },
        { companyName: item.company_name },
        { upsert: true, new: true }
      );

      await Policy.create({
        policyNumber: item.policy_number,
        policyStartDate: item.policy_start_date,
        policyEndDate: item.policy_end_date,
        user: user._id,
        category: lob._id,
        company: carrier._id,
        account: account._id,
        agent: agent._id,
      });
    }

    parentPort.postMessage({ status: 'success' });
  } catch (err) {
    parentPort.postMessage({ status: 'error', error: err.message });
  }
})();
