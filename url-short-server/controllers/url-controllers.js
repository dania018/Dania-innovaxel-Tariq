const Url = require("../models/url");
const { nanoid } = require("nanoid");
const validator = require("validator");

//create short url route
const createShortUrl = async (req, res) => {
  console.log(req.body);
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url required" });
  }

  //validation for url
  if (!validator.isURL(url)) {
    return res.status(400).json({ error: "invalid url" });
  }

  const shortCode = nanoid(6);

  const newUrl = new Url({
    url,
    shortCode,
  });

  try {
    await newUrl.save();
    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//get original url
const retrieveUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const getUrl = await Url.findOne({ shortCode });

    if (!getUrl) {
      return res.status(404).json({ error: "not found" });
    }

    getUrl.accessCount++;
    await getUrl.save();

    res.status(200).json({
      id: getUrl._id,
      url: getUrl.url,
      shortCode: getUrl.shortCode,
      createdAt: getUrl.createdAt,
      updatedAt: getUrl.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};


const updateUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url not found " });
  }

    if(!validator.isURL(url)) {
        return res.status(400).json({error : 'invalid url'})
    }

  try {
    const updatedUrl = await Url.findOneAndUpdate(
      { shortCode },
      { url },
      { new: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(200).json({
      id: updatedUrl._id,
      url: updatedUrl.url,
      shortCode: updatedUrl.shortCode,
      createdAt: updatedUrl.createdAt,
      updatedAt: updatedUrl.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};


const deleteUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const dltShortCode = await Url.findOneAndDelete({ shortCode });

    if (!dltShortCode) {
      return res.status(404).json({ error: "not found " });
    }

    return res.status(204).send();
  } catch (error) {
    console.log(error);
  }
};


const getUrlStats = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const getStats = await Url.findOne({ shortCode });

    if (!getStats) {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(200).json({
      id: getStats._id,
      url: getStats.url,
      shortCode: getStats.shortCode,
      createdAt: getStats.createdAt,
      updatedAt: getStats.updatedAt,
      accessCount: getStats.accessCount,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createShortUrl,
  retrieveUrl,
  updateUrl,
  deleteUrl,
  getUrlStats,
};
