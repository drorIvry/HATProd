import { Router } from 'express';
import SenatorModel from '../dal/Senator';
const router = Router();

/* GET users listing. */
router.get('/', function(req, res) {
  const username = req.query['username'];

  SenatorModel.update({username:username},{pledged:true},{},(err) => {
    if (err)
      return res.send(500, { error: err });

    return res.send("successfully saved");
  })
});

export default router;

