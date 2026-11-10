
export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("ZamraBet Bot is running!", {
        status: 200
      });
    }

    try {
      const update = await request.json();
      const message = update.message;

      if (!message || !message.text) {
        return new Response("OK");
      }

      if (message.text === "/start") {
        const chatId = message.chat.id;

        await fetch(
          `https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              chat_id: chatId,
              text:
                "🇪🇹 እንኳን ወደ ZamraBet በደህና መጡ!\n\n" +
                "Welcome to ZamraBet!\n\n" +
                "Click below to visit our website.",
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "🌐 Open ZamraBet Website",
                      url: "https://zamra.bet"
                    }
                  ]
                ]
              }
            })
          }
        );
      }

      return new Response("OK");
    } catch (error) {
      return new Response("Error", { status: 500 });
    }
  }
};

