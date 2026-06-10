const ContactPage = require('../models/ContactPage');
const ContactSubmission = require('../models/Contact');

// ── CONTACT PAGE CONFIG ──

exports.getContactPage = async (req, res) => {
  try {
    let page = await ContactPage.findOne();
    if (!page) {
      page = await ContactPage.create({
        expertServices: {
          badge: 'Consultation',
          title: 'Expert Advisory Services',
          cards: [
            { icon: 'engineering', title: 'Technical Integration', description: 'On-site assessments for switching traditional boilers to biomass pellet systems.' },
            { icon: 'inventory_2', title: 'Logistics Planning', description: 'Customized delivery schedules and inventory management for high-volume users.' }
          ]
        }
      });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContactPage = async (req, res) => {
  try {
    let page = await ContactPage.findOne();
    if (!page) {
      page = new ContactPage(req.body);
      await page.save();
    } else {
      Object.assign(page, req.body);
      await page.save();
    }
    res.json(page);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ── CONTACT SUBMISSIONS ──

exports.submitInquiry = async (req, res) => {
  try {
    const submission = new ContactSubmission(req.body);
    await submission.save();
    res.status(201).json({ message: 'Inquiry submitted successfully. We will get back to you shortly.', submission });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    const submissions = await ContactSubmission.find(filter).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json({ message: 'Submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};