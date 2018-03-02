import { Router } from 'express';
const router = Router();
import Senator from '../dal/Senator';

/* GET users listing. */
router.get('/', function(req, res) {

  const username = req.query['username'];
  const password = req.query['password'];

  Senator.findOne({username:username,password:password}, (err, docs) => {
    if ((err)||(docs===null))
      return res.send(401, { error: err });

    console.log(docs);

    return res.send(username);
  })
});

export default router;
