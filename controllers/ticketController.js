const Ticket = require('../models/Ticket');
const Reply = require('../models/Reply');

exports.createTicket = async (req, res) => {
  try {
    const { subject, description, category, priority } = req.body;
    const ticketId = 'TICK-' + Math.floor(100000 + Math.random() * 900000);
    
    const ticket = new Ticket({
      ticketId,
      subject,
      description,
      category,
      priority,
      customer: req.user.id
    });
    
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'Customer') filter.customer = req.user.id;
    if (req.user.role === 'Support Agent') filter.assignedAgent = req.user.id;

    const tickets = await Ticket.find(filter).populate('category customer assignedAgent');
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    if (ticket.status === 'Closed') return res.status(400).json({ message: 'Closed tickets cannot be modified' });

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignTicket = async (req, res) => {
  try {
    const { agentId, priority, status } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    if (agentId) ticket.assignedAgent = agentId;
    if (priority) ticket.priority = priority;
    if (status) ticket.status = status;
    if (agentId && ticket.status === 'Open') ticket.status = 'Assigned';

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};