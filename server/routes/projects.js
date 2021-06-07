require("dotenv").config();
const express = require("express");
const router = express.Router();
const STRIPE_SECRETKEY = process.env.STRIPE_SECRETKEY;
const stripe = require("stripe")(STRIPE_SECRETKEY);

const {
  get_all_projects,
  get_project,
  create_project,
  delete_project,
} = require("../controllers/projects");

router.get("/", get_all_projects);
router.get("/:id", get_project);
router.post("/", create_project);
router.patch("/:id/cancel", cancel_project);
router.patch("/:id/edit_project", edit_project);
router.delete("/:id", delete_project);

/*
router.post("/:id/create-payment-intent", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});
*/
// note: remember to move this controller function to the controller folder on project.js
router.post("/:id/create-checkout-session", async (req, res) => {
  const { amount, projectId, projectCreatorId, userId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation to Fundraiser",
          },
          /*this is necessary because in stripe, units are in cents*/
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // customer related stuff
    client_reference_id: userId,
    metadata: { projectId, projectCreatorId, userId, amount },
    // note: replace for production environment
    success_url: `http://localhost:3000/projects/${projectId}?checkoutStatus=success`,
    cancel_url: `http://localhost:3000/projects/${projectId}?checkoutStatus=canceled`,
  });

  res.status(200).json({ id: session.id });
});

module.exports = router;

/*
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: 'https://example.com/success',
  cancel_url: 'https://example.com/cancel',
});

res.json({ id: session.id });
*/
