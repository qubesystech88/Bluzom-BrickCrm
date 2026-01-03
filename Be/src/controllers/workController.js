exports.getAllWork = (req, res) => res.json([{ id: 1, title: 'Project Alpha', status: 'In Progress' }]);
exports.createWork = (req, res) => res.status(201).json({ message: 'Work created' });
