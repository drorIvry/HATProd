import Motion from '../dal/Motion';

export function getMotions(req, res) {
  Motion.find().then((doc) => {
    res.send(doc);
    res.end('docs');
  }).catch((err) => {
    res.end(500, err);
  });
}

/* POST to add to the motion */
export function addMotionToVote(req, res) {
  let newMotion = new Motion(req.body);

  if((req.body.title === undefined)||(req.body.value === undefined))
    return res.send(400,"bad request");

  newMotion.save((err) => {
    if (err)
      return res.send(2000, {error: err});

    return res.send("successfully saved");
  })
}


/* POST to add to the motion */
export function voteForMotion(req, res) {

  let rawData = req.body;

  if((rawData.title === undefined)||(rawData.voted === undefined))
    return res.send(400,"bad request");

  Motion.update({title:rawData.title},{voted:rawData.voted},{},(err) => {
    if (err)
      return res.send(500, { error: err });

    return res.send("successfully saved");
  })
}

