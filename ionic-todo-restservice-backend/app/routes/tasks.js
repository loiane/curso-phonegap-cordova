var Task = require('../models/task'),
    express = require('express'),
    router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/tasks').get(function(req, res) {
    Task.find(function(err, tasks) {
        if (err) {
            return res.send(err);
        }

        res.json(tasks);
    });
});

router.route('/tasks/:id').get(function(req, res) {
    Task.findOne({ _id: req.params.id}, function(err, task) {
        if (err) {
            return res.send(err);
        }

        res.json(task);
    });
});

router.route('/tasks').post(function(req, res) {
    var task = new Task(req.body);

    task.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.send({ message: 'Task Added' });
    });
});

router.route('/tasks/:id').put(function(req,res){
    Task.findOne({ _id: req.params.id }, function(err, task) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            task[prop] = req.body[prop];
        }

        // save the task
        task.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Task updated!' });
        });
    });
});

router.route('/tasks/:id').delete(function(req, res) {
    Task.remove({
        _id: req.params.id
    }, function(err, task) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;
