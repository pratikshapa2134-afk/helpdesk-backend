const router = require('express').Router();
const { createTicket, getTickets, updateTicketStatus, assignTicket } = require('../controllers/ticketController');
const { verifyToken, verifyRole } = require('../middleware/auth');

router.post('/', verifyToken, verifyRole('Customer'), createTicket);
router.get('/', verifyToken, getTickets);
router.patch('/:id/status', verifyToken, updateTicketStatus);
router.patch('/:id/assign', verifyToken, verifyRole('Super Admin'), assignTicket);
module.exports = router;