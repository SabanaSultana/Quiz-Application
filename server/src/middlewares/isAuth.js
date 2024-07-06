const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("Not authenticated");
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    // Verify token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, "thisismysecretsecretkey");
      console.log("Decoded Token:", decodedToken);
    } catch (err) {
      console.error("Error while decoding token:", err);
      throw new Error("Authentication failed");
    }

    // Set userId in request for future use
    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    console.error("Error in isAuthenticated middleware:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
