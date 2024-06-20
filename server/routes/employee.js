// server/routes/employee.js
const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.post('/create', async (req, res) => {
    const { image, name, email, mobile, designation, gender, course } = req.body;
    try {
        let employee = new Employee({ image, name, email, mobile, designation, gender, course });
        await employee.save();
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/list', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Employee deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
