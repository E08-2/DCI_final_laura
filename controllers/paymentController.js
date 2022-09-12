import Stripe from "stripe"

export const paymentPost = async (req, res, next) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "EUR",
                        product_data: {
                            name: "Biobites order"
                        },
                        unit_amount:+req.body.total *100,
                    },
                    quantity: 1
                }
            ],
            success_url:`http://localhost:3000/stripe-success`,
            cancel_url: `http://localhost:3000/stripe-cancel`
        }
        )
        //cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
};