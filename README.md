# The Distractions Band App

[What is The Distrations Band?](https://thedistractionsband.co.uk/)


## Features

- Authentication: users can enter their email and password to receive a JWT for authentication. Accounts are created by admins using the admin console, the admin console is split into two parts: [Distradmin Frontend](https://github.com/dan2811/distradmin-frontend) and [Distradmin Backend](https://github.com/dan2811/distradmin-backend)
- View event details and add notes: Simple CRUD functionatily.
- Payment: users can pay for their event using their paypal or debit/credit card, this is done through a paypal/braintree integration.
- Live chat: users can chat with admins over a web socket connection.
- Async storage: JWTs are stored in the local device storage to prevent the need for the user to login every time they re-open the app.

## Roadmap Features

- Currently the app only supports 1 type of user - client. However, currently we have 3 user types - client, musician and admin. In the future, musicians and admins will be able to login to the app and access a range of features unique to them.
- Live setlist manipulation: Using websockets, I intend to build a feature accessible only to musicians and admins. The feature would consist of a "live mode" that users can enable during a performance. Admin's devices would act as a lead device and serve up a web socket connection using the local wifi network that is already set up at performances by the sound crew for the musician's in-ear monitor mixes. Musician's devices would be able to connect to the web socket served by the admin's device and then the admin would be able to share a setlist that they could manipulate on the fly and musicians would recieve real-time updates.
