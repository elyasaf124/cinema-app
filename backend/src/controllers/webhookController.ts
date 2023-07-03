import { stripeAPI } from "../stripe";
import { Request, Response, NextFunction } from "express";

const webHookHandlers = {
  "checkout.session.completed": (data: any) => {
    // console.log("Checkout completed successfully", data);
    // other business logic
  },

  "payment_intent.succeeded": (data: any) => {
    // console.log("Payment succeeded", data);
  },
  "payment_intent.payment_failed": (data: any) => {
    // console.log("Payment Failed", data);
  },
};

export const webhook = (req: any, res: Response, next: NextFunction) => {
  console.log("my name hook");

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req["rawBody"],
      sig,
      process.env.WEB_HOOK_SECRET as string
    );
  } catch (error: any) {
    return res.status(400).send(`webhook error ${error.message}`);
  }

  // @ts-ignore
  if (webHookHandlers[event.type]) {
    // @ts-ignore
    webHookHandlers[event.type](event.data.object);
  }
};

export const webhookRetrive = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let session;
  try {
    session = await stripeAPI.checkout.sessions.retrieve(req.params.session_id);
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ session: session });
};
