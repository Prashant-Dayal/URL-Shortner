import User from "../models/user.model.js";
import shortUrl from "../models/short_url.model.js";

export const getPlatformStatsDao = async () => {
  const [totalUsers, totalUrls, clickAggregation, guestUrls, userUrls] = await Promise.all([
    User.countDocuments(),
    shortUrl.countDocuments(),
    shortUrl.aggregate([
      {
        $group: {
          _id: null,
          totalClicks: { $sum: "$clicks" },
        },
      },
    ]),
    shortUrl.countDocuments({ $or: [{ user: { $exists: false } }, { user: null }] }),
    shortUrl.countDocuments({ user: { $exists: true, $ne: null } }),
  ]);

  const totalClicks = clickAggregation.length > 0 ? clickAggregation[0].totalClicks : 0;

  return {
    totalUsers,
    totalUrls,
    totalClicks,
    guestUrls,
    userUrls,
  };
};

export const getAllSystemUrlsDao = async ({ search = "" }) => {
  const query = {};

  if (search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    query.$or = [{ full_url: regex }, { short_url: regex }];
  }

  const urls = await shortUrl
    .find(query)
    .populate("user", "name email role avatar")
    .sort({ createdAt: -1 });

  return urls;
};

export const deleteSystemUrlDao = async (id) => {
  return await shortUrl.findByIdAndDelete(id);
};

export const getAllUsersWithMetricsDao = async () => {
  const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();

  // Aggregate user url counts and clicks
  const metricsAggregation = await shortUrl.aggregate([
    {
      $match: {
        user: { $exists: true, $ne: null },
      },
    },
    {
      $group: {
        _id: "$user",
        urlCount: { $sum: 1 },
        totalClicks: { $sum: "$clicks" },
      },
    },
  ]);

  const metricsMap = new Map();
  metricsAggregation.forEach((item) => {
    metricsMap.set(item._id.toString(), {
      urlCount: item.urlCount,
      totalClicks: item.totalClicks,
    });
  });

  return users.map((user) => {
    const metrics = metricsMap.get(user._id.toString()) || { urlCount: 0, totalClicks: 0 };
    return {
      ...user,
      urlCount: metrics.urlCount,
      totalClicks: metrics.totalClicks,
    };
  });
};

export const updateUserRoleDao = async (userId, role) => {
  return await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
};

export const deleteUserDao = async (userId) => {
  await shortUrl.deleteMany({ user: userId });
  return await User.findByIdAndDelete(userId);
};
