const { Router } = require("express");
const {
  authGet,
  // repositoryPost,
  // repositoryPut,
  // repositoryDelete,
} = require("../controllers/auth_controller");

const router = Router();
router.post("/", authGet);
// router.post("/", repositoryPost);
// router.put("/:id", repositoryPut);
// router.delete("/", repositoryDelete);

module.exports = router;
