// kiểm tra request >>  token xem đủ đk tạo post không?
const jwt = require("jsonwebtoken");

// lấy ra >> Authorization: Bearer <Token>

const verifyToken = (req, res, next) => {
  // next để thông quan ( cho qua )
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  // && nếu không có authHeader thì token = authHeader,
  // nếu có authHeader thì token = authHeader
  if (!token) {
    return (
      res
        // 401 đăng nhập không hợp lệ
        .status(401)
        .json({ success: false, message: "Access token not found" })
    );
  }

  try {
    // check token in env
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // return userId in req
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    //403 lỗi mã trạng thái
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
