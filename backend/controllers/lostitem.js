const { LostItem, User } = require("../Models");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const HandleAdmin = async (req, res) => {
  console.log("Admin bhai approve kro ");
  console.log(req.body);
  approval = req.body.to_approve;
  id = req.body._id;
  refID = req.body.posted_by;
  const date = new Date();
  if (approval) {
    console.log("approve ho gaya ");
    LostItem.findOneAndUpdate(
      { _id: id },
      { is_verified: true },
      function (err) {
        console.log(err);
      }
    );
    await User.findByIdAndUpdate(refID, {
      $addToSet: { lf_items_posted: id },
    });
    const xy=  await User.findByIdAndUpdate(req.body.posted_by, {
      $addToSet: {
        notification: {
          status: 1,
          content: `Dear user, your lost/found item has been approved.`,
          createdAt :date,
        },
      },
    });
    console.log("Updated user database");
    res.send("product approved");
    // console.log(saveLostItem);
  } else {
    console.log(id);
    console.log("This item should be deleted");
    await LostItem.findOneAndDelete({ _id: id });
    const xy=  await User.findByIdAndUpdate(req.body.posted_by, {
      $addToSet: {
        notification: {
          status: -1,
          content: `Dear user, your lost/found item has been deleted as it did not meet our policy.`,
          createdAt :date,
        },
      },
    });
    res.send("product Ad request declined");
  }
};
const SendLost = async (req, res) => {
  //error handling krni har jagah abhi
  console.log("reached here body \n");
  console.log(req.body);
  title = req.body.title;
  description = req.body.description;
  category = req.body.categories;
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.categories);
  email = req.body.email;
  imgs = req.body.imgs;
  refID = req.body.posted_by;
  console.log(email);
  console.log("reached cloudinary part");
  image_cloud_links = null;
  try {
    if (imgs.length > 0) {
      const image_cloud_links = await Promise.all(
        imgs.map(async (image) => {
          const image_upload_response = await cloudinary.v2.uploader.upload(
            image.data_url,
            function (error, result) {
              console.log(error);
            }
          );

          return { image: image_upload_response.url };
        })
      );

      console.log(image_cloud_links);
    }

    // console.log(image_cloud_links);
    // console.log(imgs);
    // database save a lost iem product
    const newLostItem = new LostItem({
      name: title,
      description: description,
      category: category,
      imgs: image_cloud_links,
      posted_by: refID,
      email: email,
      is_verified: false,
      //person info bhi honi chahiye
    });
    try {
      const saveLostItem = await newLostItem.save();
      await User.findByIdAndUpdate(refID, {
        $addToSet: { lf_items_posted: saveLostItem._id },
      });
      console.log("Updated user database");
      // console.log(saveLostItem);
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};
const LostCheck = async (req, res) => {
  title = req.body.title;
  description = req.body.description;
  category = req.body.categories;
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.categories);
  email = req.body.email;
  imgs = req.body.imgs;
  refID = req.body.posted_by;
  console.log(email);
  image_cloud_links = [];
  console.log("reached cloudinary part portal to db");
  try {
    if (imgs.length > 0) {
      image_cloud_links = await Promise.all(
        imgs.map(async (image) => {
          const image_upload_response = await cloudinary.v2.uploader.upload(
            image.data_url,
            function (error, result) {
              console.log(error);
              // not printing result right now
            }
          );

          return { image: image_upload_response.url };
        })
      );

      console.log(image_cloud_links);
      // console.log(image_cloud_links);
      // console.log(imgs);
      // database save a lost iem product
    }

    const newLostItem = new LostItem({
      name: title,
      description: description,
      category: category,
      imgs: image_cloud_links,
      posted_by: refID,
      email: email,
      is_verified: false,
      //person info bhi honi chahiye
    });
    try {
      const saveLostItem = await newLostItem.save();
      // await User.findByIdAndUpdate(refID, {
      //   $addToSet: {lf_items_posted: saveLostItem._id },
      // });
      // console.log("Updated user database");
      // console.log(saveLostItem);
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { SendLost, LostCheck, HandleAdmin };
