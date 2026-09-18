
const redisClient = require("../config/redis");

const WINDOW_SIZE = 3600; // 1 hour in seconds
const MAX_REQUESTS = 60;

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
    const key = `rate_limit:${ip}`;
    const current_time = Math.floor(Date.now() / 1000);
    const window_start = current_time - WINDOW_SIZE;

    await redisClient.zRemRangeByScore(key, 0, window_start);

    const requestCount = await redisClient.zCard(key);

    if (requestCount >= MAX_REQUESTS) {
      return res.status(429).json({
        success: false,
        message: "Too Many Requests. Please try again after some time.",
      });
    }

    await redisClient.zAdd(key, [
      { score: current_time, value: `${current_time}:${Math.random()}` },
    ]);

    await redisClient.expire(key, WINDOW_SIZE);

    return next();

  } catch (err) {
    console.error("Rate Limiter Error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Internal Server Error" 
    });
  }
};

module.exports = rateLimiter;


// ::1


