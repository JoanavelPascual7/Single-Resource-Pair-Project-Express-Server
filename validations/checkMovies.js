const checkYear = (req, res, next) => {
    if (req.body.year) {
      next();
    } else {
      res.status(400).json({ error: "Year is required" });
    }
  }
  
  const checkBoolean = (req, res, next) => {
    const { is_favorite } = req.body;
    if (
      ["true", "false", true, false, undefined].includes(is_favorite)
    ) {
      next();
    } else {
      res.status(400).json({ error: "is_favorite must be a boolean value" });
    }
  };
  
  const checkTitle = (req, res, next) => {
    if (req.body.title) {
      next();
    } else {
      res.status(400).json({ error: "Title is required" });
    }
  };
  
      
  module.exports = { checkBoolean, checkYear, checkTitle };