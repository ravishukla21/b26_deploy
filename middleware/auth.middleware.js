const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.secret);
      if (decoded) {
        console.log(decoded);
        req.body.userID = decoded.userID;
        req.body.user = decoded.user;
        next();
      } else {
        res.json({ msg: "not authorized token not verified" });
      }
    } catch (err) {
      res.json({ error: err.message });
    }
  } else {
    res.json({ msg: "pleaselogin" });
  }
};

module.exports = {
  auth,
};
