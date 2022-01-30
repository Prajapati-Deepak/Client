const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const send_otp = () => {};

const send_interested_email = async (
  seller_email,
  buyer_email,
  product_title,
  seller_mobile_no,
  buyers_mobile_no
) => {
  const msg_seller = `Dear user, we have found an interested buyer for your product, ${product_title}. You can contact him/her on +91${buyers_mobile_no}. Happy deal :)`;
  const msg_buyer = `Dear user, you can now contact the seller of the product, ${product_title} on +91${seller_mobile_no}. Happy deal :)`;

  const draft_seller = {
    to: seller_email, // Change to your recipient
    from: "harshitgarg.edu@gmail.com", // Change to your verified sender
    subject: "MNIT Selling Platform",
    text: msg_seller,
    html: msg_seller,
  };
  await sgMail
    .send(draft_seller)
    .then(() => {
      console.log("Deal initiation Email sent to the seller");
    })
    .catch((error) => {
      console.error(error);
    });

  const draft_buyer = {
    to: buyer_email, // Change to your recipient
    from: "harshitgarg.edu@gmail.com", // Change to your verified sender
    subject: "MNIT Selling Platform",
    text: msg_buyer,
    html: msg_buyer,
  };
  await sgMail
    .send(draft_buyer)
    .then(() => {
      console.log("Deal initiation Email sent to the buyer");
    })
    .catch((error) => {
      console.error(error);
    });
};

const send_un_interested_email = async (seller_email , seller_mobile_no, product_title)=>{
  const msg_seller = `Dear user, the buyer with contact number ${seller_mobile_no} has cancelled the deal for product, ${product_title}.
  We wish you successful deals in future :)`
  const draft_seller ={
    to: seller_email, // Change to your recipient
    from: "harshitgarg.edu@gmail.com", // Change to your verified sender
    subject: "MNIT Selling Platform",
    text: msg_seller,
    html: msg_seller,
  }
  await sgMail
  .send(draft_seller)
  .then(() => {
    console.log("Deal cancelation Email sent to the seller");
  })
  .catch((error) => {
    console.error(error);
  });
}

module.exports = { send_otp, send_interested_email, send_un_interested_email };
