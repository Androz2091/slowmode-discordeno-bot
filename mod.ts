import createClient from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/module/client.ts";
import config from "./config.ts";
import { Intents } from "https://raw.githubusercontent.com/Skillz4Killz/Discordeno/master/types/options.ts";

const storage = new Map<string, number>();

interface SlowmodeRoleData {
  roleID: string;
  time: number;
}

interface SlowmodeData {
  channelID: string;
  slowmodes: SlowmodeRoleData[];
}

const slowmodes: SlowmodeData[] = [];
config.slowmodes.forEach((slowmode) => {
  slowmodes.push({
    channelID: slowmode.channelID,
    slowmodes: slowmode.slowmodes.map((slowmodeRole) => {
      return {
        roleID: slowmodeRole.roleID,
        time: 1000 * 60 * 2,
      };
    }),
  });
});

createClient({
  token: config.token,
  botID: "675412054529540107",
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  eventHandlers: {
    ready: () => console.log(`Bot is online.`),
    messageCreate: (message) => {
      if (message.author.bot || !message.member()) return;
      console.log("pass", 1);
      const channelSlowmodeData = slowmodes.find((slowmode) =>
        slowmode.channelID === message.channel.id
      );
      if (!channelSlowmodeData) return;
      console.log("pass", 2);
      const lastMessageDate =
        storage.get(`${message.author.id}${message.channel.id}`) || 0;

      const guild = message.member().guild();
      const relevantRoleID = message.member().roles
        .sort((a, b) =>
          guild.roles.get(b)!.position - guild.roles.get(a)!.position
        ).find((id) =>
          channelSlowmodeData.slowmodes.find((slowmode) =>
            slowmode.roleID === id
          )
        );
      const slowmode = channelSlowmodeData.slowmodes.find((slowmode) =>
        slowmode.roleID === relevantRoleID
      );
      console.log(guild)
      console.log('---')
      console.log(relevantRoleID)
      console.log('')
      if (!slowmode) return;
      console.log("pass", 3);
      const canSendMessageDate = slowmode.time + lastMessageDate;
      if (canSendMessageDate > Date.now()) {
        console.log("pass if");
        message.delete();
        const time = canSendMessageDate - Date.now();

        message
          .channel.sendMessage(
            `${message.author.mention}, ${
              config.messages.wait
                .replace("{{time}}", time.toString())
                .replace("{{user}}", message.author.toString())
                .replace("{{channel}}", message.channel.toString())
            }`,
          )
          .then((m) => {
            setTimeout(() => m.delete(), 2000);
          });
      } else {
        console.log("pass else");
        storage.set(`${message.author.id}${message.channel.id}`, Date.now());
      }
    },
  },
});
