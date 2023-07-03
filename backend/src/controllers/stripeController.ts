import { stripeAPI } from "../stripe";
import { Request, Response, NextFunction } from "express";
import { webOrigin } from "../app";

export const createCheckOutSession = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { line_items, customer_email } = req.body;

  if (!line_items || !customer_email) {
    return res.status(400).json({ error: "missing pram" });
  }

  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${webOrigin}/cinema-city/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${webOrigin}/canceled`,
      shipping_address_collection: { allowed_countries: ["GB", "US"] },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "an error occured, unable to create session" });
  }
};
