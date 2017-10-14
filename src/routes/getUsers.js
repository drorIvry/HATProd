import { Router } from 'express';
const router = Router();
import Senator from '../dal/Senator';

/* GET users listing. */
router.get('/', function(req, res) {

  Senator.find({},(err, docs) => {

    if ((err)||(docs===null))
      return res.send(401, { error: err });

    console.log(docs);

    return res.send(docs);
  })
});

export default router;
