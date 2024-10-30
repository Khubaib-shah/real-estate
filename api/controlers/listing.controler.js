import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({ success: true, data: listing });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "Listing not found!"));
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updatelisting = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listing!"));
  }
  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found!"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Initialize filter variables
    const offer =
      req.query.offer === undefined || req.query.offer === "false"
        ? { $in: [false, true] }
        : req.query.offer;
    const furnished =
      req.query.furnished === undefined || req.query.furnished === "false"
        ? { $in: [false, true] }
        : req.query.furnished;
    const parking =
      req.query.parking === undefined || req.query.parking === "false"
        ? { $in: [false, true] }
        : req.query.parking;
    const type =
      req.query.type === undefined || req.query.type === "all"
        ? { $in: ["sale", "rent"] }
        : req.query.type;

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Construct the query object
    const query = {
      name: { $regex: searchTerm, $options: "i" },
    };

    // Add filters only if they are defined and not the default
    if (offer) query.offer = offer;
    if (furnished) query.furnished = furnished;
    if (parking) query.parking = parking;
    if (type) query.type = type;

    // Fetch listings
    const listings = await Listing.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
