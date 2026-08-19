const Vendor = require('../models/Vendor');

// @desc    Create a new vendor (restaurant/hotel/mart)
// @route   POST /api/vendors
exports.createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create({ ...req.body, owner: req.user._id });
    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all vendors (with optional filters: type, city)
// @route   GET /api/vendors?type=restaurant&city=Peshawar
exports.getVendors = async (req, res) => {
  try {
    const filter = { isApproved: true };
    if (req.query.type) filter.type = req.query.type;
    if (req.query.city) filter['location.city'] = req.query.city;

    const vendors = await Vendor.find(filter).sort('-rating');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single vendor by ID
// @route   GET /api/vendors/:id
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update vendor (owner or admin only)
// @route   PUT /api/vendors/:id
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    if (vendor.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this vendor' });
    }

    Object.assign(vendor, req.body);
    await vendor.save();
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete vendor (admin only)
// @route   DELETE /api/vendors/:id
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    await vendor.deleteOne();
    res.json({ message: 'Vendor removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
