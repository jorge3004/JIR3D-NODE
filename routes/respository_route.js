const { Router } = require("express");
const {
  repositoryGet,
  repositoryPost,
  repositoryPut,
  repositoryDelete,
} = require("../controllers/repository_controller");

const router = Router();
router.get("/", repositoryGet);
router.post("/", repositoryPost);
router.put("/:id", repositoryPut);
router.delete("/", repositoryDelete);

module.exports = router;
