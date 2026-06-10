const CaseStudy = require('../models/CaseStudy');
const Industry = require('../models/Industry');

// @desc    Get all active case studies
// @route   GET /api/case-studies
// @access  Public
exports.getCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find({ status: 'active' })
      .populate('industry', 'title slug');
    res.json(caseStudies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all case studies including inactive (Admin)
// @route   GET /api/case-studies/all
// @access  Private/Admin
exports.getAllCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find()
      .populate('industry', 'title slug');
    res.json(caseStudies);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new case study
// @route   POST /api/case-studies
// @access  Private/Admin
exports.createCaseStudy = async (req, res) => {
  try {
    const caseStudy = new CaseStudy(req.body);
    await caseStudy.save();

    // Link it to the Industry object
    await Industry.findByIdAndUpdate(caseStudy.industry, {
      $addToSet: { caseStudies: caseStudy._id }
    });

    res.status(201).json(caseStudy);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a case study
// @route   PUT /api/case-studies/:id
// @access  Private/Admin
exports.updateCaseStudy = async (req, res) => {
  try {
    const oldCaseStudy = await CaseStudy.findById(req.params.id);
    if (!oldCaseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    const caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // Handle updating of industry relation in case industry assignment changed
    if (oldCaseStudy.industry.toString() !== caseStudy.industry.toString()) {
      // Remove from old industry
      await Industry.findByIdAndUpdate(oldCaseStudy.industry, {
        $pull: { caseStudies: caseStudy._id }
      });
      // Add to new industry
      await Industry.findByIdAndUpdate(caseStudy.industry, {
        $addToSet: { caseStudies: caseStudy._id }
      });
    }

    res.json(caseStudy);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a case study
// @route   DELETE /api/case-studies/:id
// @access  Private/Admin
exports.deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    // Pull from linked industry
    await Industry.findByIdAndUpdate(caseStudy.industry, {
      $pull: { caseStudies: caseStudy._id }
    });

    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ message: 'Case study removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
